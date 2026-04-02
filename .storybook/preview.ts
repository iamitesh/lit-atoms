import type { Preview } from '@storybook/web-components-vite';
import { requireAuth } from './auth';

// Start the auth check immediately when the preview iframe loads.
// Track settled state synchronously so the decorator can consult it.
let authSettled = false;
let authFailed = false;

const authPromise = requireAuth().then(() => {
  authSettled = true;
}).catch((err) => {
  authSettled = true;
  authFailed = true;
  console.error('[auth] Preview authentication failed:', err);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      // If auth has already failed synchronously, render an error instead
      // of the story to prevent unauthenticated content from appearing.
      if (authFailed) {
        const el = document.createElement('div');
        el.style.cssText = 'color: red; padding: 1rem; font-family: sans-serif;';
        el.textContent = 'Authentication failed. Please reload the page.';
        return el as unknown as ReturnType<typeof story>;
      }

      // If auth is still pending (unusual on first render), wait for it to
      // settle and propagate any rejection so Storybook surfaces an error.
      if (!authSettled) {
        authPromise.catch((err) => { throw err; });
      }

      return story();
    },
  ],
};

export default preview;