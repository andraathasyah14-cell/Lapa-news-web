import type { Country, Update, Comment } from './definitions';

// In-memory store
const data = {
  countries: [
    {
      id: '1',
      name: 'Republic of Eldoria',
      owner: 'Alice',
    },
    {
      id: '2',
      name: 'Veridian Protectorate',
      owner: 'Bob',
    },
    {
      id: '3',
      name: 'Crystalian Empire',
      owner: 'Charlie',
    },
    {
      id: '4',
      name: 'Republik Holubia',
      owner: 'System',
    },
    {
      id: '5',
      name: 'ZVENO',
      owner: 'System',
    },
    {
      id: '6',
      name: 'Rumelia',
      owner: 'System',
    }
  ] as Country[],
  updates: [
    {
      id: 'u5',
      countryId: '6',
      title: 'Mengenal Direktorat Keamanan Negara, Badan Kepolisian Rahasia Rumelia',
      content: 'Miljacka- layaknya negara pada umumnya, Rumelia mempunyai seperangkat alat keamanan untuk mengamankan negaranya dari ancaman baik internal atau pun eksternal. Kali ini Rumelia People Daily akan membahas mengenai Direktorat Keamanan Negara atau Directorate for Security State atau dalam bahasa Slavony dikenal sebagai Uprava državne bezbednosti (UDBA). Sementara itu kalangan masyarakat umum menyebutnya sebagai State Security Service (S-3). UDBA adalah badan organisasi kepolisian rahasia dari Republik Federasi Sosialis Rumelia yang dibentuk pada masa awal pemerintahan Tito dan berjalan hingga sekarang. UDBA berada dibawah kendali Kementrian urusan dalam negeri Rumelia. Selain itu, UDBA juga memiliki sejumlah fungsi selain polisi rahasia antara lain yaitu sebagai Gendarmerie (Internal Troops), Badan Intelijen, Penjaga Perbatasan, badan penegakkan hukum, dan otoritas kamp konsentrasi. Saat ini jumlah total anggota UDBA masih dirahasiakan dan tidak dipublikasikan akan tetapi anggota UDBA yang bertugas sebagai Pasukan Internal (Gendarmerie) diperkirakan mencapai 200-300 ribu orang mereka bertugas sebagai paramiliter bantu (Auxillary) bagi badan kepolisian Rumelia. Inti utama organisasi ini pada bagian intelejen dan kepolisian rahasia. Kedua fungsi ini bertugas untuk menetralisir apapun yang dianggap sebagai ancaman internal bagi Pemerintahan Rumelia.',
      year: new Date().getFullYear(),
      createdAt: new Date().toISOString(),
      comments: [],
      needsMapUpdate: false,
    },
    {
      id: 'u4',
      countryId: '5',
      title: 'ZVENO Fast News ™: Akademisi Mengecam Rencana Holubia',
      content: 'Sebuah petisi yang ditandatangani oleh 11.000 akademisi terkait hubungan internasional yang berhasil terkumpul hanya dalam 15 menit menghasilkan tekanan untuk pemerintah agar melakukan pengecaman terhadap rencana Republik Holubia. Pernyataan itu diperkuat dengan video argumen dari seorang pakar ekologi dari Universitas Negeri Renastol yang menekankan adanya pertimbangan atas 1001 kerusakan yang ditimbulkannya.',
      year: new Date().getFullYear(),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
      comments: [],
      needsMapUpdate: false,
    },
    {
      id: 'u1',
      title: 'The Eldorian Sky-Sail Breakthrough',
      content:
        'Scientists in Eldoria have perfected the art of sky-sailing, using lighter-than-air ships to navigate the upper atmosphere. This new technology promises to revolutionize trade and travel across the continent, opening up previously inaccessible mountain regions. The first commercial routes are expected to launch by year\'s end.',
      countryId: '1',
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
      year: 2024,
      comments: [
        { id: 'c1', author: 'Bob', content: 'Incredible! The Protectorate is watching with great interest.', createdAt: new Date().toISOString() },
      ],
      needsMapUpdate: true,
      coverImage: 'https://picsum.photos/seed/u1/800/400'
    },
    {
      id: 'u2',
      title: 'Veridia Announces Grand Reforestation Initiative',
      content:
        'The Veridian Protectorate has launched an ambitious 50-year plan to reforest the Great Arid Plains. Using advanced hydroponics and resilient seed-strains, the project aims to restore the ancient ecosystem and combat desertification. "This is a gift to our children\'s children," declared the High Protector.',
      countryId: '2',
      createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
      year: 2024,
      comments: [
        { id: 'c2', author: 'Alice', content: 'A noble cause. Eldoria offers its support.', createdAt: new Date().toISOString() },
        { id: 'c3', author: 'Charlie', content: 'The Empire questions the resource allocation for such a long-term venture.', createdAt: new Date().toISOString() },
      ],
      needsMapUpdate: true,
    },
     {
      id: 'u3',
      title: 'Crystalian Empire Unveils Geothermal Power Grid',
      content:
        'The Crystalian Empire has activated the first phase of its continent-spanning geothermal power grid. Tapping into the volcanic activity of the Dragon\'s Tooth mountain range, the new grid provides clean, near-limitless energy to its heartland provinces. Imperial engineers claim this will usher in a new age of industry and prosperity.',
      countryId: '3',
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
      year: 2024,
      comments: [],
      needsMapUpdate: false,
    },
  ] as Update[],
};

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getCountries(): Promise<Country[]> {
  await delay(100);
  return [...data.countries];
}

export async function getCountryById(id: string): Promise<Country | undefined> {
  await delay(50);
  return data.countries.find(c => c.id === id);
}

export async function addCountry(country: Omit<Country, 'id'>) {
  await delay(200);
  const newCountry = { ...country, id: `c${Date.now()}` };
  data.countries.push(newCountry);
  return newCountry;
}

export async function getUpdates(): Promise<Update[]> {
  await delay(100);
  return [...data.updates].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getUpdateById(id: string): Promise<Update | undefined> {
  await delay(50);
  return data.updates.find(u => u.id === id);
}

export async function addUpdate(update: Omit<Update, 'id' | 'comments'>) {
  await delay(200);
  const newUpdate = { ...update, id: `u${Date.now()}`, comments: [] };
  data.updates.push(newUpdate);
  return newUpdate;
}

export async function addCommentToUpdate(updateId: string, comment: Omit<Comment, 'id' | 'createdAt'>) {
  await delay(150);
  const update = data.updates.find(u => u.id === updateId);
  if (!update) {
    throw new Error('Update not found');
  }
  const newComment = { ...comment, id: `c${Date.now()}`, createdAt: new Date().toISOString() };
  update.comments.push(newComment);
  return newComment;
}
