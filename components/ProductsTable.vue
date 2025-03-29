<script setup lang="ts">



defineProps<{
  products: {
    id: number;
    name: string;
    status: string;
    date_created: string;
    price: number;
    category: string
  }[]
}>()

// статус товара
const getColorStatus = (status: string) => {
		switch (status) {
				case 'В наличии':
						return '#188f0e'
				case 'Нет в наличии':
						return 'red'
				case 'На складе':
						return '#e08114'
				default:
						return 'gray'
		}
}



</script>

<template>
		<v-card>
				<v-card-title class="text-h5">Список продуктов</v-card-title>
				<v-card-text>

						<v-table>
								<thead>
								<tr>
										<th class="text-left title-column">ID</th>
										<th class="text-left title-column">Название</th>
										<th class="text-left title-column">Статус</th>
										<th class="text-left title-column">Дата создания</th>
										<th class="text-left title-column">Цена</th>
										<th class="text-left title-column">Категория</th>
								</tr>
								</thead>
								<tbody>
								<tr
												v-for="product in products"
								>
										<td>{{ product.id }}</td>
										<td>{{ product.name }}</td>
										<td>
												<v-chip
																size="small"
																:color="getColorStatus(product.status)"
												>
														{{ product.status }}
												</v-chip>
										</td>
										<td>{{ product.date_created }}</td>
										<td>{{ product.price }}</td>
										<td>{{ product.category }}</td>

								</tr>
								</tbody>
						</v-table>
				</v-card-text>
		</v-card>
</template>

<style scoped>
th.title-column {
    font-size: 20px;
    font-weight: bold !important;
}


</style>
