
# Utilisez une image Node.js en tant que base
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le package.json et package-lock.json du backend dans le conteneur
COPY package*.json .

# Installez les dépendances du backend
RUN npm install

# Copiez le reste du backend dans le conteneur
COPY . .

# Exposez le port sur lequel votre serveur Node.js écoute
EXPOSE 3000

# Démarrez le serveur
CMD ["npm", "start"]

