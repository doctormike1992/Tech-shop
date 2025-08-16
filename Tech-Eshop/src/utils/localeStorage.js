

export function saveUserStorage(item) {
  sessionStorage.setItem("user", JSON.stringify(item));
}

export function saveUserUIDStorage(item) {
  sessionStorage.setItem("userUID", JSON.stringify(item));
}


