import { NextRequest } from 'next/server';
import { realtimeEmitter, RealtimeEvent, getRecentEvents } from '@/lib/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const channel = searchParams.get('channel') || 'all'; // 'admin' | 'public' | 'all'
  const since = searchParams.get('since') ? Number(searchParams.get('since')) : undefined;

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      // Send initial connection packet
      const initMessage = `data: ${JSON.stringify({
        type: 'system:connected',
        timestamp: Date.now(),
        channel,
        message: 'Real-time synchronization connected successfully',
      })}\n\n`;
      controller.enqueue(encoder.encode(initMessage));

      // Replay recent events if requested
      if (since) {
        const pastEvents = getRecentEvents(since);
        for (const pastEvent of pastEvents.reverse()) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(pastEvent)}\n\n`));
        }
      }

      // Event listener for live emissions
      const handleEvent = (event: RealtimeEvent) => {
        try {
          // Filter if channel is public and event is internal
          if (channel === 'public') {
            const publicEventTypes = [
              'product:created',
              'product:updated',
              'product:deleted',
              'category:updated',
              'stock:updated',
              'review:updated',
              'settings:updated',
              'order:updated',
            ];
            if (!publicEventTypes.includes(event.type)) {
              return;
            }
          }

          const payloadData = JSON.stringify(event.payload ?? event);
          const fullData = JSON.stringify(event);
          const message = `event: ${event.type}\ndata: ${payloadData}\n\n` + `data: ${fullData}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (err) {
          console.error('Error sending SSE event:', err);
        }
      };

      realtimeEmitter.on('event', handleEvent);

      // Periodic keep-alive ping every 15 seconds
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping ${Date.now()}\n\n`));
        } catch (e) {
          clearInterval(pingInterval);
        }
      }, 15000);

      // Cleanup on client disconnect
      request.signal.addEventListener('abort', () => {
        realtimeEmitter.off('event', handleEvent);
        clearInterval(pingInterval);
        try {
          controller.close();
        } catch (e) {
          // stream already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform, no-store, must-revalidate',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
