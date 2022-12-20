const emailRules = ref([
  v => !!v || 'E-mail is required',
  v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  v => (v && v.length <= 60) || 'E-mail must be less than 60 characters',
])

const nameRules = ref([
  v => !!v || 'Name is required',
  v => /^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/.test(v) || 'Name must be valid',
  v => (v && v.length <= 60) || 'Name must be less than 60 characters',
])

const productNameRules = ref([
  v => !!v || 'Name is required',
  v => (v && v.length <= 60) || 'Name must be less than 60 characters',
])

const nifRules = ref([
  v => !!v || 'NIF is required',
  v => {
    let res = 'NIF is not valid'
    if (v.length != 9) {
      return res
    }

    let sum = 0
    for (let i = 7; i >= 0; i--) {
      sum += v[i] * (9 - i)
    }

    let rest = sum % 11
    if (rest == 0 || rest == 1) {
      if (v[8] != 0) {
        return true
      }
    }

    if (11 - rest == v[8]) {
      return true
    }

    return res
  },
])

const paymentReferenceRules = (value, type) => {
  let res = 'Payment reference is invalid'
  switch (type) {
    case 'PAYPAL':
      return [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.(pt|com))+$/.test(value) || res]
    case 'MBWAY':
      return [(value.length == 9 && value[0] == 9) || res]
    case 'VISA':
      return [(value.length == 16 && value[0] == 4) || res]
  }

  return [res]
}

const phoneRules = ref([
  v => !!v || 'Phone is required',
  v => /(^\+\d{1,3})*([2,9]{1}\d{8}$)/.test(v) || 'Phone must be valid',
])

const priceRules = ref([v => !!v || 'Price is required', v => v >= 0 || 'Price must be bigger than 0'])

export { emailRules, nameRules, productNameRules, nifRules, paymentReferenceRules, phoneRules, priceRules }
