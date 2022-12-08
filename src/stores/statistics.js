import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const useStatisticsStore = defineStore('statistics', () => {
  const axios = inject('axios')

  const statistics = ref(null)

  async function load() {
    axios
      .get('statistics')
      .then(res => {
        if (res) {
          statistics.value = res.data
        }
      })
      .catch(err => {
        throw err
      })
  }

  load()

  return { statistics, load }
})
