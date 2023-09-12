#!/bin/bash

# Attendre que MongoDB soit opérationnel
until nc -z -v -w30 database 27017
do
  echo "En attente de MongoDB..."
  sleep 2
done

# Démarrer le serveur Node.js
npm start
