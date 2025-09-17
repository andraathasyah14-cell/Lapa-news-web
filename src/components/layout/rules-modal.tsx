
'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { List, ListItem } from '@/components/ui/list';
import { Badge } from '../ui/badge';

export default function RulesModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const rulesAccepted = sessionStorage.getItem('rulesAccepted');
    if (!rulesAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('rulesAccepted', 'true');
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-4">
            <span>Welcome to ULN! Read the Rules!</span>
            <Badge variant="destructive">IMPORTANT</Badge>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Before you proceed, please read and accept the following rules.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
            <h3 className="font-headline text-lg font-semibold">Main Rules</h3>
            <List>
              <ListItem>No 18+, spam, fighting, etc.</ListItem>
              <ListItem>References to real countries are suggested, but do not plagiarize completely.</ListItem>
              <ListItem>Military equipment can be taken from Google but must be realistic.</ListItem>
              <ListItem>Real religions should have their names changed (e.g., Islam = 'Dinhaq', Catholic = 'Romansky').</ListItem>
              <ListItem>No 'bid'ah' clubs (too futuristic, nonsensical tech, etc.).</ListItem>
            </List>
            <h3 className="font-headline text-lg font-semibold mt-4">Other Important Info</h3>
             <List>
              <ListItem>1 Lapa year = 1 Earth month (e.g., September 2025 in real life is year 2080 in Lapa).</ListItem>
              <ListItem>Currency: 1 ULD = 1 USD.</ListItem>
              <ListItem>The official Instagram account (@unitedlapanations) is currently defunct.</ListItem>
            </List>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAccept}>
            I have read and accepted the rules
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
