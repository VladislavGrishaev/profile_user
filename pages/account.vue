<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import authMiddleware from "../middleware/authMiddleware";
import {useAuthStore} from "../store/authStore";
import {useProductsStore} from "../store/producsStore";


// защита роута
authMiddleware()

const authStore = useAuthStore()
const router = useRouter()

// выход из профиля
const logout = () => {
		authStore.logout()
		router.push('/')
}

// получение данных о текущем пользователе
onMounted(() => {
		authStore.getAuthUser()
})

// если пользователь авторизован, то вывести его полное имя
const fullName = computed(() => authStore.user ? authStore.user.name + ' ' + authStore.user.surname : '')

// получение списка продуктов
const productsStore = useProductsStore()
productsStore.getProducts()


</script>

<template>
		<v-container>
				<v-row class="mb-4">
						<v-col>
								<h1>Привет, {{ fullName }}</h1>
						</v-col>
						<v-col class="btn-wrap">
								<v-btn
												@click="logout"
												color="error">
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
												<template #activator="{ props }">
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
				<v-data-table>
					<ProductsTable
									:products="productsStore.products"

					/>
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