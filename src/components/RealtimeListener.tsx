'use client';

import { useEffect } from 'react';

export default function RealtimeListener() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('EventSource' in window)) return;

    let eventSource: EventSource | null = null;
    let reconnectTimeout: any = null;

    function connect() {
      try {
        eventSource = new EventSource('/api/events?channel=public');

        eventSource.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data.type && !data.type.startsWith('system:')) {
              window.dispatchEvent(
                new CustomEvent('goyal:realtime-update', { detail: data })
              );

              // Specific dispatch for targeted listeners
              if (data.type.startsWith('product:')) {
                window.dispatchEvent(
                  new CustomEvent('goyal:product-update', { detail: data })
                );
              } else if (data.type.startsWith('order:')) {
                window.dispatchEvent(
                  new CustomEvent('goyal:order-update', { detail: data })
                );
              } else if (data.type.startsWith('category:')) {
                window.dispatchEvent(
                  new CustomEvent('goyal:category-update', { detail: data })
                );
              }
            }
          } catch (err) {
            // ping or parse error
          }
        };

        eventSource.onerror = () => {
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          // Retry connection after 5 seconds
          clearTimeout(reconnectTimeout);
          reconnectTimeout = setTimeout(connect, 5000);
        };
      } catch (err) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = setTimeout(connect, 5000);
      }
    }

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return null;
}
