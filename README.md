# 🚗 DriveNow — Backend NestJS

API REST complète pour la plateforme de location de voitures DriveNow.

---

## 📋 Table des matières

1. [Technologies utilisées](#technologies)
2. [Arborescence du projet](#arborescence)
3. [Étape 1 — Créer la base de données avec XAMPP](#etape-1-base-de-donnees)
4. [Étape 2 — Installer et configurer le backend](#etape-2-installation)
5. [Étape 3 — Démarrer le backend](#etape-3-demarrage)
6. [Étape 4 — Tester avec Swagger](#etape-4-swagger)
7. [Étape 5 — Connecter le frontend React](#etape-5-frontend)
8. [Endpoints de l'API](#endpoints)
9. [Rôles et permissions (RBAC)](#rbac)
10. [Variables d'environnement](#env)

---

## Technologies {#technologies}

| Technologie    | Rôle                              |
|----------------|-----------------------------------|
| NestJS         | Framework backend                 |
| TypeScript     | Typage statique                   |
| TypeORM        | ORM pour MySQL                    |
| MySQL (XAMPP)  | Base de données relationnelle     |
| Passport + JWT | Authentification                  |
| bcrypt         | Hashage des mots de passe         |
| class-validator| Validation des données            |
| Swagger        | Documentation interactive de l'API|
| Helmet         | Sécurité HTTP                     |
| Axios          | Appels API externe (OpenWeather)  |

---

## Arborescence du projet {#arborescence}

```
car-rental-backend/
├── src/
│   ├── auth/
│   │   ├── dto/auth.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   ├── users/
│   │   ├── dto/update-user.dto.ts
│   │   ├── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── cars/
│   │   ├── dto/car.dto.ts
│   │   ├── car.entity.ts
│   │   ├── cars.controller.ts
│   │   ├── cars.service.ts
│   │   └── cars.module.ts
│   ├── bookings/
│   │   ├── dto/booking.dto.ts
│   │   ├── booking.entity.ts
│   │   ├── bookings.controller.ts
│   │   ├── bookings.service.ts
│   │   └── bookings.module.ts
│   ├── payments/
│   │   ├── dto/payment.dto.ts
│   │   ├── payment.entity.ts
│   │   ├── payments.controller.ts
│   │   ├── payments.service.ts
│   │   └── payments.module.ts
│   ├── weather/
│   │   ├── weather.controller.ts
│   │   ├── weather.service.ts
│   │   └── weather.module.ts
│   ├── common/
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   └── filters/
│   │       └── http-exception.filter.ts
│   ├── app.module.ts
│   └── main.ts
├── .env                  ← à créer (copier .env.example)
├── .env.example
├── package.json
├── tsconfig.json
└── nest-cli.json
```

---

## Étape 1 — Créer la base de données avec XAMPP {#etape-1-base-de-donnees}

### 1.1 — Démarrer XAMPP

1. Ouvrir **XAMPP Control Panel**
2. Cliquer **Start** sur **Apache** et **MySQL**
3. Vérifier que les deux sont verts ✅

### 1.2 — Créer la base de données

1. Ouvrir votre navigateur → aller sur `http://localhost/phpmyadmin`
2. Cliquer sur **Nouvelle base de données** (panneau de gauche)
3. Saisir le nom : `car_rental_db`
4. Sélectionner l'encodage : `utf8mb4_general_ci`
5. Cliquer **Créer**

> ✅ C'est tout ! TypeORM va créer automatiquement les tables au démarrage du backend grâce à `synchronize: true`.

### 1.3 — Vérifier l'utilisateur MySQL

Par défaut XAMPP utilise :
- Utilisateur : `root`
- Mot de passe : *(vide)*

Si votre configuration est différente, mettez à jour le fichier `.env`.

---

## Étape 2 — Installer et configurer le backend {#etape-2-installation}

### 2.1 — Installer les dépendances

```bash
# Se placer dans le dossier du backend
cd car-rental-backend

# Installer toutes les dépendances
npm install
```

### 2.2 — Créer le fichier .env

```bash
# Copier le fichier exemple
cp .env.example .env
```

Ouvrir `.env` et remplir les valeurs :

```env
PORT=3000

# Base de données MySQL (XAMPP — valeurs par défaut)
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=car_rental_db

# JWT — CHANGER CE SECRET EN PRODUCTION !
JWT_SECRET=drivenow_secret_jwt_2025_super_securise
JWT_EXPIRES_IN=7d

# OpenWeather (optionnel — obtenir sur openweathermap.org)
OPENWEATHER_API_KEY=votre_cle_ici
```

---

## Étape 3 — Démarrer le backend {#etape-3-demarrage}

```bash
# Mode développement (avec hot-reload)
npm run start:dev
```

Vous devriez voir dans le terminal :

```
🚀 DriveNow Backend démarré sur : http://localhost:3000
📚 Documentation Swagger : http://localhost:3000/api/docs
```

> TypeORM va créer automatiquement les tables `users`, `cars`, `bookings`, `payments` dans `car_rental_db`.

### Vérifier que ça fonctionne

```bash
# Tester l'API depuis le terminal
curl http://localhost:3000/api/cars
# Réponse attendue : []  (tableau vide, car pas encore de voitures)
```

---

## Étape 4 — Tester avec Swagger {#etape-4-swagger}

Ouvrir : `http://localhost:3000/api/docs`

### 4.1 — Créer un compte ADMIN

1. Cliquer sur **Auth** → **POST /api/auth/register**
2. Cliquer **Try it out**
3. Saisir :
```json
{
  "firstName": "Admin",
  "lastName": "DriveNow",
  "email": "admin@drivenow.sn",
  "password": "Admin123!",
  "phone": "+221771234567",
  "role": "ADMIN"
}
```
4. Cliquer **Execute**
5. Copier la valeur `access_token` dans la réponse

### 4.2 — S'authentifier dans Swagger

1. Cliquer le bouton **Authorize 🔒** en haut à droite
2. Dans le champ `access-token`, coller le token (sans "Bearer ")
3. Cliquer **Authorize** puis **Close**

### 4.3 — Ajouter des voitures (ADMIN)

1. Aller sur **Cars** → **POST /api/cars**
2. Cliquer **Try it out** et saisir :
```json
{
  "brand": "Mercedes",
  "model": "CLA 250",
  "year": 2023,
  "pricePerDay": 45000,
  "transmission": "AUTOMATIQUE",
  "fuelType": "ESSENCE",
  "seats": 5,
  "imageUrl": "https://images.unsplash.com/photo-1609703048009-d3576872b32c",
  "available": true
}
```

### 4.4 — Créer un compte CLIENT et réserver

1. **POST /api/auth/register** avec `"role": "CLIENT"`
2. Copier le token, se ré-authentifier
3. **POST /api/bookings** :
```json
{
  "carId": 1,
  "startDate": "2025-08-01",
  "endDate": "2025-08-05"
}
```

### 4.5 — Tester la météo

1. **GET /api/weather/{city}** → saisir `Dakar` comme city
2. Cliquer **Execute**

---

## Étape 5 — Connecter le frontend React {#etape-5-frontend}

### 5.1 — Copier les fichiers d'intégration

Dans le dossier `FRONTEND_INTEGRATION/` vous trouverez :

```
FRONTEND_INTEGRATION/
└── src/
    ├── services/
    │   └── api.ts               ← Service API complet
    └── contexts/
        ├── AuthContext.tsx      ← Remplace l'ancien (plus de localStorage)
        └── ReservationContext.tsx ← Remplace l'ancien (appels API réels)
```

**Copier ces fichiers dans votre projet React :**

```bash
# Depuis la racine de car-rental-main/
cp ../car-rental-backend/FRONTEND_INTEGRATION/src/services/api.ts src/services/api.ts
cp ../car-rental-backend/FRONTEND_INTEGRATION/src/contexts/AuthContext.tsx src/contexts/AuthContext.tsx
cp ../car-rental-backend/FRONTEND_INTEGRATION/src/contexts/ReservationContext.tsx src/contexts/ReservationContext.tsx
```

### 5.2 — Adapter les pages Login et Register

Les signatures des fonctions ont légèrement changé.

**Login.tsx** — modifier l'appel :
```tsx
// AVANT
const success = login(email, password); // synchrone

// APRÈS
const success = await login(email, password); // asynchrone
```

**Register.tsx** — modifier l'appel :
```tsx
// AVANT
const success = register(name, email, password);

// APRÈS
const success = await register(firstName, lastName, email, password, phone);
// Note : "name" est maintenant séparé en firstName + lastName
```

### 5.3 — Adapter les pages Cars et Reservations

**Cars.tsx** — charger depuis l'API :
```tsx
import { useEffect, useState } from 'react';
import { carsApi, type Car } from '../services/api';

const [cars, setCars] = useState<Car[]>([]);

useEffect(() => {
  carsApi.getAll(true).then(setCars); // available=true uniquement
}, []);
```

**Reservations.tsx** — charger depuis l'API :
```tsx
import { useEffect } from 'react';
import { useReservations } from '../contexts/ReservationContext';

const { reservations, fetchMyReservations, loading } = useReservations();

useEffect(() => {
  fetchMyReservations();
}, []);
```

### 5.4 — Variables d'environnement Vite (optionnel)

Créer `car-rental-main/.env` :
```env
VITE_API_URL=http://localhost:3000/api
```

Puis dans `api.ts` remplacer :
```ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

---

## Endpoints de l'API {#endpoints}

### Auth
| Méthode | Endpoint            | Accès  | Description               |
|---------|---------------------|--------|---------------------------|
| POST    | /api/auth/register  | Public | Inscription               |
| POST    | /api/auth/login     | Public | Connexion → retourne JWT  |
| GET     | /api/auth/profile   | Auth   | Profil de l'utilisateur   |

### Users
| Méthode | Endpoint         | Accès      | Description               |
|---------|------------------|------------|---------------------------|
| GET     | /api/users       | ADMIN      | Liste tous les utilisateurs|
| GET     | /api/users/:id   | Auth       | Détail d'un utilisateur   |
| PATCH   | /api/users/:id   | Auth       | Modifier son profil       |
| DELETE  | /api/users/:id   | ADMIN      | Supprimer un utilisateur  |

### Cars
| Méthode | Endpoint        | Accès | Description              |
|---------|-----------------|-------|--------------------------|
| GET     | /api/cars       | Public| Lister les voitures      |
| GET     | /api/cars/:id   | Public| Détail d'une voiture     |
| POST    | /api/cars       | ADMIN | Ajouter une voiture      |
| PATCH   | /api/cars/:id   | ADMIN | Modifier une voiture     |
| DELETE  | /api/cars/:id   | ADMIN | Supprimer une voiture    |

### Bookings
| Méthode | Endpoint           | Accès  | Description                    |
|---------|--------------------|--------|--------------------------------|
| GET     | /api/bookings      | ADMIN  | Toutes les réservations        |
| GET     | /api/bookings/my   | Auth   | Mes réservations               |
| GET     | /api/bookings/:id  | Auth   | Détail d'une réservation       |
| POST    | /api/bookings      | Auth   | Créer une réservation          |
| PATCH   | /api/bookings/:id  | Auth   | Modifier/Annuler               |
| DELETE  | /api/bookings/:id  | Auth   | Supprimer une réservation      |

### Payments
| Méthode | Endpoint           | Accès | Description            |
|---------|--------------------|-------|------------------------|
| GET     | /api/payments      | ADMIN | Tous les paiements     |
| GET     | /api/payments/:id  | Auth  | Détail paiement        |
| POST    | /api/payments      | Auth  | Effectuer un paiement  |
| PATCH   | /api/payments/:id  | ADMIN | Modifier statut        |

### Weather
| Méthode | Endpoint              | Accès  | Description           |
|---------|-----------------------|--------|-----------------------|
| GET     | /api/weather/:city    | Public | Météo d'une ville     |

---

## Rôles et permissions (RBAC) {#rbac}

```
ADMIN :
  ✅ Tout ce que le CLIENT peut faire
  ✅ Ajouter / modifier / supprimer des voitures
  ✅ Voir toutes les réservations
  ✅ Gérer tous les utilisateurs
  ✅ Gérer les paiements

CLIENT :
  ✅ Voir les voitures disponibles
  ✅ Créer une réservation
  ✅ Voir SES réservations
  ✅ Annuler SES réservations
  ✅ Modifier son propre profil
  ❌ Accéder aux données des autres utilisateurs
```

---

## Variables d'environnement {#env}

| Variable            | Description                          | Exemple                      |
|---------------------|--------------------------------------|------------------------------|
| PORT                | Port du serveur                      | 3000                         |
| DB_HOST             | Hôte MySQL                           | localhost                    |
| DB_PORT             | Port MySQL                           | 3306                         |
| DB_USERNAME         | Nom d'utilisateur MySQL              | root                         |
| DB_PASSWORD         | Mot de passe MySQL (vide par défaut) |                              |
| DB_DATABASE         | Nom de la base de données            | car_rental_db                |
| JWT_SECRET          | Clé secrète pour signer les tokens   | un_secret_long_et_aleatoire  |
| JWT_EXPIRES_IN      | Durée de validité du token           | 7d                           |
| OPENWEATHER_API_KEY | Clé API OpenWeatherMap               | abc123xyz                    |

---

## Obtenir une clé OpenWeather (gratuit)

1. Aller sur https://openweathermap.org/api
2. Créer un compte gratuit
3. Aller dans **My API Keys**
4. Copier votre clé dans `.env`

---

## Vérification finale — Zéro localStorage

✅ `AuthContext.tsx` : Plus de `localStorage.setItem('users', ...)` — les utilisateurs sont en MySQL  
✅ `ReservationContext.tsx` : Les réservations viennent de `/api/bookings/my`  
✅ Seul le **JWT token** est stocké dans `localStorage` (c'est la pratique standard)  
✅ Toute la logique métier est dans NestJS côté serveur  
✅ Les mots de passe sont hashés avec bcrypt, jamais stockés en clair  

---

## Commandes utiles

```bash
# Démarrer en développement
npm run start:dev

# Build pour production
npm run build
npm run start:prod

# Formater le code
npm run format
```

---

*Projet réalisé par Junior — UNIPRO Dakar, Sénégal*  
*Licence Génie Informatique — Développement Web*
