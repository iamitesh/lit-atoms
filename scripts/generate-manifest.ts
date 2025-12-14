import { writeFileSync, mkdirSync } from 'fs';
import { componentManifests } from '../src/manifest/index.js';

interface Manifest {
  version: string;
  generatedAt: string;
  components: typeof componentManifests;
}

const manifest: Manifest = {
  version: '0.1',
  generatedAt: new Date().toISOString(),
  components: componentManifests.sort((a, b) => a.tag.localeCompare(b.tag))
};

// Ensure dist directory exists
mkdirSync('dist', { recursive: true });

// Write manifest
writeFileSync(
  'dist/lit-atoms.manifest.json',
  JSON.stringify(manifest, null, 2),
  'utf-8'
);

console.log('✅ Manifest generated: dist/lit-atoms.manifest.json');
console.log(`   Version: ${manifest.version}`);
console.log(`   Components: ${manifest.components.length}`);
console.log(`   Generated at: ${manifest.generatedAt}`);
