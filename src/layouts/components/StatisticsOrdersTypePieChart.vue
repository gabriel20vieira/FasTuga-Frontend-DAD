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

    return {
        series: [
            statisticsStore.statistics?.all?.total_of_orders_by_type[0].delivered,
            statisticsStore.statistics?.all?.total_of_orders_by_type[1].delivered,
            statisticsStore.statistics?.all?.total_of_orders_by_type[2].delivered,
            statisticsStore.statistics?.all?.total_of_orders_by_type[3].delivered
        ],
        chartOptions: {
            labels: ['Hot Dish', 'Cold Dish', 'Drink', 'Dessert'],
            chart: { type: 'donut' },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        labels: { colors: disabledColor },
                    }
                }
            }, {
                breakpoint: 5000,
                options: {
                    legend: {
                        labels: {
                            colors: disabledColor,
                        },
                    },
                },
            },],
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
            <VueApexCharts v-if="statisticsStore.statistics" type="donut" :options="data.chartOptions"
                :series="data.series" :height="240" />
        </VCardText>
        <VProgressLinear indeterminate v-if="props.isLoading" />
    </VCard>
</template>