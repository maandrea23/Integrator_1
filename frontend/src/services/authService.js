import { getCurrentUser } from "../api/auth.js";

const USER_KEY = "sunwise_user";
const TOKEN_KEY = "sunwise_token";

export function saveSession(session) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getSessionUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
}

export const isAuthenticated = () => Boolean(localStorage.getItem(TOKEN_KEY));

export async function refreshSession() {
  if (!isAuthenticated()) return null;
  try {
    const { user } = await getCurrentUser();
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch {
    clearSession();
    return null;
  }
}

export function dashboardPath(role = getSessionUser()?.role) {
  return ({ admin: "/admin", installer: "/installer", provider: "/provider", user: "/dashboard" })[role] || "/login";
}
