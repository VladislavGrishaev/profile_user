import {defineStore} from "pinia";

interface Product {
 id: number;
 name: string;
 status: string;
 date_created: string;
 price: number;
 category: string
}
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[] /** массив продуктов **/
  }),

  actions: {
    async getProducts() {
      try {
        const response = await fetch('/api/products.json')
        this.products = await response.json()
      }
      catch (e) {
        console.error('Ошибка загрузки продуктов: ', e)
      }
    }
  }

})