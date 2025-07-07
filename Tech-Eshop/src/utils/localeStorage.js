export function saveCartStorage(item) {
  sessionStorage.setItem('cart', JSON.stringify(item));
}

export function saveUserStorage(item) {
  sessionStorage.setItem("user", JSON.stringify(item));
}

export function saveUserUIDStorage(item) {
  sessionStorage.setItem("userUID", JSON.stringify(item));
}

export function saveFavoritesStorage(item) {
  sessionStorage.setItem("favorites", JSON.stringify(item));
}

