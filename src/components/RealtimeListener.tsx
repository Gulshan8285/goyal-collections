'use client';

import { useEffect } from 'react';

export default function RealtimeListener() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('EventSource' in window)) return;

    let eventSource: EventSource | null = null;
    let reconnectTimeout: any = null;

    function handleDispatch(detail: any, eventType?: string) {
      if (!detail) return;
      const type = eventType || detail.type || '';

      window.dispatchEvent(
        new CustomEvent('goyal:realtime-update', { detail })
      );

      if (type.startsWith('product:') || type === 'stock:updated') {
        window.dispatchEvent(
          new CustomEvent('goyal:product-update', { detail })
        );
      }
      if (type.startsWith('order:')) {
        window.dispatchEvent(
          new CustomEvent('goyal:order-update', { detail })
        );
      }
      if (type.startsWith('category:')) {
        window.dispatchEvent(
          new CustomEvent('goyal:category-update', { detail })
        );
      }
      if (type.startsWith('review:')) {
        window.dispatchEvent(
          new CustomEvent('goyal:review-update', { detail })
        );
      }
    }

    function connect() {
      try {
        eventSource = new EventSource('/api/events?channel=public');

        eventSource.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data && data.type && !data.type.startsWith('system:')) {
              handleDispatch(data.payload ?? data, data.type);
            }
          } catch (err) {}
        };

        const eventTypes = [
          'product:created',
          'product:updated',
          'product:deleted',
          'stock:updated',
          'order:updated',
          'review:updated',
          'category:updated',
        ];

        eventTypes.forEach((t) => {
          eventSource?.addEventListener(t, (e: any) => {
            try {
              const data = JSON.parse(e.data);
              handleDispatch(data, t);
            } catch (err) {}
          });
        });

        eventSource.onerror = () => {
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          clearTimeout(reconnectTimeout);
          reconnectTimeout = setTimeout(connect, 4000);
        };
      } catch (err) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = setTimeout(connect, 4000);
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
