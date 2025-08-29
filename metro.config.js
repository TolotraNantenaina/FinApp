const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuration pour expo-router
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

// Ajouter la variable d'environnement pour expo-router
config.transformer.globalPrefix = '';

module.exports = config;
