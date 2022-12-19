import { newAnalyticsTransactionsItem } from '@/utils/utils'
import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const useStatisticsStore = defineStore('statistics', () => {
  const axios = inject('axios')

  const statistics = ref(null)

  async function load() {
    await axios
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

  function getStatisticsBalance() {
    return [
      newAnalyticsTransactionsItem(
        'Customers',
        statistics.value?.daily.total_of_new_customers ?? 0,
        'mdi-account-arrow-up',
        'primary',
      ),
      newAnalyticsTransactionsItem(
        'Orders',
        statistics.value?.daily.total_of_orders ?? 0,
        'mdi-food-outline',
        'success',
      ),
      newAnalyticsTransactionsItem(
        'Avg. Orders Last 30 min',
        statistics.value?.daily.mean_of_orders_by_30_minutes ?? 0,
        'mdi-credit-card-fast',
        'warning',
      ),
      newAnalyticsTransactionsItem(
        'Avg. Income Last 30 min',
        `${statistics.value?.daily.mean_of_paid_by_30_minutes ?? 0}€`,
        'mdi-currency-eur',
        'info',
      ),
    ]
  }

  function getOrderWithHighestPaidValue() {
    return [
      {
        time: 'Ever',
        value: statistics.value?.all.order_with_highest_paid_value ?? 0,
        icon: 'mdi-all-inclusive',
        color: 'primary',
      },
      {
        time: 'Month',
        value: statistics.value?.monthly.order_with_highest_paid_value ?? 0,
        icon: 'mdi-calendar-month-outline',
        color: 'success',
      },
      {
        time: 'Week',
        value: statistics.value?.weekly.order_with_highest_paid_value ?? 0,
        icon: 'mdi-calendar-week-outline',
        color: 'warning',
      },
      {
        time: 'Today',
        value: statistics.value?.daily.order_with_highest_paid_value ?? 0,
        icon: 'mdi-calendar-today-outline',
        color: 'info',
      },
    ]
  }

  function getAveragePaidValuePerOrder() {
    return [
      {
        time: 'Ever',
        value: statistics.value?.all.average_paid_value_per_order ?? 0,
        icon: 'mdi-all-inclusive',
        color: 'primary',
      },
      {
        time: 'Month',
        value: statistics.value?.monthly.average_paid_value_per_order ?? 0,
        icon: 'mdi-calendar-month-outline',
        color: 'success',
      },
      {
        time: 'Week',
        value: statistics.value?.weekly.average_paid_value_per_order ?? 0,
        icon: 'mdi-calendar-week-outline',
        color: 'warning',
      },
      {
        time: 'Today',
        value: statistics.value?.daily.average_paid_value_per_order ?? 0,
        icon: 'mdi-calendar-today-outline',
        color: 'info',
      },
    ]
  }

  function clear() {
    statistics.value = null
  }

  return {
    clear,
    statistics,
    load,
    getStatisticsBalance,
    getOrderWithHighestPaidValue,
    getAveragePaidValuePerOrder,
  }
})
