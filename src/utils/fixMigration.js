import fs from 'fs';
import path from 'path';

const migrationsDir = path.resolve('migrations');

try {
  // Baca semua file migration
  const files = fs.readdirSync(migrationsDir);

  // Filter hanya file .js
  const jsFiles = files.filter(f => f.endsWith('.js'));

  if (jsFiles.length === 0) {
    console.log('No .js migration files found.');
    process.exit(0);
  }

  // Ambil file terbaru (by modified time)
  let latestFile = jsFiles[0];
  let latestMTime = fs.statSync(path.join(migrationsDir, latestFile)).mtime;

  for (const file of jsFiles) {
    const mtime = fs.statSync(path.join(migrationsDir, file)).mtime;
    if (mtime > latestMTime) {
      latestMTime = mtime;
      latestFile = file;
    }
  }

  const oldPath = path.join(migrationsDir, latestFile);
  const newPath = path.join(migrationsDir, latestFile.replace('.js', '.cjs'));

  fs.renameSync(oldPath, newPath);

  console.log(`Renamed migration: ${latestFile} -> ${path.basename(newPath)}`);
} catch (err) {
  console.error('Error renaming migration file:', err.message);
  process.exit(1);
}
