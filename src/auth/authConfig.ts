/**
 * Configuration for Azure AD authentication
 * Contains settings for Microsoft Identity Platform integration
 */
import { LogLevel } from "@azure/msal-browser";

// Check for missing environment variables and provide helpful messages
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:7777');

// Output helpful debug information in development
if (process.env.NODE_ENV === 'development') {
  console.log('Auth Config Environment Variables Check:');
  console.log('- NEXT_PUBLIC_CLIENT_ID:', clientId ? '✓ Found' : '✗ Missing');
  console.log('- NEXT_PUBLIC_TENANT_ID:', tenantId ? '✓ Found' : '✗ Missing');
  console.log('- NEXT_PUBLIC_REDIRECT_URI:', redirectUri);
  
  if (!clientId || !tenantId) {
    console.warn(
      'Missing required environment variables for Azure AD authentication. ' +
      'Make sure your .env.local file exists and contains NEXT_PUBLIC_CLIENT_ID and NEXT_PUBLIC_TENANT_ID.'
    );
  }
}

export const msalConfig = {
  auth: {
    clientId: clientId || '', 
    authority: `https://login.microsoftonline.com/${tenantId || ''}`,
    redirectUri: redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      // Enable very detailed logging to help diagnose issues
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return; // Don't log personal information
        }
        
        switch (level) {
          case LogLevel.Error:
            console.error('MSAL:', message);
            return;
          case LogLevel.Warning:
            console.warn('MSAL:', message);
            return;
          case LogLevel.Info:
            console.info('MSAL:', message);
            return;
          case LogLevel.Verbose:
            console.debug('MSAL:', message);
            return;
        }
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    },
    // Increase popup timeout duration to prevent early closures
    windowHashTimeout: 60000, // Extend to 1 minute
    iframeHashTimeout: 60000,
    loadFrameTimeout: 60000
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints
export const loginRequest = {
  scopes: ["User.Read", "profile", "openid", "email"]
};

// Add endpoints here for Microsoft Graph API services you'd like to use
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};