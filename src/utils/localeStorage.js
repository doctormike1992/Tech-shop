

export function saveUserStorage(item) {
  sessionStorage.setItem("user", JSON.stringify(item));
}

export function saveUserUIDStorage(item) {
  sessionStorage.setItem("userUID", JSON.stringify(item));
}

export function saveDarkModeInStorage(item) {
  localStorage.setItem('theme', item ? 'dark' : 'light');
}

export function getDarkModeInStorage() {
 return localStorage.getItem("theme");
}