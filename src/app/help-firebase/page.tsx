
'use server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

export default async function HelpFirebasePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-foreground">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
          Panduan Memperbaiki Registrasi
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ikuti langkah-langkah visual ini untuk mengizinkan aplikasi menyimpan data.
        </p>
      </div>

      <Alert>
        <AlertTitle>Penting!</AlertTitle>
        <AlertDescription>
          Perubahan ini dilakukan di **website Firebase**, bukan di dalam kode aplikasi. Buka tab browser baru untuk mengikuti panduan ini.
        </AlertDescription>
      </Alert>

      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle>Langkah 1: Buka Firebase Console & Pilih Proyek</CardTitle>
          <CardDescription>
            Buka link <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-bold underline text-primary">https://console.firebase.google.com/</a> dan pilih proyek Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src="https://storage.googleapis.com/studiopublic/walkthroughs/lapa-news/firebase-projects.png" alt="Pilih Proyek di Firebase" width={1200} height={600} className="rounded-md border-2 border-border" />
        </CardContent>
      </Card>
      
      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle>Langkah 2: Pergi ke Firestore Database</CardTitle>
          <CardDescription>
            Di menu sebelah kiri, di bawah kategori 'Build', klik pada **Firestore Database**.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Image src="https://storage.googleapis.com/studiopublic/walkthroughs/lapa-news/firestore-menu.png" alt="Menu Firestore Database" width={1200} height={600} className="rounded-md border-2 border-border" />
        </CardContent>
      </Card>

      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle>Langkah 3: Klik Tab "Rules"</CardTitle>
          <CardDescription>
            Setelah halaman Firestore terbuka, lihat ke bagian atas dan klik pada tab yang bertuliskan **Rules**.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Image src="https://storage.googleapis.com/studiopublic/walkthroughs/lapa-news/firestore-rules-tab.png" alt="Tab Rules di Firestore" width={1200} height={600} className="rounded-md border-2 border-border" />
        </CardContent>
      </Card>

      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle>Langkah 4: Ganti Teks Aturan & Publikasikan</CardTitle>
          <CardDescription>
            Hapus semua teks yang ada di editor. Lalu, salin dan tempelkan kode di bawah ini ke dalamnya. Terakhir, klik tombol biru **Publish**.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="p-4 bg-muted/50 rounded-md overflow-x-auto">
            <code>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
            </code>
          </pre>
          <Image src="https://storage.googleapis.com/studiopublic/walkthroughs/lapa-news/firestore-publish-rules.png" alt="Ganti dan publikasikan rules" width={1200} height={600} className="rounded-md border-2 border-border" />
        </CardContent>
      </Card>

       <Alert variant="destructive">
        <AlertTitle>Selesai!</AlertTitle>
        <AlertDescription>
          Setelah Anda menekan 'Publish', perubahan akan langsung aktif. Coba kembali ke aplikasi Anda dan lakukan registrasi. Seharusnya sekarang sudah berhasil.
        </AlertDescription>
      </Alert>

    </div>
  );
}
