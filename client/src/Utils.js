export function stringIsNotBlank(str) {
    if (!str) return false
    return /([^\s])/.test(str)
}
export function stringIsBlank(str) {
    if (!str) return true
    return !(/([^\s])/.test(str))
}

export function validName(name) {
    return /^[a-zA-Z]+$/.test(name)
}
export function validPassword(password) {
    return password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password)
}
