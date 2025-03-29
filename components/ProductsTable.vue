<script setup lang="ts">


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
								<tr >
										<td>0</td>
										<td>0</td>
										<td>
												<v-chip  size="small">
														status
												</v-chip>
										</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>

								</tr>
								</tbody>
						</v-table>
				</v-card-text>
		</v-card>
</template>
