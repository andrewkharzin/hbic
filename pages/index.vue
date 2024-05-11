<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
const loading = ref(false)
const list = [
  {
    title: 'Today',
    component: resolveComponent("TabsToday")
  },
  {
    title: 'This week',
    component: '<div>This week</div>'
  },
  {
    title: 'This month',
    component: '<div>This month</div>'
  },
  {
    title: 'This year',
    component: '<div>This year</div>'
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
          <TabsContent v-for="item, index in list" :key="index" :value="item.title">
            {{ item.component }}
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