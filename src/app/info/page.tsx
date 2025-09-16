'use server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTranslations } from '@/lib/get-translations';
import { Badge } from '@/components/ui/badge';
import { List, ListItem } from '@/components/ui/list';

export default async function InfoPage() {
  const t = await getTranslations();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
          {t('info.title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('info.subtitle')}
        </p>
      </div>

      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <span>{t('info.welcomeTitle')}</span>
            <Badge variant="outline">SINCE 2017 IRL!🏅</Badge>
          </CardTitle>
          <CardDescription>
           {t('info.welcomeDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-headline text-xl font-semibold mb-2">{t('info.rulesTitle')}</h3>
            <List>
              <ListItem>{t('info.rule1')}</ListItem>
              <ListItem>{t('info.rule2')}</ListItem>
              <ListItem>{t('info.rule3')}</ListItem>
              <ListItem>{t('info.rule4')}</ListItem>
              <ListItem>{t('info.rule5')}</ListItem>
            </List>
          </div>
           <div>
            <h3 className="font-headline text-xl font-semibold mb-2">{t('info.otherInfoTitle')}</h3>
             <List>
              <ListItem>{t('info.info1')}</ListItem>
              <ListItem>{t('info.info2')}</ListItem>
              <ListItem>{t('info.info3')}</ListItem>
            </List>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
