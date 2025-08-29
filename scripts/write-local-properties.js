const fs = require('fs');
const os = require('os');
const path = require('path');

(function main() {
  try {
    const home = process.env.HOME || os.homedir() || '';
    const sdk = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME || (home ? path.join(home, 'Android', 'Sdk') : '');
    if (!sdk) {
      console.log('Skip writing local.properties: no SDK path');
      return;
    }
    const androidDir = path.join(process.cwd(), 'android');
    const localPropsPath = path.join(androidDir, 'local.properties');
    fs.mkdirSync(androidDir, { recursive: true });
    const normalized = sdk.replace(/\\/g, '/');
    fs.writeFileSync(localPropsPath, `sdk.dir=${normalized}\n`, 'utf8');
    console.log('Wrote', localPropsPath, '->', normalized);
  } catch (e) {
    console.log('Skip writing local.properties:', e.message);
  }
})();



