import {defineStore} from "pinia";
import {warn} from "vue";

interface Product {
  id: number;
  name: string;
  status: string;
  date_created: string;
  price: number;
  category: string
}

interface filtersProducts {
  date: string | null;
  status: string[];
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],            /** массив продуктов **/
    filters: {
      date: null,
      status: []
    } as filtersProducts,              /** фильтры **/
    filteredProducts: [] as Product[],/** отфильтрованный массив продуктов **/
    currentPage: 1,                  /** текущая страница **/
    perPage: 10,                    /** количество товаров на странице **/
  }),

  actions: {
    /** получение списка продуктов **/
    async getProducts() {
      try {
        const response = await fetch('/api/products.json')
        this.products = await response.json()

        // применение фильтров
        this.filteredProducts = [...this.products]

      } catch (e) {
        console.error('Ошибка загрузки продуктов: ', e)
      }
    },

    /** пагинация: возвращает товары для текущей страницы **/
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredProducts.slice(start, start + this.perPage)
    },


    /** получение общего списка страниц **/
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage)
    },

    /** изменение текущей страницы **/
    changePage(page: number) {
      this.currentPage = page
    },

    /** фильтрация **/
    applyFilters(filters) {
      if (!filters) {
        console.warn('Фильтры не заданы');
        return;
      }

      const { date, status = [] } = filters;

      this.filteredProducts = this.products.filter((product) => {
        // проверка по дате создания
        const matchDate: boolean = date
          ? new Date(product.date_created).toISOString().split("T")[0] === date
          : true;

        // проверка по статусу
        const matchStatus = status.length ? status.includes(product.status) : true;

        return matchDate && matchStatus;
      });

    }

  }
})