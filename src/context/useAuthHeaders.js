import { useAuth } from './AuthContext';
import { useMemo } from 'react';

export const useAuthHeaders = () => {
  const { userRoleAuthority, teamId } = useAuth();
  const token = window.localStorage.getItem('token');

  const headers = useMemo(() => {
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Authority_Level': userRoleAuthority,
      'Team_Id': teamId
    };
  }, [token, userRoleAuthority, teamId]);

  return headers;
};