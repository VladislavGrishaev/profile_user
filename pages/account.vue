<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import authMiddleware from "../middleware/authMiddleware";
import {useAuthStore} from "../store/authStore";
import {useProductsStore} from "../store/productsStore";
/** -------------------------------------------- **/

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


// получаем текущие продукты для страницы
const products = computed(() => productsStore.paginatedProducts())

// общее количество страниц
const totalPage = computed(() => productsStore.totalPages())

// предыдущая и следующая страница
const prevPage = () => {
  if (productsStore.currentPage > 1) {
    productsStore.changePage(productsStore.currentPage - 1)
  }
}
const nextPage = () => {
  if (productsStore.currentPage < totalPage.value) {
    productsStore.changePage(productsStore.currentPage + 1)
  }
}

</script>

<template>
		<v-container class="my-lg-5">
				<v-row class="mb-4">
						<v-col>
								<h1>Привет, {{ fullName }}</h1>
						</v-col>
						<v-col class="btn-wrap">
								<v-btn
												prepend-icon="mdi-logout"
												@click="logout"
												color="error">
										Выход
								</v-btn>
						</v-col>
				</v-row>

				<!-- Блок фильтров -->
			<FiltersTable

			/>

				<!-- Таблица данных -->
				<v-data-table hide-default-footer>
						<ProductsTable
										:products="products"
						/>
				</v-data-table>
				<v-card-actions class="justify-center">
						<v-btn
										v-if="productsStore.currentPage > 1"
										@click="prevPage"
										:disabled="productsStore.currentPage === 1"
										color="primary"
						>Назад
						</v-btn>
						<span>{{ productsStore.currentPage }} из {{ totalPage }}</span>
						<v-btn
										v-if="productsStore.currentPage < totalPage"
										@click="nextPage"
										:disabled="productsStore.currentPage === totalPage"
										color="primary"
						>Вперед
						</v-btn>
				</v-card-actions>
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