import {
  PublicClientApplication,
  type AccountInfo,
  type Configuration,
} from '@azure/msal-browser';

const clientId = process.env.STORYBOOK_ENTRA_CLIENT_ID ?? '';
const tenantId = process.env.STORYBOOK_ENTRA_TENANT_ID ?? 'common';

/**
 * Builds the redirect URI for MSAL, normalising the path so that both
 * `https://iamitesh.github.io/lit-atoms/` and `http://localhost:6006/`
 * produce the correct registered redirect URI regardless of any trailing slash.
 */
function buildRedirectUri(): string {
  const { origin, pathname } = window.location;
  const basePath = pathname.replace(/\/$/, '');
  return `${origin}${basePath}/`;
}

const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: buildRedirectUri(),
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

let msalInstance: PublicClientApplication | null = null;

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

  const msal = await getMsalInstance();

  // Handle the redirect response that arrives after Microsoft sends the user back.
  const redirectResult = await msal.handleRedirectPromise();
  if (redirectResult?.account) {
    msal.setActiveAccount(redirectResult.account);
    return redirectResult.account;
  }

  // Check for an already-authenticated account in the current session.
  const accounts = msal.getAllAccounts();
  if (accounts.length > 0) {
    const account = accounts[0];
    msal.setActiveAccount(account);
    return account;
  }

  // No active session — redirect to the Microsoft login page.
  // This call never returns; the browser navigates away.
  await msal.loginRedirect({
    scopes: ['openid', 'profile', 'email'],
  });

  // Unreachable, but satisfies TypeScript.
  return new Promise(() => {});
}
