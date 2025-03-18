import { AccountInfo } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

/**
 * Custom hook to get user profile data
 * @returns User profile data or null if not authenticated
 */
export const useUserProfile = () => {
  const { instance, accounts } = useMsal();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (accounts.length > 0) {
        try {
          setLoading(true);
          // You can extend this to fetch more user data from Microsoft Graph API
          // For now, we're just using the account info from MSAL
          setUserProfile({
            name: accounts[0].name,
            username: accounts[0].username,
            localAccountId: accounts[0].localAccountId
          });
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          console.error('Error fetching user profile:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [instance, accounts]);

  return { userProfile, loading, error };
};

/**
 * Checks if the user has the required roles
 * @param account The user account
 * @param requiredRoles Array of required roles
 * @returns boolean indicating if user has required roles
 */
export const hasRequiredRoles = (account: AccountInfo | null, requiredRoles: string[]): boolean => {
  if (!account) return false;
  
  // Get roles from ID token claims
  const roles = account.idTokenClaims?.roles as string[] || [];
  
  // Check if user has any of the required roles
  return requiredRoles.some(role => roles.includes(role));
};
