import Cookies from 'js-cookie'

const LoginKey = 'hasLogin'

export function getToken() {
  return Cookies.get(LoginKey);
}

export function setToken(loginKey) {
  return Cookies.set(LoginKey, loginKey);
}

export function removeToken() {
  return Cookies.remove(LoginKey);
}