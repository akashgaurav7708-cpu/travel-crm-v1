const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 50 unique, high-quality, royalty-free Unsplash photo IDs for Kashmir/travel categories
const photoIds = [
  // Hero, Banners, Backgrounds (1-5)
  { id: '1', unsplashId: 'photo-1501785888041-af3ef285b470', name: 'hero_bg.jpg' },
  { id: '2', unsplashId: 'photo-1476514525535-07fb3b4ae5f1', name: 'about_us.jpg' },
  { id: '3', unsplashId: 'photo-1506744038136-46273834b3fb', name: 'booking_bg.jpg' },
  { id: '4', unsplashId: 'photo-1470071459604-3b5ec3a7fe05', name: 'houseboat_slider_1.jpg' },
  { id: '5', unsplashId: 'photo-1520250497591-112f2f40a3f4', name: 'houseboat_slider_2.jpg' },

  // Destinations (6-17)
  { id: '6', unsplashId: 'photo-1513407030348-c983a97b98d8', name: 'dest_srinagar.jpg' },
  { id: '7', unsplashId: 'photo-1439066615861-d1af74d74000', name: 'dest_gulmarg.jpg' },
  { id: '8', unsplashId: 'photo-1447752875215-b2761acb3c5d', name: 'dest_pahalgam.jpg' },
  { id: '9', unsplashId: 'photo-1523712999610-f77fbcfc3843', name: 'dest_sonmarg.jpg' },
  { id: '10', unsplashId: 'photo-1500530855697-b586d89ba3ee', name: 'dest_doodhpathri.jpg' },
  { id: '11', unsplashId: 'photo-1518495973542-4542c06a5843', name: 'dest_yusmarg.jpg' },
  { id: '12', unsplashId: 'photo-1542314831-068cd1dbfeeb', name: 'dest_gurez.jpg' },
  { id: '13', unsplashId: 'photo-1454496522488-7a8e488e8606', name: 'dest_bangus.jpg' },
  { id: '14', unsplashId: 'photo-1475113548554-5a36f1f523d6', name: 'dest_keran.jpg' },
  { id: '15', unsplashId: 'photo-1508739773434-c26b3d09e071', name: 'dest_lolab.jpg' },
  { id: '16', unsplashId: 'photo-1465146344425-f00d5f5c8f07', name: 'dest_aharbal.jpg' },
  { id: '17', unsplashId: 'photo-1448375240586-882707db888b', name: 'dest_tulip.jpg' },

  // Services (18-21)
  { id: '18', unsplashId: 'photo-1501555088652-021faa106b9b', name: 'srv_packages.jpg' },
  { id: '19', unsplashId: 'photo-1618773928121-c32242e63f39', name: 'srv_hotels.jpg' },
  { id: '20', unsplashId: 'photo-1541899481282-d53bffe3c35d', name: 'srv_transport.jpg' },
  { id: '21', unsplashId: 'photo-1524492412937-b28074a5d7da', name: 'srv_honeymoon.jpg' },

  // Packages (22-30)
  { id: '22', unsplashId: 'photo-1504384308090-c894fdcc538d', name: 'pkg_4n5d.jpg' },
  { id: '23', unsplashId: 'photo-1433832597046-4f10e10ac764', name: 'pkg_5n6d.jpg' },
  { id: '24', unsplashId: 'photo-1566073771259-6a8506099945', name: 'pkg_6n7d.jpg' },
  { id: '25', unsplashId: 'photo-1470240731273-7821a6eeb6bd', name: 'pkg_honeymoon.jpg' },
  { id: '26', unsplashId: 'photo-1503376780353-7e6692767b70', name: 'pkg_family.jpg' },
  { id: '27', unsplashId: 'photo-1533473359331-0135ef1b58bf', name: 'pkg_luxury.jpg' },
  { id: '28', unsplashId: 'photo-1469474968028-56623f02e42e', name: 'pkg_snow.jpg' },
  { id: '29', unsplashId: 'photo-1519681393784-d120267933ba', name: 'pkg_tulip.jpg' },
  { id: '30', unsplashId: 'photo-1501555088652-021faa106b9b', name: 'pkg_adventure.jpg' },

  // Hotels (31-38)
  { id: '31', unsplashId: 'photo-1566228015668-4c45dbc4e2f5', name: 'hotel_khyber.jpg' },
  { id: '32', unsplashId: 'photo-1582719508461-905c673771fd', name: 'hotel_taj.jpg' },
  { id: '33', unsplashId: 'photo-1540555700478-4be289fbecef', name: 'hotel_radisson.jpg' },
  { id: '34', unsplashId: 'photo-1551882547-ff40c63fe5fa', name: 'hotel_pinepeak.jpg' },
  { id: '35', unsplashId: 'photo-1495365200479-c4ed1d390420', name: 'hotel_grandmumtaz.jpg' },
  { id: '36', unsplashId: 'photo-1596394516093-501ba68a0ba6', name: 'hotel_highlands.jpg' },
  { id: '37', unsplashId: 'photo-1520250497591-112f2f40a3f4', name: 'hotel_kolahoi.jpg' },
  { id: '38', unsplashId: 'photo-1568605114967-8130f3a36994', name: 'hotel_royalpalace.jpg' },

  // Transport Vehicles (39-44)
  { id: '39', unsplashId: 'photo-1533473359331-0135ef1b58bf', name: 'car_innova.jpg' },
  { id: '40', unsplashId: 'photo-1549399542-7e3f8b79c341', name: 'car_crysta.jpg' },
  { id: '41', unsplashId: 'photo-1503376780353-7e6692767b70', name: 'car_suv.jpg' },
  { id: '42', unsplashId: 'photo-1541899481282-d53bffe3c35d', name: 'car_tempo.jpg' },
  { id: '43', unsplashId: 'photo-1552519507-da3b142c6e3d', name: 'car_sedan.jpg' },
  { id: '44', unsplashId: 'photo-1617788138017-80ad40651399', name: 'car_mercedes.jpg' },

  // Blog / News / Testimonial Avatars (45-50)
  { id: '45', unsplashId: 'photo-1488590528505-98d2b5aba04b', name: 'blog_tips.jpg' },
  { id: '46', unsplashId: 'photo-1485827404703-89b55fcc595e', name: 'blog_snow.jpg' },
  { id: '47', unsplashId: 'photo-1518770660439-4636190af475', name: 'blog_weather.jpg' },
  { id: '48', unsplashId: 'photo-1507003211169-0a1dd7228f2d', name: 'avatar_male1.jpg' },
  { id: '49', unsplashId: 'photo-1534528741775-53994a69daeb', name: 'avatar_female1.jpg' },
  { id: '50', unsplashId: 'photo-1500648767791-00dcc994a43e', name: 'avatar_male2.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Handle redirect
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: Status Code ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log(`Starting download of ${photoIds.length} unique images into ${IMAGES_DIR}...`);
  for (let i = 0; i < photoIds.length; i++) {
    const item = photoIds[i];
    const destPath = path.join(IMAGES_DIR, item.name);
    // Request a optimized small/medium version to avoid large network footprints while keeping high-fidelity
    const url = `https://images.unsplash.com/${item.unsplashId}?auto=format&fit=crop&q=80&w=800`;
    try {
      console.log(`[${i + 1}/${photoIds.length}] Downloading ${item.name}...`);
      await download(url, destPath);
    } catch (error) {
      console.error(`Error downloading ${item.name}:`, error.message);
    }
  }
  console.log('All downloads completed!');
}

main();
