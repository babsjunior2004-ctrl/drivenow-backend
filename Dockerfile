# ─── Stage 1 : Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers de dépendances d'abord (cache Docker optimisé)
COPY package*.json ./

RUN npm ci

# Copier le reste du code source
COPY . .

# Compiler TypeScript → dist/
RUN npm run build

# ─── Stage 2 : Production ──────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copier les dépendances de production uniquement
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copier le build depuis le stage précédent
COPY --from=builder /app/dist ./dist

# Exposer le port de l'API
EXPOSE 3000

# Lancer l'application compilée
CMD ["node", "dist/main"]
