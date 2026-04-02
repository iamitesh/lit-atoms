import {
  PublicClientApplication,
  type AccountInfo,
  type Configuration,
  BrowserCacheLocation,
} from '@azure/msal-browser';

// TEMPORARY: Hardcoded for testing - will revert to env vars later
const clientId = '39cb026e-c33f-44fe-996f-25294fb7a289';
// Use specific tenant ID for organizational accounts only
const tenantId = '3816f9d9-f81c-41fb-aaae-e509b4c9c3ad';

console.log('[auth] Using Client ID:', clientId);
console.log('[auth] Using Tenant ID:', tenantId);

/**
 * Builds the redirect URI for MSAL, normalising the path so that both
 * `https://iamitesh.github.io/lit-atoms/` and `http://localhost:6006/`
 * produce the correct registered redirect URI regardless of any trailing slash.
 */
function buildRedirectUri(): string {
  const { origin, pathname } = window.location;
  
  // For localhost, just use the origin
  if (origin.includes('localhost')) {
    return origin;
  }
  
  // For GitHub Pages, include the repo path (e.g., /lit-atoms/)
  // Extract the first path segment which is typically the repo name
  const pathParts = pathname.split('/').filter(Boolean);
  const repoPath = pathParts.length > 0 ? `/${pathParts[0]}/` : '/';
  
  console.log('[auth] Built redirect URI:', `${origin}${repoPath}`);
  return `${origin}${repoPath}`;
}

const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: buildRedirectUri(),
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
  },
  system: {
    allowRedirectInIframe: true,
  },
};

let msalInstance: PublicClientApplication | null = null;
let authInProgress = false;

async function getMsalInstance(): Promise<PublicClientApplication> {
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
    await msalInstance.initialize();
  }
  return msalInstance;
}

/**
 * Ensures the current user is authenticated via Microsoft Entra ID.
 *
 * Returns `null` when `STORYBOOK_ENTRA_CLIENT_ID` is not configured (e.g.
 * local development without an Azure App Registration). In all other cases
 * the function either returns an authenticated `AccountInfo` or redirects the
 * browser to the Microsoft login page and never returns.
 */
export async function requireAuth(): Promise<AccountInfo | null> {
  if (!clientId) {
    console.warn(
      '[auth] STORYBOOK_ENTRA_CLIENT_ID is not set — authentication is disabled. ' +
      'Set this environment variable for any non-local deployment.'
    );
    return null;
  }

  // Prevent multiple simultaneous auth attempts
  if (authInProgress) {
    console.log('[auth] Authentication already in progress, waiting...');
    return new Promise(() => {});
  }

  const msal = await getMsalInstance();

  console.log('[auth] Redirect URI:', buildRedirectUri());
  console.log('[auth] Handling redirect promise...');

  // Handle the redirect response that arrives after Microsoft sends the user back.
  try {
    const redirectResult = await msal.handleRedirectPromise();
    console.log('[auth] Redirect result:', redirectResult);
    
    if (redirectResult?.account) {
      console.log('[auth] ✅ Authenticated via redirect:', redirectResult.account.username);
      msal.setActiveAccount(redirectResult.account);
      authInProgress = false;
      return redirectResult.account;
    }
  } catch (error) {
    console.error('[auth] Error handling redirect:', error);
    authInProgress = false;
  }

  // Check for an already-authenticated account in the current session.
  const accounts = msal.getAllAccounts();
  console.log('[auth] Existing accounts:', accounts.length);
  
  if (accounts.length > 0) {
    const account = accounts[0];
    console.log('[auth] ✅ Using existing account:', account.username);
    msal.setActiveAccount(account);
    return account;
  }

  // No active session — redirect to the Microsoft login page.
  console.log('[auth] No session found, redirecting to login...');
  authInProgress = true;
  
  // This call never returns; the browser navigates away.
  await msal.loginRedirect({
    scopes: ['openid', 'profile', 'email'],
  });

  // Unreachable, but satisfies TypeScript.
  return new Promise(() => {});
}
