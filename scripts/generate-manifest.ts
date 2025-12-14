import { writeFileSync, mkdirSync } from 'fs';
import { componentManifests } from '../src/manifest/index.js';

interface Manifest {
  version: string;
  generatedAt: string;
  components: typeof componentManifests;
}

try {
  const manifest: Manifest = {
    version: '0.1',
    generatedAt: new Date().toISOString(),
    components: componentManifests.sort((a, b) => a.tag.localeCompare(b.tag))
  };

  // Ensure dist directory exists
  try {
    mkdirSync('dist', { recursive: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw new Error(`Failed to create dist directory: ${(err as Error).message}`);
    }
  }

  // Write manifest
  try {
    writeFileSync(
      'dist/lit-atoms.manifest.json',
      JSON.stringify(manifest, null, 2),
      'utf-8'
    );
  } catch (err) {
    throw new Error(`Failed to write manifest file: ${(err as Error).message}`);
  }

  console.log('✅ Manifest generated: dist/lit-atoms.manifest.json');
  console.log(`   Version: ${manifest.version}`);
  console.log(`   Components: ${manifest.components.length}`);
  console.log(`   Generated at: ${manifest.generatedAt}`);
} catch (err) {
  console.error('❌ Error generating manifest:', (err as Error).message);
  process.exit(1);
}
