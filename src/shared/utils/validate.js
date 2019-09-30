// Rules
const maxLength = (val, len) => {
  return val.length <= len
}
const minLength = (val, len) => {
  return val.length >= len
}
const length = (val, range) => {
  if (typeof range === 'number') {
    return val.length === range
  } else {
    return val.length >= range[0] && val.length <= range[1]
  }
}
const require = (val) => {
  return val !== ''
}
const digits = (val) => {
  return /^\d+$/.test(val)
}
const tpassword = (val) => {
  return !!val && (/^\S{6,20}$/g).test(val)
}
const equalTo = (val, compareField, instance) => {
  return val === instance[compareField]
}
const need = (val) => {
    return val
}
const validateRules = {
  maxLength, minLength, length, require, digits, tpassword, equalTo, need
}

const validateField = (value, rules, instance) => {
  const keys = Object.keys(rules)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const validator = validateRules[key]
    if (validator) {
      const pass = validator(value, rules[key], instance)
      if (!pass) {
        return { pass: false, rule: key }
      }
    }
  }
  return { pass: true }
}
const validate = (instance, config) => {
  const fields = Object.keys(config.rules)
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    const valid = validateField(instance[field], config.rules[field], instance)
    if (!valid.pass) {
      return {
        pass: false,
        message: config.messages[field] ? config.messages[field][valid.rule] : ''
      }
    }
  }
  return { pass: true }
}

export { validate }
