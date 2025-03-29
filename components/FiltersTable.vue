<script setup lang="ts">
import {useProductsStore} from "../store/productsStore";
import {format} from "date-fns";


const productsStore = useProductsStore()

const filters = reactive({
  date: null,
  status: []
})

// форматирование даты
const formatDate = computed(() => {
  if (!filters.date) return '';

  if (Array.isArray(filters.date)) {
    return filters.date
      .map(d => format(new Date(d), 'dd.MM.yyyy'))
      .join(' - ');
  }

  return format(new Date(filters.date), 'dd.MM.yyyy');
});

const updateDate = (date: any) => {
  filters.date = date
}

const getProductsWithFilters = async () => {
  try {
    // Преобразуем дату в нужный формат перед передачей
    const filtersToApply = {
      status: filters.status,
      date: filters.date
        ? Array.isArray(filters.date)
          ? filters.date.map(d => new Date(d).toISOString().split('T')[0])
          : new Date(filters.date).toISOString().split('T')[0]
        : null
    };

    await productsStore.applyFilters(filtersToApply);
  } catch (error) {
    console.error('Ошибка в getProductsWithFilters:', error);
  }
};

</script>

<template>
		<v-card class="mb-6 pa-4">
				<v-row>
						<!-- Фильтр по дате -->
						<v-col cols="12" md="6">
								<v-menu>
										<template #activator="{ props }">
												<v-text-field
																:model-value="filters.date ? formatDate : ''"
																label="По дате создания"
																v-bind="props"
																prepend-inner-icon="mdi-calendar"

												></v-text-field>
										</template>
										<v-date-picker
														v-model="filters.date"
														color="primary"
														@update="updateDate"

										></v-date-picker>
								</v-menu>
						</v-col>

						<!-- Мультиселект по статусу -->
						<v-col cols="12" md="6">
								<v-select
												v-model="filters.status"
												label="По статусу"
												multiple
												chips
												:items="['В наличии', 'Нет в наличии', 'На складе']"
												prepend-inner-icon="mdi-checkbox-marked-circle"
								></v-select>
						</v-col>
						<v-col>
								<v-btn
												@click="getProductsWithFilters"
												prepend-icon="mdi-filter"
												color="primary"
								>Применить</v-btn>
						</v-col>
				</v-row>
		</v-card>
</template>



