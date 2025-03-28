import {defineStore} from "pinia";


interface Credentials {
 username: string;
 passphrase: string;
}

interface User {
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
    users: [] as User[]       /** список пользователей **/
  }),

  actions: {

    /** Загружаем пользователей с сервера **/
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
    async login(username: string, password: string): Promise<boolean>  {
      try {
        const response = await fetch('/api/users.json')
        const users: User[] = await response.json()

        // существует ли конкретный пользователь?
        const foundUser = users.find(
          (u)=>
            u.credentials.username === username &&
            u.credentials.passphrase === password
        )

        if (foundUser) {
          // если да, то авторизуем и сохраним в store
          this.user = foundUser;
          return true
        }
        else {
          // если пользователь не найден, то не сохраняем данные
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