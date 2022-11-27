const emailRules = ref([
  v => !!v || 'E-mail is required',
  v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  v => (v && v.length <= 60) || 'E-mail must be less than 60 characters',
])

const nameRules = ref([
  v => !!v || 'Name is required',
  v => !/[^a-zA-Z ]/.test(v) || 'Name must be valid',
  v => (v && v.length <= 60) || 'Name must be less than 60 characters',
])

export { emailRules, nameRules }
