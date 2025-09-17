
import { addCountry, addUpdate } from '../src/lib/actions';
import { getCountriesAction } from '../src/lib/actions';
import type { Country } from '@/lib/definitions';

const countryData = [
    { name: 'Republic of Eldoria', owner: 'Alice' },
    { name: 'Veridian Protectorate', owner: 'Bob' },
    { name: 'Crystalian Empire', owner: 'Charlie' },
    { name: 'Republik Holubia', owner: 'System' },
    { name: 'ZVENO', owner: 'System' },
    { name: 'Rumelia', owner: 'System' },
];

const updateData = [
    {
      countryName: 'Rumelia',
      title: 'Mengenal Direktorat Keamanan Negara, Badan Kepolisian Rahasia Rumelia',
      content: 'Miljacka- layaknya negara pada umumnya, Rumelia mempunyai seperangkat alat keamanan untuk mengamankan negaranya dari ancaman baik internal atau pun eksternal. Kali ini Rumelia People Daily akan membahas mengenai Direktorat Keamanan Negara atau Directorate for Security State atau dalam bahasa Slavony dikenal sebagai Uprava državne bezbednosti (UDBA). Sementara itu kalangan masyarakat umum menyebutnya sebagai State Security Service (S-3). UDBA adalah badan organisasi kepolisian rahasia dari Republik Federasi Sosialis Rumelia yang dibentuk pada masa awal pemerintahan Tito dan berjalan hingga sekarang. UDBA berada dibawah kendali Kementrian urusan dalam negeri Rumelia. Selain itu, UDBA juga memiliki sejumlah fungsi selain polisi rahasia antara lain yaitu sebagai Gendarmerie (Internal Troops), Badan Intelijen, Penjaga Perbatasan, badan penegakkan hukum, dan otoritas kamp konsentrasi. Saat ini jumlah total anggota UDBA masih dirahasiakan dan tidak dipublikasikan akan tetapi anggota UDBA yang bertugas sebagai Pasukan Internal (Gendarmerie) diperkirakan mencapai 200-300 ribu orang mereka bertugas sebagai paramiliter bantu (Auxillary) bagi badan kepolisian Rumelia. Inti utama organisasi ini pada bagian intelejen dan kepolisian rahasia. Kedua fungsi ini bertugas untuk menetralisir apapun yang dianggap sebagai ancaman internal bagi Pemerintahan Rumelia.',
      year: new Date().getFullYear(),
      createdAt: new Date().toISOString(),
      needsMapUpdate: false,
    },
    {
      countryName: 'ZVENO',
      title: 'ZVENO Fast News ™: Akademisi Mengecam Rencana Holubia',
      content: 'Sebuah petisi yang ditandatangani oleh 11.000 akademisi terkait hubungan internasional yang berhasil terkumpul hanya dalam 15 menit menghasilkan tekanan untuk pemerintah agar melakukan pengecaman terhadap rencana Republik Holubia. Pernyataan itu diperkuat dengan video argumen dari seorang pakar ekologi dari Universitas Negeri Renastol yang menekankan adanya pertimbangan atas 1001 kerusakan yang ditimbulkannya.',
      year: new Date().getFullYear(),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
      needsMapUpdate: false,
    },
    {
      countryName: 'Republic of Eldoria',
      title: 'The Eldorian Sky-Sail Breakthrough',
      content: 'Scientists in Eldoria have perfected the art of sky-sailing, using lighter-than-air ships to navigate the upper atmosphere. This new technology promises to revolutionize trade and travel across the continent, opening up previously inaccessible mountain regions. The first commercial routes are expected to launch by year\'s end.',
      year: 2024,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
      needsMapUpdate: true,
      coverImage: 'https://picsum.photos/seed/u1/800/400'
    },
    {
      countryName: 'Veridian Protectorate',
      title: 'Veridia Announces Grand Reforestation Initiative',
      content: 'The Veridian Protectorate has launched an ambitious 50-year plan to reforest the Great Arid Plains. Using advanced hydroponics and resilient seed-strains, the project aims to restore the ancient ecosystem and combat desertification. "This is a gift to our children\'s children," declared the High Protector.',
      year: 2024,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
      needsMapUpdate: true,
    },
     {
      countryName: 'Crystalian Empire',
      title: 'Crystalian Empire Unveils Geothermal Power Grid',
      content: 'The Crystalian Empire has activated the first phase of its continent-spanning geothermal power grid. Tapping into the volcanic activity of the Dragon\'s Tooth mountain range, the new grid provides clean, near-limitless energy to its heartland provinces. Imperial engineers claim this will usher in a new age of industry and prosperity.',
      year: 2024,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
      needsMapUpdate: false,
    },
];

async function importCountries() {
  console.log('Importing countries...');
  for (const country of countryData) {
    try {
      // This is a simplified call; the action handles the full object creation.
      // @ts-ignore
      await addCountry(country);
      console.log(`Added country: ${country.name}`);
    } catch (error) {
      console.error(`Failed to add country ${country.name}: `, error);
    }
  }
  console.log('Finished importing countries.\n');
}

async function importUpdates() {
    console.log('Importing updates...');
    const countries = await getCountriesAction();
    const countryMap = new Map(countries.map(c => [c.name, c.id]));

    for (const update of updateData) {
        const { countryName, ...updatePayload } = update;
        const countryId = countryMap.get(countryName);

        if (!countryId) {
            console.warn(`Skipping update "${update.title}" because country "${countryName}" was not found.`);
            continue;
        }

        try {
            // This is a simplified call; the action handles the full object creation.
            // @ts-ignore
            await addUpdate({
                ...updatePayload,
                countryId,
            });
            console.log(`Added update: ${update.title}`);
        } catch (error) {
            console.error(`Failed to add update "${update.title}": `, error);
        }
    }
    console.log('Finished importing updates.');
}


async function main() {
    // NOTE: This script does not check for duplicates.
    // It's intended for seeding a fresh, empty database.
    // Running it multiple times will create duplicate entries.
    await importCountries();
    await importUpdates();
}

if (require.main === module) {
  main().catch(console.error).then(() => {
      console.log('\nData import complete. If you see errors, check Firestore rules. Press Ctrl+C to exit.');
  });
}
