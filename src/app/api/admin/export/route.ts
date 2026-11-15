import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { getCustomers, getProducts, getOrders, getStockLogs, logAdminActivity } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'products'; // customers | products | orders | inventory | sales
    const format = (searchParams.get('format') || 'csv').toLowerCase(); // csv | xlsx

    let dataRows: Record<string, any>[] = [];
    let filenameBase = `mirli-${type}-${new Date().toISOString().split('T')[0]}`;

    if (type === 'customers') {
      const customers = getCustomers();
      dataRows = customers.map((c) => {
        const primaryAddress = c.addresses[0];
        const fullAddress = primaryAddress
          ? [primaryAddress.houseNo, primaryAddress.street, primaryAddress.area, primaryAddress.landmark]
              .filter(Boolean)
              .join(', ')
          : 'None saved';

        return {
          'Customer ID': c.id,
          'Customer Name': c.fullName,
          'Email Address': c.email,
          'Phone Number': c.phone,
          'Registration Date': new Date(c.createdAt).toLocaleDateString('en-IN'),
          'Saved Address': fullAddress,
          'PIN Code': primaryAddress?.pincode || 'N/A',
          'District': primaryAddress?.district || 'N/A',
          'State': primaryAddress?.state || 'N/A',
          'Total Orders': c.totalOrders || 0,
          'Total Spent (INR)': c.totalSpending || 0,
          'Status': c.status,
        };
      });
    } else if (type === 'products') {
      const { products } = getProducts({ includeInactive: true });
      dataRows = products.map((p) => ({
        'Product ID': p.id,
        'SKU': p.sku || 'N/A',
        'Name': p.name,
        'Category': p.categoryTitle,
        'Subcategory': p.subcategoryTitle,
        'Selling Price (INR)': p.price,
        'MRP (INR)': p.mrp,
        'Discount %': p.discountPercent,
        'Stock Units': p.stock,
        'Status': p.status || 'active',
        'Sizes': p.sizes.join(', '),
        'Colors': p.colors.map((c) => c.name).join(', '),
        'Rating': p.rating,
        'Reviews': p.reviewCount,
        'Created At': new Date(p.createdAt).toLocaleDateString('en-IN'),
      }));
    } else if (type === 'orders') {
      const orders = getOrders();
      dataRows = orders.map((o) => ({
        'Order Number': o.orderNumber,
        'Order Date': new Date(o.createdAt).toLocaleDateString('en-IN'),
        'Customer Name': o.customerName,
        'Customer Email': o.email,
        'Customer Phone': o.phone,
        'Delivery Address': `${o.shippingAddress.district || ''}, ${o.shippingAddress.state || ''} - ${o.shippingAddress.pincode}`,
        'Item Summary': o.items.map((it) => `${it.quantity}x ${it.name} (${it.size})`).join('; '),
        'Subtotal (INR)': o.subtotal,
        'Discount (INR)': o.discount,
        'Delivery (INR)': o.deliveryCharge,
        'Total Amount (INR)': o.totalAmount,
        'Payment Method': o.paymentMethod,
        'Payment Status': o.paymentStatus,
        'Order Status': o.orderStatus,
        'Courier': o.courierName || 'N/A',
        'AWB Tracking': o.trackingNumber || 'N/A',
      }));
    } else if (type === 'inventory') {
      const { products } = getProducts({ includeInactive: true });
      dataRows = products.map((p) => ({
        'SKU': p.sku || 'N/A',
        'Product Name': p.name,
        'Category': p.categoryTitle,
        'Subcategory': p.subcategoryTitle,
        'Current Stock': p.stock,
        'Stock Status': p.stock === 0 ? 'OUT OF STOCK' : p.stock < 15 ? 'LOW STOCK' : 'IN STOCK',
        'Unit Price (INR)': p.price,
        'Inventory Value (INR)': p.stock * p.price,
      }));
    } else if (type === 'sales') {
      const orders = getOrders();
      const validOrders = orders.filter((o) => o.orderStatus !== 'Cancelled' && o.paymentStatus !== 'REFUNDED');
      dataRows = validOrders.map((o) => ({
        'Order Date': new Date(o.createdAt).toLocaleDateString('en-IN'),
        'Order Number': o.orderNumber,
        'Customer': o.customerName,
        'Payment Method': o.paymentMethod,
        'Total Revenue (INR)': o.totalAmount,
        'Discount Given (INR)': o.discount,
        'Status': o.orderStatus,
      }));
    }

    logAdminActivity('Export Generated', 'Settings', `Exported ${type} in ${format.toUpperCase()} format`, auth.email);

    // Create workbook using xlsx
    const worksheet = XLSX.utils.json_to_sheet(dataRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type.toUpperCase());

    if (format === 'xlsx') {
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      return new NextResponse(excelBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filenameBase}.xlsx"`,
        },
      });
    }

    // Default to CSV
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filenameBase}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

