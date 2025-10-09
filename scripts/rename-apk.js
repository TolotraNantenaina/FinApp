const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function renameApk() {
  try {
    // Trouver le dernier APK généré
    //const apkDir = 'android/app/build/outputs/apk/release';
    const apkDir = './';
    const files = fs.readdirSync(apkDir).filter(f => f.endsWith('.apk'));
    // Récupérer la version depuis package.json
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    
    if (files.length === 0) {
      console.error('❌ Aucun APK trouvé dans', apkDir);
      console.log('💡 Lancez d\'abord: npx eas build --platform android --profile production --local');
      process.exit(1);
    }
    
    // Prendre le plus récent
    const latestApk = files
      .map(f => ({
        name: f,
        path: path.join(apkDir, f),
        mtime: fs.statSync(path.join(apkDir, f)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime)[0];
    
    // Nom personnalisé
    const version = packageJson.version;

    // Récupérer le contexte depuis les arguments de la commande (ex: node scripts/rename-apk.js production)
    const context = (process.argv[2] === 'rename:apk' ? process.argv[3] : process.argv[2]) || 'release';

    const newName = `FinApp-${version}-${context}.apk`;
    const newPath = path.join(process.cwd(), newName);
    
    // Renommer
    fs.renameSync(latestApk.path, newPath);
    
    console.log('✅ APK renommé avec succès:');
    console.log(`   📁 Ancien: ${latestApk.name}`);
    console.log(`   📁 Nouveau: ${newName}`);
    console.log(`   📍 Emplacement: ${newPath}`);

    // Déplacer le fichier APK dans le dossier ./apks/
    const apksDir = path.join(process.cwd(), 'apks');
    fs.mkdirSync(apksDir, { recursive: true });
    
    const finalPath = path.join(apksDir, newName);
    
    // Vérifier si le fichier existe déjà
    if (fs.existsSync(finalPath)) {
      console.log('⚠️  Fichier existant détecté, recherche du prochain numéro...');
      
      // Extraire le nom de base et l'extension
      const baseName = path.parse(newName).name; // "FinApp-1.0.1-release"
      const ext = path.parse(newName).ext; // ".apk"
      
      // Chercher tous les fichiers similaires dans le dossier apks
      const existingFiles = fs.readdirSync(apksDir)
        .filter(f => f.startsWith(baseName) && f.endsWith(ext));
      
      // Extraire les numéros existants
      const numbers = existingFiles
        .map(f => {
          const match = f.match(/-(\d+)\.apk$/);
          return match ? parseInt(match[1]) : 0;
        })
        .filter(n => n > 0);
      
      // Trouver le prochain numéro
      const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
      const numberedName = `${baseName}-${nextNumber}${ext}`;
      const numberedPath = path.join(apksDir, numberedName);
      
      // Renomer l''ancien fichier avec le nouveau nom numéroté
      fs.renameSync(finalPath, numberedPath);
      
      console.log('✅ Ancien APK renommé avec numérotation:');
      console.log(`   📁 Ancien: ${baseName}${ext}`);
      console.log(`   📁 Nouveau: ${numberedName}`);
      console.log(`   📍 Emplacement: ${numberedPath}`);
      
    }
      // Déplacer le fichier APK dans le dossier ./apks/
      fs.renameSync(newPath, finalPath);
      
      console.log('✅ APK déplacé avec succès:');
      console.log(`   📁 Ancien: ${latestApk.name}`);
      console.log(`   📁 Nouveau: ${newName}`);
      console.log(`   📍 Emplacement: ${finalPath}`);


  } catch (error) {
    console.error('❌ Erreur lors du renommage:', error.message);
    process.exit(1);
  }
}

renameApk();
