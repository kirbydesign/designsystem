import { readdirSync, statSync } from 'fs';
import { exec } from 'shelljs';

function migrate(dir: string) {
  console.log(dir);
  exec('npx @ionic/angular-standalone-codemods', {
    cwd: dir,
  });
}

function migrateSubDirs(dir: string) {
  const files = readdirSync(dir);

  for (const file of files) {
    const path = `${dir}/${file}`;

    const stat = statSync(path);

    if (stat.isDirectory()) {
      migrate(path);
    }
  }
}

migrateSubDirs('./libs/designsystem');
