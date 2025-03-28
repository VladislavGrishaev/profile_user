<script setup lang="ts">


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
						<v-form>
								<v-text-field
												label="Логин"
												required
												autocomplete="username"
												suggested="username"
												variant="outlined"
												class="mb-3"
								></v-text-field>

								<v-text-field
												label="Пароль"
												type="password"
												autocomplete="current-password"
												required
												variant="outlined"
												class="mb-1"
								></v-text-field>

								<div class="text-error text-caption mb-3">
										Введены неверные данные авторизации. Попробуйте ещё раз
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