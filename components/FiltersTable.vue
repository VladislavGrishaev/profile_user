<script setup lang="ts">
import {useProductsStore} from "../store/productsStore";
import {format, parseISO} from "date-fns";

/** -------------------------------------------- **/

const productsStore = useProductsStore()

const filters = reactive({
  date: null,
  status: []
})

// форматирование даты
const formatDate = computed(() => {
  if (!filters.date) return '';

  return Array.isArray(filters.date)
    ? filters.date.map(d => format(new Date(d), 'dd.MM.yyyy')).join(' - ')
    : format(new Date(filters.date), 'dd.MM.yyyy');
});

// обновление даты, если пользователь выбрал дату
const updateDate = (date: any) => {
  filters.date = date
}

// фильтрация продуктов по дате
const getProductsWithFilters = async () => {
  try {
    const parseDate = (dateStr: string | Date) => {

      if (dateStr instanceof Date) {
        return format(dateStr, "dd.MM.yyyy");
      }

      if (/\d{2}\.\d{2}\.\d{4}/.test(dateStr)) return dateStr;

      return format(parseISO(dateStr), "dd.MM.yyyy");
    };

    const filtersToApply = {
      status: filters.status,
      date: filters.date
        ? Array.isArray(filters.date)
          ? filters.date.map(parseDate)
          : parseDate(filters.date)
        : null,
    };

    await productsStore.applyFilters(filtersToApply);
  } catch (error) {
    console.error("Ошибка в getProductsWithFilters:", error);
  }
};

// сброс фильтров
const resetAllFilters = () => {
  try {
    productsStore.resetFilters();
    filters.date = null;
				filters.status = [];
  } catch (e) {
    console.log('Ошибка сброса фильтров: ', e);
  }
}


</script>

<template>
		<v-card class="mb-6 pa-4">
				<v-row>
						<!-- Фильтр по дате -->
						<v-col cols="12" md="6">
								<v-menu :close-on-content-click="false">
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
														@update:modelValue="updateDate"
														first-day-of-week="1"
										></v-date-picker>
								</v-menu>
						</v-col>

						<!-- Фильтр по статусу -->
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
												class="mr-5"
								>
										Применить
								</v-btn>
								<v-btn
												@click="resetAllFilters"
												prepend-icon="mdi-filter-remove"
												color="blue-grey"
								>
										Сбросить
								</v-btn>
						</v-col>
				</v-row>
		</v-card>
</template>



