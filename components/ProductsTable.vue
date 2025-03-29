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

</script>

<template>
		<v-card>
				<v-card-title class="text-h5">Список продуктов</v-card-title>
				<v-card-text>
						<v-table density="comfortable">
								<thead>
								<tr>
										<th class="text-left">ID</th>
										<th class="text-left">Название</th>
										<th class="text-left">Статус</th>
										<th class="text-left">Дата создания</th>
										<th class="text-left">Цена</th>
										<th class="text-left">Категория</th>
								</tr>
								</thead>
								<tbody>
								<tr
												v-for="product in products"
								>
										<td>{{ product.id }}</td>
										<td>{{ product.name }}</td>
										<td>
												<v-chip size="small">
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
