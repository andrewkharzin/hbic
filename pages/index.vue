<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Today from "../components/tabs/Today.vue"
import Week from "../components/tabs/Week.vue"
import Month from "../components/tabs/Month.vue"
import Year from "../components/tabs/Year.vue"
const loading = ref(false)
const options = computed(() => (
    Highcharts.chart('container', {
      chart: {
          type: 'spline'
      },
      title: {
          text: 'Monthly Average Temperature'
      },
      subtitle: {
          text: 'Source: ' +
              '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
              'target="_blank">Wikipedia.com</a>'
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          accessibility: {
              description: 'Months of the year'
          }
      },
      yAxis: {
          title: {
              text: 'Temperature'
          },
          labels: {
              format: '{value}°'
          }
      },
      tooltip: {
          crosshairs: true,
          shared: true
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#666666',
                  lineWidth: 1
              }
          }
      },
      series: [{
          name: 'Tokyo',
          marker: {
              symbol: 'square'
          },
          data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
              y: 26.4,
              marker: {
                  symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
              },
              accessibility: {
                  description: 'Sunny symbol, this is the warmest point in the chart.'
              }
          }, 22.8, 17.5, 12.1, 7.6]

      }, {
          name: 'Bergen',
          marker: {
              symbol: 'diamond'
          },
          data: [{
              y: 1.5,
              marker: {
                  symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
              },
              accessibility: {
                  description: 'Snowy symbol, this is the coldest point in the chart.'
              }
          }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
      }]
  })
))


const components = {
  Today,
  Week,
  Month,
  Year
}


const list = [
  {
    title: 'Today',
    component: 'Today'
  },
  {
    title: 'This week',
    component: 'Week'
  },
  {
    title: 'This month',
    component: 'Month'
  },
  {
    title: 'This year',
    component: 'Year'
  }
]
</script>

<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>Hi! Welcome back to your dashboard!</p>
        <h1>Dashboard</h1>

      </div>
      <div class="bg-slate-200 h-[36px] w-[120px]"></div>
    </header>
    <main class="grid gap-2">
      <!-- <div class="flex items-center gap-4">
        <div v-for="(item, index) in 3" :key="index" class="w-[120px] h-[36px] bg-slate-200"></div>
      </div>
      <section>
            <div class="w-full h-[360px] bg-slate-200"></div>
      </section> -->
      <template>
        <Tabs default-value="today" class="w-[400px]">
          <TabsList>
            <TabsTrigger v-for="item, index in list" :key="index" :value="item.title">
              {{ item.title }}
            </TabsTrigger>

          </TabsList>
          <TabsContent v-for="item in list" :key="item.title" :value="item.title">
          <component :is="components[item.component]" />

          </TabsContent>

        </Tabs>
      </template>


    </main>
    <footer>
      <div class="flex items-center gap-4">
        <div v-for="(item, index) in 3" :key="index" class="w-full h-[260px] bg-slate-200"></div>
      </div>
    </footer>
  </div>
</template>