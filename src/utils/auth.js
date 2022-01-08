const TokenKey = 'store_token'
const NameKey = 'store_name'
const AvatarKey = 'store_avatar'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getName() {
  return localStorage.getItem(NameKey)
}

export function setName(name) {
  return localStorage.setItem(NameKey, name)
}

export function getAvatar() {
  return localStorage.getItem(AvatarKey)
}

export function setAvatar(avatar) {
  return localStorage.setItem(AvatarKey, avatar)
}

