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

export function passwordLengthValid(password) {
    return password.length >= 6
}
export function passwordWithNumbers(password) {
    return /\d/.test(password)
}
export function passwordWithChars(password) {
    return /[a-zA-Zא-ת]/.test(password)
}

export function validPassword(password) {
    return (passwordLengthValid(password) && passwordWithNumbers(password) && passwordWithChars(password))
}
export function getPasswordErrors(newPass, repeatPass ){
    let equals = true
    let size = true
    let withNumbers = true
    let witChars = true
    let errors = []
    equals = newPass === repeatPass
    errors.push({ valid: equals, msg: "Password must match" })


    size = passwordLengthValid(newPass)
    errors.push({ valid: size, msg: "Password must be at least 6 characters long" })

    withNumbers = passwordWithNumbers(newPass)
    errors.push({ valid: withNumbers, msg: "Password must contain at least one number" })

    witChars = passwordWithChars(newPass)
    errors.push({ valid: witChars, msg: "Password must contain at least one character" })
    return errors
  }

  export function allPasswordCorrect(errorsArr) {
    if (errorsArr.length === 0)
      return false
    const length = errorsArr.reduce((filtered, err) => {
      filtered += err.valid ? 0 : 1;
      return filtered;
    }, 0);
    return length === 0
  }