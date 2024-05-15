<script>
import { ref } from 'vue'
import { formatDate } from '../helpers/dateHelper.js';


export default {
  setup() {
    const stocks = ref([]) // define the stocks property as a reactive reference


    const loading = ref(false)

    async function fetchData() {
      loading.value = true
      try {
        const response = await fetch('http://127.0.0.1:8000/stock/')
        const data = await response.json()
        stocks.value = data.map(item => ({ ...item, imageUrl: item.image }))
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }
    fetchData() // call the fetchData function to fetch the data


    // return the stocks property so it can be used in the template
    return {
      stocks,
      loading,
      formatDate
    }
  }
}
</script>

<template>
  <div>
    <header class="p-4">

       <h1>Стоки</h1>
    </header>
    <main class="p-4">
      <section>
      <div class="flex items-center gap-4">
        <div v-for="stock in stocks" :key="stock.id" class="w-full h-[260px]">
            <StockCard :stock="stock" :formatDate="formatDate" :imageUrl="stock.image"  />
          </div>
      </div>

      </section>
    </main>
    <footer class="p-4">
       footer
    </footer>
  </div>
</template>