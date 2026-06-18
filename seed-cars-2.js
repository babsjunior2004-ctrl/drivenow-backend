// seed-cars-2.js
// Script pour ajouter 8 voitures supplémentaires (pour atteindre 16 au total)
// Usage : node seed-cars-2.js VOTRE_TOKEN_ADMIN

const API_URL = 'http://localhost:3000/api/cars';
const token = process.argv[2];

if (!token) {
  console.error('❌ Merci de fournir votre token ADMIN.');
  console.error('Usage : node seed-cars-2.js VOTRE_TOKEN_ADMIN');
  process.exit(1);
}

const cars = [
  {
    brand: 'Volkswagen',
    model: 'Tiguan',
    year: 2022,
    pricePerDay: 32000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'DIESEL',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1622194993300-ec3c1abe9bd9?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    brand: 'Ford',
    model: 'Explorer',
    year: 2022,
    pricePerDay: 40000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ESSENCE',
    seats: 7,
    imageUrl: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    brand: 'Nissan',
    model: 'Qashqai',
    year: 2023,
    pricePerDay: 27000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ESSENCE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1609520505218-7421df1aa30c?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    brand: 'Honda',
    model: 'CR-V',
    year: 2022,
    pricePerDay: 33000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'HYBRIDE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd55ca?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    pricePerDay: 70000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ELECTRIQUE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    brand: 'Renault',
    model: 'Duster',
    year: 2021,
    pricePerDay: 20000,
    transmission: 'MANUELLE',
    fuelType: 'DIESEL',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    brand: 'Mercedes',
    model: 'GLC',
    year: 2023,
    pricePerDay: 58000,
    transmission: 'AUTOMATIQUE',
    fuelType: 'ESSENCE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
  {
    brand: 'Suzuki',
    model: 'Vitara',
    year: 2021,
    pricePerDay: 23000,
    transmission: 'MANUELLE',
    fuelType: 'ESSENCE',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800&auto=format&fit=crop&q=80',
    available: true,
  },
];

async function seedCars() {
  console.log(`🚗 Ajout de ${cars.length} voitures supplémentaires...\n`);

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

  console.log('\n🎉 Terminé ! Va sur http://localhost:5173/cars et rafraîchis la page.');
}

seedCars();
