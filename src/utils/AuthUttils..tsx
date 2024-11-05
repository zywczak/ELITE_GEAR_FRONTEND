import { jwtDecode } from 'jwt-decode';
import { getAuthToken } from '../services/authService';
import { CustomJwtPayload } from '../entities/CustoJwtPayload';

export function isLoggedIn(): boolean {
  const token = getAuthToken();
  return token !== null;
}

export function isAdmin(): boolean {
  const token = getAuthToken();
  if (token !== null) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.type === "ADMIN";
  }
  return false;
}