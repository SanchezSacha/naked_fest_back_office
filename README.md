# N'Fest Back-office et API

Back-office Strapi 5 du projet N'Fest. Il fournit l'interface d'administration,
les contenus du festival et l'API consommée par le site Next.js `naked_fest`.

## Prérequis

- Node.js 20 à 24
- npm 6 ou supérieur
- Facultatif : PostgreSQL 14 ou supérieur

Vérifier les versions installées :

```bash
node --version
npm --version
```

## Installation rapide avec SQLite

SQLite est recommandé pour démarrer simplement en développement local.

```bash
git clone <url-du-depot-nfest_admin>
cd nfest_admin
npm install
```

Créer le fichier d'environnement :

```powershell
Copy-Item .env.example .env
```

Sous macOS ou Linux :

```bash
cp .env.example .env
```

Compléter `.env` :

```dotenv
HOST=0.0.0.0
PORT=1337

APP_KEYS=cle-1,cle-2,cle-3,cle-4
API_TOKEN_SALT=une-valeur-secrete
ADMIN_JWT_SECRET=une-valeur-secrete
TRANSFER_TOKEN_SALT=une-valeur-secrete
JWT_SECRET=une-valeur-secrete
ENCRYPTION_KEY=une-valeur-secrete

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

Les secrets doivent être longs, aléatoires et différents. Ils peuvent être
générés avec :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Charger les contenus de démonstration

Le seed crée les catégories, genres, lieux, artistes, événements, relations,
contenus de la page d'accueil et importe les images de `seed-assets/`.

Ajouter temporairement dans `.env` :

```dotenv
SEED_CONTENT=true
SEED_ONLY=true
```

Puis lancer :

```bash
npm run develop
```

Lorsque le seed est terminé, remettre :

```dotenv
SEED_CONTENT=false
SEED_ONLY=false
```

Le seed peut être relancé : il met à jour les contenus identifiés au lieu de
dupliquer volontairement les données principales.

## Lancer Strapi

Mode développement avec rechargement automatique :

```bash
npm run develop
```

Ouvrir ensuite :

- Administration : http://localhost:1337/admin
- API : http://localhost:1337/api

Au premier lancement, Strapi demande de créer le compte administrateur local.

## Autoriser l'accès à l'API

Deux méthodes sont possibles.

### Token API recommandé

1. Ouvrir `Settings > Global Settings > API Tokens`.
2. Créer un token en lecture seule.
3. Copier le token dans le `.env` du site :

```dotenv
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=token-genere-dans-strapi
```

### Accès public

Dans `Settings > Users & Permissions Plugin > Roles > Public`, autoriser
uniquement les actions `find` et `findOne` nécessaires, notamment pour
`Event` et `Home-page`. Ne pas activer les actions de création, modification
ou suppression pour le rôle public.

## Utiliser PostgreSQL

Créer une base dédiée, par exemple `nfest_strapi`, puis remplacer la partie
base de données de `.env` :

```dotenv
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nfest_strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_SCHEMA=public
DATABASE_SSL=false
DATABASE_POOL_MIN=0
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT=60000
```

Une URL complète peut aussi être utilisée :

```dotenv
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nfest_strapi
```

Éviter d'utiliser une base PostgreSQL distante pour le développement quotidien
si sa disponibilité ou son pare-feu ne sont pas garantis.

## Relier le site Next.js

Strapi doit être lancé sur le port `1337`. Dans le projet `naked_fest`,
configurer :

```dotenv
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

Laisser le token vide uniquement si les permissions publiques de lecture ont
été configurées.

## Commandes utiles

```bash
npm run develop  # développement
npm run build    # compilation du back-office
npm run start    # lancement sans rechargement automatique
npm run console  # console Strapi
```

## Dépannage

### `KnexTimeoutError: Timeout acquiring a connection`

Cette erreur indique généralement que PostgreSQL est inaccessible, trop lent
ou que plusieurs processus Strapi conservent des connexions.

1. Vérifier `DATABASE_HOST`, `DATABASE_PORT`, les identifiants et le VPN.
2. Vérifier que PostgreSQL écoute bien sur le port configuré.
3. Arrêter les anciennes instances Strapi ou Node.
4. Redémarrer PostgreSQL puis Strapi.
5. Pour travailler immédiatement en local, utiliser la configuration SQLite.

Sous Windows :

```powershell
Test-NetConnection localhost -Port 5432
Get-Process node
```

### Les images ne sont pas visibles

- Vérifier que le seed a importé les fichiers de `seed-assets/`.
- Vérifier que `public/uploads/` est accessible.
- Vérifier que le site utilise `STRAPI_URL=http://localhost:1337`.

### Réinitialiser SQLite

Arrêter Strapi, supprimer `.tmp/data.db`, puis relancer le seed. Cette opération
supprime toutes les données locales Strapi.

## Structure principale

```text
config/          configuration Strapi et base de données
src/api/         content-types, contrôleurs, routes et services
src/seed/        import des contenus de démonstration
seed-assets/     images importées par le seed
public/uploads/  médias gérés par Strapi
```
