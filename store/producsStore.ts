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
    products: [] as Product[], /** массив продуктов **/
    currentPage: 1,           /** текущая страница **/
    perPage: 10              /** количество товаров на странице **/
  }),

  actions: {
    /** получение списка продуктов **/
    async getProducts() {
      try {
        const response = await fetch('/api/products.json')
        this.products = await response.json()
      }
      catch (e) {
        console.error('Ошибка загрузки продуктов: ', e)
      }
    },

    /** пагинация: возвращает товары для текущей страницы **/
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.products.slice(start, start + this.perPage)
    },


    /** получение общего списка страниц **/
    totalPages() {
      return Math.ceil(this.products.length / this.perPage)
    },

    /** изменение текущей страницы **/
    changePage(page: number) {
      this.currentPage = page
    },

  }

})