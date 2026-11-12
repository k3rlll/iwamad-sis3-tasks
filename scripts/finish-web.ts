import { copyFileSync, writeFileSync } from 'node:fs';

writeFileSync('docs/.nojekyll', '');
copyFileSync('docs/index.html', 'docs/404.html');
