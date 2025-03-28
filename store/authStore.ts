import {defineStore} from "pinia";


interface User {
  login: string;
  password: string;
}

// @ts-ignore
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null, /** текущий авторизованный пользователь **/
    users: [] as User[]       /** список пользователей **/
  }),

  actions: {

    /** Загружаем пользователей с сервера **/
    //@ts-ignore
    async loadUsers(): Promise<void> {
      try {
        const response = await fetch('/api/users')
        this.users = await response.json()
      }
      catch (e) {
        console.error('Ошибка загрузки пользователей: ', e)
      }
    },

    /** Авторизация пользователя **/
    async login(login: string, password: string) {
      try {
        // существует ли конкретный пользователь?
        const user = this.users.find(user => user.login === login && user.password === password)

        if (user) {
          // если да, то авторизуем и сохраним в store
          this.user = user
          return true
        }
        else {
          // либо неверные данные и не сохраняем попытку авторизации
          return false
        }
      }
      catch (e) {
        console.error('Ошибка загрузки пользователей: ', e)
        return false
      }
    },

    /** Выход из системы **/
    logout() {
      this.user = null
    }
  }


})