
'use server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { List, ListItem } from '@/components/ui/list';

export default async function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
          Important Info
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome to UNITED LAPA NATIONS (ULN)
        </p>
      </div>

      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <span>Welcome to ULN!</span>
            <Badge variant="outline">SINCE 2017 IRL!🏅</Badge>
          </CardTitle>
          <CardDescription>
           Welcome to ULN, a mapgame organization set on the planet Lapa. Our mapgame combines interactive simulation games with in-depth worldbuilding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-headline text-xl font-semibold mb-2">Rules</h3>
            <List>
              <ListItem>No 18+, spam, etc.</ListItem>
              <ListItem>References to real countries are suggested, but do not plagiarize completely.</ListItem>
              <ListItem>Military equipment can be taken from Google but must be realistic.</ListItem>
              <ListItem>Real religions should have their names changed, e.g., Islam = 'Dinhaq', Catholic = 'Romansky'.</ListItem>
              <ListItem>No 'bid'ah' clubs (too futuristic, nonsensical, etc.).</ListItem>
            </List>
          </div>
           <div>
            <h3 className="font-headline text-xl font-semibold mb-2">Other Important Info</h3>
             <List>
              <ListItem>1 Lapa year = 1 Earth month (September 2025 = 2080).</ListItem>
              <ListItem>$= 1 ULD = 1 USD.</ListItem>
              <ListItem>IG: @unitedlapanations (account is defunct).</ListItem>
            </List>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
