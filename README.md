# 🚗 DriveNow — Backend API REST

Backend NestJS pour la plateforme de location de voitures **DriveNow**.  
Développé dans le cadre de l'Examen Final NestJS — Licence 2 Génie Informatique, UNIPRO Dakar.

---

## 👥 Membres du groupe

- Babacar Junior Traore
- Seynabou Ba
- Jeannoth Pierroth
- Deguène Kandji

---

## 🛠️ Technologies utilisées

| Technologie | Rôle |
|---|---|
| NestJS + TypeScript | Framework backend |
| MySQL + TypeORM | Base de données relationnelle |
| Passport + JWT | Authentification |
| bcrypt | Hashage des mots de passe |
| class-validator | Validation des données |
| Swagger | Documentation API |
| OpenWeather API | API externe — météo |
| Helmet + CORS | Sécurité HTTP |
| Docker | Containerisation |
| GitHub Actions | Pipeline CI/CD |

---

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+
- XAMPP (MySQL)
- npm

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/babsjunior2004-ctrl/drivenow-backend.git
cd drivenow-backend

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# 4. Créer la base de données
# Ouvrir phpMyAdmin → Créer une BDD nommée : car_rental_db
# TypeORM crée les tables automatiquement au démarrage

# 5. Démarrer le backend
npm run start:dev
```

---

## 📚 Documentation Swagger

Une fois le backend démarré, accéder à :http://localhost:3000/api/docs

---

## 🔐 Variables d'environnement

Copier `.env.example` en `.env` et remplir :

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=car_rental_db
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=7d
OPENWEATHER_API_KEY=votre_cle_openweather
```

---

## 📡 Endpoints principaux

| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Inscription |
| POST | /api/auth/login | Public | Connexion → JWT |
| GET | /api/cars | Public | Liste des voitures |
| POST | /api/cars | ADMIN | Ajouter une voiture |
| POST | /api/bookings | AUTH | Créer une réservation |
| GET | /api/bookings | ADMIN | Toutes les réservations |
| GET | /api/bookings/my | CLIENT | Mes réservations |
| GET | /api/weather/:city | Public | Météo d'une ville |

---

## 🔑 Comptes de test

Créer via Swagger (`POST /api/auth/register`) :

```json
// Compte ADMIN
{
  "firstName": "Admin",
  "lastName": "DriveNow",
  "email": "admin@drivenow.sn",
  "password": "Admin123!",
  "role": "ADMIN"
}

// Compte CLIENT
{
  "firstName": "Client",
  "lastName": "Test",
  "email": "client@test.com",
  "password": "Client123!"
}
```

---

## 🌱 Peupler la base de données

Après avoir créé un compte ADMIN et récupéré son token :

```bash
node seed-cars.js TOKEN_ADMIN
node seed-cars-2.js TOKEN_ADMIN
```

---

## 🐳 Docker

```bash
# Lancer avec Docker Compose (backend + MySQL)
docker-compose up -d
```

---

## ✅ Fonctionnalités implémentées

- ✅ API REST NestJS complète et modulaire
- ✅ Base de données MySQL avec TypeORM
- ✅ Authentification JWT avec bcrypt
- ✅ RBAC — rôles Admin et Client
- ✅ CRUD complet (Cars, Bookings, Users, Payments)
- ✅ Validation DTO + class-validator
- ✅ Gestion globale des erreurs
- ✅ Documentation Swagger
- ✅ Intégration API OpenWeather
- ✅ Dockerisation
- ✅ Pipeline CI/CD GitHub Actions

---

## 🔗 Liens

- Frontend : [drivenow-frontend](https://github.com/babsjunior2004-ctrl/drivenow-frontend)
- Swagger : `https://drivenow-backend-production.up.railway.app/api/docs#/`