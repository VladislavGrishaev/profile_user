<script setup lang="ts">
import {useRouter} from "vue-router";
/** -------------------------------------------- **/

const router = useRouter()

const login = () => {
		router.push('/login')
}
</script>


<template>
		<v-container>
				<v-row class="mb-4">
						<v-col class="btn-wrap">
								<v-btn
												prepend-icon="mdi-login"
												@click="login"
												color="primary">
										Войти
								</v-btn>
						</v-col>
				</v-row>
		</v-container>
</template>


