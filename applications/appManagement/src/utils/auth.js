const TokenKey = 'token';
const UserInfoKey = 'userInfo';

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(UserInfoKey));
}

export function setUserInfo(userInfo) {
  sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo));
}

export function removeUserInfo() {
  sessionStorage.removeItem(UserInfoKey);
}
