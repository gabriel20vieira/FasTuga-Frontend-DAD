<script setup>
import { useStatisticsStore } from '@/stores/statistics';
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const statisticsStore = useStatisticsStore()

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})


const data = computed(() => {
    const currentTheme = ref(vuetifyTheme.current.value.colors)
    const variableTheme = ref(vuetifyTheme.current.value.variables)
    const disabledColor = `rgba(${hexToRgb(currentTheme.value['on-surface'])},${variableTheme.value['disabled-opacity']})`
    const isDarkMode = ref(vuetifyTheme.current.value.dark)

    return {
        series: [{
            name: "New Users",
            data: [
                statisticsStore.statistics?.all.new_users_by_month[0].Jan,
                statisticsStore.statistics?.all.new_users_by_month[0].Feb,
                statisticsStore.statistics?.all.new_users_by_month[0].Mar,
                statisticsStore.statistics?.all.new_users_by_month[0].Apr,
                statisticsStore.statistics?.all.new_users_by_month[0].May,
                statisticsStore.statistics?.all.new_users_by_month[0].Jun,
                statisticsStore.statistics?.all.new_users_by_month[0].Jul,
                statisticsStore.statistics?.all.new_users_by_month[0].Aug,
                statisticsStore.statistics?.all.new_users_by_month[0].Sep,
                statisticsStore.statistics?.all.new_users_by_month[0].Oct,
                statisticsStore.statistics?.all.new_users_by_month[0].Nov,
                statisticsStore.statistics?.all.new_users_by_month[0].Dece
            ]
        }],
        chartOptions: {
            chart: { type: 'bar' },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: { enabled: false },
            legend: { show: false },
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                labels: {
                    style: {
                        colors: disabledColor,
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: disabledColor,
                    },
                },
            },
            tooltip: { theme: isDarkMode.value ? "dark" : "light" }
        }
    }
})
</script>

<template>
    <VCard>
        <VCardItem>
            <VCardTitle>{{ props.title }}</VCardTitle>
        </VCardItem>
        <VCardText>
            <VueApexCharts v-if="statisticsStore.statistics" type="bar" :options="data.chartOptions"
                :series="data.series" :height="227" />
        </VCardText>
        <VProgressLinear indeterminate v-if="props.isLoading" />
    </VCard>
</template>

<style>
.apexcharts-menu.apexcharts-menu-open {
    color: #FF8300 !important;
}
</style>