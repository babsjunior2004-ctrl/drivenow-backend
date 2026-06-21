// seed-cars.js
// Script pour ajouter plusieurs voitures d'un coup dans la base de données
// Usage : node seed-cars.js VOTRE_TOKEN_ADMIN

const API_URL = 'https://drivenow-backend-production.up.railway.app/api/cars';
const token = process.argv[2];

if (!token) {
  console.error('❌ Merci de fournir votre token ADMIN.');
  console.error('Usage : node seed-cars.js VOTRE_TOKEN_ADMIN');
  process.exit(1);
}

const cars = [
  {
    brand: 'Mercedes',
    model: 'CLA 250',
    year: 2023,
    pricePerDay: 45000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ESSENCE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    available: true,
  },
  {
    brand: 'Toyota',
    model: 'RAV4',
    year: 2022,
    pricePerDay: 35000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'HYBRIDE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    available: true,
  },
  {
    brand: 'BMW',
    model: 'Série 3',
    year: 2023,
    pricePerDay: 50000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'DIESEL',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    available: true,
  },
  {
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    pricePerDay: 30000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ESSENCE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1633509817627-5a0c0c4a9e4f?w=800',
    available: true,
  },
  {
    brand: 'Peugeot',
    model: '308',
    year: 2021,
    pricePerDay: 22000,
    transmission: 'MANUELLE',
    fuelType: 'DIESEL',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
    available: true,
  },
  {
    brand: 'Range Rover',
    model: 'Evoque',
    year: 2023,
    pricePerDay: 65000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ESSENCE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    available: true,
  },
  {
    brand: 'Kia',
    model: 'Sportage',
    year: 2022,
    pricePerDay: 28000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ESSENCE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    available: true,
  },
  {
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    pricePerDay: 48000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'DIESEL',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    available: true,
  },
];

async function seedCars() {
  console.log(`🚗 Ajout de ${cars.length} voitures...\n`);

  for (const car of cars) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`✅ Ajoutée : ${car.brand} ${car.model}`);
      } else {
        console.log(`❌ Échec pour ${car.brand} ${car.model} :`, data.message);
      }
    } catch (err) {
      console.log(`❌ Erreur réseau pour ${car.brand} ${car.model} :`, err.message);
    }
  }

  console.log('\n🎉 Terminé !');
}

seedCars();