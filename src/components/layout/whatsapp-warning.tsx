
'use client';

import { AlertTriangle } from 'lucide-react';

export default function WhatsAppWarning() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground p-3 text-center text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span>
          For now, all updates must be submitted via WhatsApp to the admins (Tamim or Andra).
        </span>
      </div>
    </div>
  );
}
