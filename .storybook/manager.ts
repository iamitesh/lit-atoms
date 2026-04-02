/**
 * Storybook Manager entry — runs in the manager frame (the outer Storybook
 * shell) before any UI is rendered.  We gate this frame behind Microsoft
 * Entra ID authentication so the entire Storybook UI is protected.
 */
import { requireAuth } from './auth';

requireAuth().catch((err) => {
  console.error('[auth] Authentication failed:', err);
});
