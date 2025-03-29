// @ts-ignore
import { navigateTo, defineNuxtRouteMiddleware  } from '#app'
import {useAuthStore} from "../store/authStore";


export default defineNuxtRouteMiddleware(() => {
 const authStore = useAuthStore()

 // Загружаем данные о текущем пользователе
 authStore.getAuthUser()

  // Если пользователь не авторизован, перенаправляем его на страницу логина
 if (!authStore.user) {
  return navigateTo('/login')
 }
})

