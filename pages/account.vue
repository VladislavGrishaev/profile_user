<template>
		<v-container>
				<!-- Кнопка выхода -->
				<v-row class="mb-4">
						<v-col>
								<h1>Привет, {{ username }}</h1>
						</v-col>
						<v-col class="btn-wrap">
								<v-btn color="error">
										Выход
								</v-btn>
						</v-col>
				</v-row>

				<!-- Блок фильтров -->
				<v-card class="mb-6 pa-4">
						<v-row>
								<!-- Фильтр по дате -->
								<v-col cols="12" md="6">
										<v-menu>
												<template v-slot:activator="{ props }">
														<v-text-field
																		label="Фильтр по дате создания"
																		readonly
																		v-bind="props"
																		value="2024-01-01 ~ 2024-12-31"
														></v-text-field>
												</template>
												<v-date-picker range></v-date-picker>
										</v-menu>
								</v-col>

								<!-- Мультиселект по статусу -->
								<v-col cols="12" md="6">
										<v-select
														label="Фильтр по статусу"
														multiple
														chips
														:items="['В наличии', 'Нет в наличии', 'На складе']"
														model-value="['В наличии']"
										></v-select>
								</v-col>
						</v-row>
				</v-card>

				<!-- Таблица данных -->
				<v-data-table
								:headers="[
        { title: 'ID', key: 'id' },
        { title: 'Название', key: 'name' },
        { title: 'Статус', key: 'status' },
        { title: 'Дата создания', key: 'date_created' },
        { title: 'Цена', key: 'price' },
        { title: 'Категория', key: 'category' }
      ]"
								:items="[
        {
          id: 1,
          name: 'Ноутбук',
          status: 'В наличии',
          date_created: '2024-03-01',
          price: 50000,
          category: 'Электроника'
        },
        {
          id: 2,
          name: 'Смартфон',
          status: 'Нет в наличии',
          date_created: '2024-03-15',
          price: 30000,
          category: 'Электроника'
        }
      ]"
								:items-per-page="10"
								class="elevation-1"
				>
						<!-- Кастомное отображение статуса -->
						<template v-slot:item.status="{ item }">
								<v-chip color="green">
										{{ item.status }}
								</v-chip>
						</template>
				</v-data-table>
		</v-container>
</template>

<style scoped>
.btn-wrap {
				display: flex;
				justify-content: flex-end;
				align-items: center;
}

.v-container {
    max-width: 1200px;
    margin: auto;
}
</style>