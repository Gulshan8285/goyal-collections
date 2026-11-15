import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import {
  getProducts,
  createProduct,
  updateProduct,
  addCategory,
  adjustStock,
  logAdminActivity,
} from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = (formData.get('type') as string) || 'products'; // products | categories | inventory
    const mode = (formData.get('mode') as string) || 'preview'; // preview | commit

    if (!file) {
      return NextResponse.json({ success: false, message: 'Please attach a file (.csv or .xlsx)' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'The uploaded spreadsheet is empty.' },
        { status: 400 }
      );
    }

    const existingProducts = getProducts({ includeInactive: true }).products;
    const existingSkus = new Set(existingProducts.map((p) => p.sku?.toUpperCase()).filter(Boolean));

    const errors: string[] = [];
    const duplicates: string[] = [];
    const validRows: any[] = [];

    if (type === 'products') {
      rows.forEach((row, idx) => {
        const name = row['Name'] || row['name'] || row['Product Name'];
        const price = Number(row['Selling Price (INR)'] || row['Price'] || row['price']);
        const mrp = Number(row['MRP (INR)'] || row['MRP'] || row['mrp'] || price);
        const category = (row['Category'] || row['category'] || 'footwear').toLowerCase().replace(/\s+/g, '-');
        const subcategory = (row['Subcategory'] || row['subcategory'] || 'shoes').toLowerCase().replace(/\s+/g, '-');
        const sku = (row['SKU'] || row['sku'] || `MRL-IMP-${Date.now()}-${idx}`).toString().trim();
        const stock = Number(row['Stock Units'] || row['Stock'] || row['stock'] || 20);

        if (!name || isNaN(price)) {
          errors.push(`Row ${idx + 2}: Missing valid Name or Price`);
          return;
        }

        if (existingSkus.has(sku.toUpperCase())) {
          duplicates.push(`Row ${idx + 2}: SKU "${sku}" already exists`);
        }

        validRows.push({
          name,
          sku,
          price,
          mrp,
          stock,
          category,
          categoryTitle: category.includes('footwear') ? 'Footwear' : 'Ready-made Clothes',
          categoryHindi: category.includes('footwear') ? 'Footwear' : 'Ready-made Clothes',
          subcategory,
          subcategoryTitle: subcategory.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          description: row['Description'] || row['description'] || 'Bespoke luxury piece handcrafted with pure materials.',
          images: row['Image'] ? [row['Image']] : ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000'],
          sizes: row['Sizes'] ? row['Sizes'].split(',').map((s: string) => s.trim()) : ['UK 7', 'UK 8', 'UK 9'],
          colors: [{ name: row['Color'] || 'Obsidian Black', hex: '#000000' }],
          status: 'active',
        });
      });

      if (mode === 'preview') {
        return NextResponse.json({
          success: true,
          mode: 'preview',
          totalRows: rows.length,
          validCount: validRows.length,
          errorCount: errors.length,
          errors: errors.slice(0, 10),
          duplicateCount: duplicates.length,
          duplicates: duplicates.slice(0, 10),
          previewRows: validRows.slice(0, 5),
        });
      }

      // COMMIT MODE
      let createdCount = 0;
      for (const item of validRows) {
        createProduct(item, auth.email);
        createdCount++;
      }

      logAdminActivity('Bulk Products Imported', 'Product', `Successfully imported ${createdCount} products`, auth.email);
      return NextResponse.json({
        success: true,
        message: `Successfully imported ${createdCount} products.`,
        createdCount,
      });
    }

    if (type === 'inventory') {
      rows.forEach((row, idx) => {
        const sku = (row['SKU'] || row['sku'])?.toString().trim();
        const newStock = Number(row['Current Stock'] || row['Stock'] || row['stock']);
        if (!sku || isNaN(newStock)) {
          errors.push(`Row ${idx + 2}: Missing valid SKU or Stock number`);
          return;
        }
        const prod = existingProducts.find((p) => p.sku?.toUpperCase() === sku.toUpperCase());
        if (!prod) {
          errors.push(`Row ${idx + 2}: SKU "${sku}" not found in catalog`);
          return;
        }
        validRows.push({ productId: prod.id, name: prod.name, sku, newStock });
      });

      if (mode === 'preview') {
        return NextResponse.json({
          success: true,
          mode: 'preview',
          totalRows: rows.length,
          validCount: validRows.length,
          errorCount: errors.length,
          errors: errors.slice(0, 10),
          previewRows: validRows.slice(0, 5),
        });
      }

      // COMMIT MODE
      let updatedCount = 0;
      for (const item of validRows) {
        adjustStock(item.productId, item.newStock, 'Spreadsheet bulk stock import', auth.email);
        updatedCount++;
      }

      logAdminActivity('Bulk Stock Imported', 'Inventory', `Updated stock for ${updatedCount} products via spreadsheet`, auth.email);
      return NextResponse.json({
        success: true,
        message: `Successfully adjusted stock for ${updatedCount} products.`,
        updatedCount,
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid import type' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

