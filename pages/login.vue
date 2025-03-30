<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "../store/authStore";
/** -------------------------------------------- **/

const router = useRouter()
const authStore = useAuthStore()
const login = ref('')
const password = ref('')
const errorMessage = ref('')


const sendForm = async () => {
  errorMessage.value = ''

		if (!login.value || !password.value) {
				errorMessage.value = 'Пожалуйста, заполните все поля';
				return
		}

		const isAuth = await authStore.login(login.value, password.value)


  if (isAuth) {
    console.log("Авторизация успешна", "Логин: " + login.value, "Пароль: " + password.value);
    await router.push('/account');
  }
  else {
    errorMessage.value = "Неправильный логин или пароль";
    console.log("Ошибка авторизации");
  }

}

const validateForm = async () => {
  if (!login.value || !password.value) {
				errorMessage.value = 'Пожалуйста, заполните все поля';
		} else {
				errorMessage.value = '';
  }
}

</script>

<template>
		<v-card
						class="mx-auto auth-card"
						max-width="450"
		>
				<v-card-title class="text-h5 text-center pa-6">
						Авторизация
				</v-card-title>

				<v-card-text class="pb-0">
						<v-form @submit.prevent="sendForm">
								<v-text-field
												v-model="login"
												@input="validateForm"
												label="Логин"
												type="email"
												name="email"
												required
												autocomplete="username"
												suggested="username"
												variant="outlined"
												class="mb-3"
								></v-text-field>

								<v-text-field
												v-model="password"
												@input="validateForm"
												label="Пароль"
												type="password"
												autocomplete="current-password"
												required
												variant="outlined"
												class="mb-1"
								></v-text-field>

								<div
												v-if="errorMessage"
												class="text-error text-caption mb-3">
										{{ errorMessage }}
								</div>

								<v-btn
												type="submit"
												block
												size="large"
												color="primary"
												class="mt-2"
								>
										Войти
								</v-btn>
						</v-form>
				</v-card-text>

				<v-card-actions class="px-6 pb-6 pt-0 justify-center">
      <span class="text-caption">
        Нет аккаунта? <a href="#">Зарегистрироваться</a>
      </span>
				</v-card-actions>
		</v-card>
</template>

<style scoped>

.auth-card {
    margin-top: 64px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}


</style>