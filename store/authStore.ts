import {defineStore} from "pinia";


interface Credentials {
  username: string;
  passphrase: string;
}

interface User {
  name: string;
  surname: string;
  login: string;
  password: string;
  credentials: Credentials;
  active: boolean;
  created: string;
  _comment: string;
}

// @ts-ignore
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null, /** текущий авторизованный пользователь **/
    isAuthReady: false        /** статус загрузки данных **/
  }),

  actions: {
    /** Получение данных пользователя из localStorage **/
    getAuthUser() {
     const dataUser = localStorage.getItem('user')
      this.user = dataUser ? JSON.parse(dataUser) : null

      // помечаем, что данные загружены
      this.isAuthReady = true
    },

    /** Авторизация пользователя **/
    async login(username: string, password: string): Promise<boolean> {
      try {
        const response = await fetch('/api/users.json')
        const users: User[] = await response.json()


        // существует ли конкретный пользователь?
        const foundUser = users.find(
          (u) =>
            u.credentials.username === username &&
            u.credentials.passphrase === password
        )

        // если пользователь найден, сохраняем его в store и localStorage
        if (foundUser) {
          this.user = foundUser
          localStorage.setItem('user', JSON.stringify(foundUser))
          return true
        }
        else {
          this.user = null
          return false
        }

      } catch (e) {
        console.error('Ошибка загрузки пользователей: ', e)
        return false
      }
    },

    /** Выход из системы **/
    logout() {
      localStorage.removeItem('user')
      this.user = null
    }
  }


})