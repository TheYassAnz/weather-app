# What's the Weather

## Description

"What's the Weather" est une application mobile développée avec React Native et Expo. Elle permet aux utilisateurs de rechercher des villes et d'afficher les prévisions météorologiques actuelles et à venir. Les utilisateurs peuvent également ajouter des villes à leurs favoris et obtenir des informations météorologiques basées sur leur position actuelle.

## Fonctionnalités

- Recherche de villes et affichage des prévisions météorologiques.
- Affichage des détails météorologiques actuels (température, humidité, pression, etc.).
- Prévisions météorologiques sur 7 jours.
- Ajout et suppression de villes favorites.
- Affichage des informations météorologiques basées sur la position actuelle de l'utilisateur.

## Installation

1. Clonez le dépôt :
    ```sh
    git clone git@rendu-git.etna-alternance.net:module-9779/activity-52557/group-1044705.git what-s-the-weather
    ```

2. Installez les dépendances :
    ```sh
    cd what-s-the-weather/app
    npm install
    ```

3. Créez un fichier `.env` à la racine du dossier `app` et ajoutez les variables d'environnement suivantes :
    ```properties
    EXPO_PUBLIC_API_URL="http://192.168.137.1:3000"
    EXPO_PUBLIC_METEO_API_URL="https://api.open-meteo.com/v1"
    EXPO_PUBLIC_GEOCODE_API_URL="https://nominatim.openstreetmap.org"
    ```

## Utilisation

1. Lancez l'application :
    ```sh
    npx expo start
    ```

2. Scannez le QR code avec l'application Expo Go sur votre appareil mobile ou utilisez un émulateur.

## Structure du Projet

- `(tabs)/`: Contient les différentes pages de l'application, organisées en onglets.
- `(tabs)/_layout.tsx`: Contient la configuration des onglets.
- `_layout.tsx`: Contient la configuration de la pile de navigation.
- `components/`: Contient les composants réutilisables de l'application.
- `/details/city`: Contient la page de détails des villes.
- `/location`: Contient la page pour obtenir les informations météorologiques basées sur la position actuelle.
- `/index`: Contient la page de recherche de villes.

## Ressources:

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [MongoDB](https://mongodb.com)
- [Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/)
- [OpenMeteo API](https://open-meteo.com/en/docs)

## Contributors

- [Yassine ANZAR BASHA](https://github.com/TheYassAnz)
- [Abubakar ALIEV](https://github.com/abubakaraliev)