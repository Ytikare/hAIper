/**
 * Configuration for Azure AD authentication
 * Contains settings for Microsoft Identity Platform integration
 */

export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Replace with your actual Azure AD application client ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace with your tenant ID
    redirectUri: "http://localhost:3000", // Replace with your app's redirect URI
    postLogoutRedirectUri: "http://localhost:3000", // Where to redirect after logout
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set to true for IE 11 compatibility and to use cookies
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints
export const loginRequest = {
  scopes: ["User.Read"]
};

// Add endpoints here for Microsoft Graph API services you'd like to use
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
