<script setup>
import TablePagination from "@/layouts/components/TablePagination.vue";

const props = defineProps({
	columns: {
		type: Array,
		required: true,
		default: new Array()
	},
	items: {
		type: Array,
		default: new Array()
	},
	actions: {
		type: Array,
		default: new Array()
	},
	tableLength: {
		type: Number,
		default: 1
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['page'])

const pageChange = (page = 1) => {
	emit('page', page)
}

const processText = (column, item) => {

	if (typeof column?.path == 'function') {
		return column?.path(item)
	}

	return column?.path ? eval(`item.${column.path} ?? '-'`) : '-'
}

const processChip = (column, item) => {
	return typeof column?.chipColor == 'function' ? column?.chipColor(item) : 'primary'
}

const columnCondition = (column) => {
	let res = column?.condition ? column.condition() : true
	return res
}

</script>

<template>
	<VDivider />
	<VProgressLinear :active="props.loading" indeterminate />
	<VTable>
		<thead>
			<tr>
				<th class="text-uppercase" v-for="column in props.columns">
					{{ column?.title ?? ' - ' }}
				</th>
				<th class="text-uppercase text-center" v-if="props.actions">
					Actions
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in props.items" :key="item">
				<td v-for="column in props.columns">
					<VChip v-if="column?.chip ?? false" :color="processChip(column ?? null, item)">
						{{ processText(column, item) }}
					</VChip>
					<span v-else>
						{{ processText(column, item) }}
					</span>
				</td>
				<td style="text-align-last: center" v-if="props.actions.length > 0">
					<VBtn icon variant="text" width="30px" height="30px" v-for="action in props.actions"
						@click="action?.callback(item) ?? (() => { })">
						<VIcon :icon="action.icon" size="18" />
						<VTooltip activator="parent" location="end">
							{{ action.title }}
						</VTooltip>
					</VBtn>
				</td>
			</tr>
		</tbody>
	</VTable>
	<VDivider />
	<TablePagination :tableLength="props.tableLength" :isTableLoading="props.loading" @newPage="pageChange" />
</template>

<style lang="scss">
.left {
	display: table-cell;
}

.right {
	display: table-cell;
	vertical-align: middle;
	padding-left: 15px;
}
</style>