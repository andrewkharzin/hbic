<script>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import QrcodeVue from 'vue-qrcode'
import { onMounted } from 'vue'

export default {
  components: {
    QrcodeVue
  },
  props: {
    stock: {
      type: Object,
      required: true
    },
    formatDate: {
      type: Function,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const qrCodeSize = ref(20)
    const entities = ref([])
    const stock = props.stock

    const formatTotalCost = (totalCost) => {
      const numberFormat = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      return numberFormat.format(totalCost)
    }

    const fetchEntities = async () => {
      console.log('stock:', stock)
      try {
        const response = await fetch(`http://127.0.0.1:8000/entities/?stock=${stock.id}`)
        const data = await response.json()
        entities.value = data
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(() => {
      fetchEntities()
    })

    const filteredEntities = computed(() => {
      return entities.value.filter(entity => entity.stock.id === stock.id)
    })

    const totalItems = computed(() => {
      return filteredEntities.value.reduce((total, entity) => total + entity.quantity, 0)
    })

    const totalCost = computed(() => {
      return filteredEntities.value.reduce((total, entity) => total + entity.total, 0)
    })


    const toggleQrCodeSize = () => {
      qrCodeSize.value = qrCodeSize.value === 20 ? 200 : 20
    }

    const showFullDescription = ref(false)

    const truncate = (text, length) => {
      if (text.length <= length) {
        return text
      }
      return text.substring(0, length) + '...'
    }

    const toggleDescription = () => {
      showFullDescription.value = !showFullDescription.value
    }

    return {
      showFullDescription,
      truncate,
      toggleDescription,
      qrCodeSize,
      toggleQrCodeSize,
      filteredEntities,
      totalItems,
      totalCost,
      formatTotalCost
    }
  }
}
</script>

<template>
  <Card class="min-h-[275px]">
    <CardHeader>
      <div class="flex items-center space-x-4">
      <Avatar>
          <AvatarImage :src="imageUrl" :alt="stock.name" />
        </Avatar>

        <div class="flex-1 space-y-1">
          <CardTitle>{{ stock.name }}</CardTitle>
          <CardDescription class="text-xs" :class="{ 'truncate': !showFullDescription }" @click="toggleDescription">
            {{ showFullDescription ? stock.description : truncate(stock.description, 25) }}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <!-- <p class="text-gray-600 mb-2 text-xs">SKU: {{ stock.sku }}</p> -->
      <!-- <p class="text-gray-600 mb-2 text-xs">Supplier: {{ stock.supplier }}</p> -->

      <div class="flex flex-col items-start justify-between">
        <p v-if="totalItems > 0" class="text-gray-600 text-xs mb-2">
          Всего позиций:
          <span class="text-sm font-bold">{{ totalItems }}</span>
        </p>
        <p v-else class="text-gray-600 text-xs mb-2">
        Позиции отсутствуют
        </p>
        <p v-if="totalCost > 0" class="text-gray-600 text-xs mb-2">Общая стоимость:
          <span class="text-sm font-bold">{{ formatTotalCost(totalCost) }}</span>
        </p>
        <p v-else class="text-gray-600 text-xs mb-2">
        ________________________
      </p>

      </div>


    </CardContent>
    <CardFooter>
      <div class="flex flex-col gap-2 items-start">
        <p class="mb-2 text-xs text-slate-500">Обновлено:
          <Badge variant="outline">
          {{ formatDate(stock.last_updated) }}
        </Badge>
        </p>
        <Drawer>
          <div class="grid grid-cols-2 gap-2">
            <DrawerTrigger>
              <Button variant="outline" size="sm">QR</Button>

            </DrawerTrigger>
            <Button variant="outline" size="sm">List</Button>
          </div>
          <DrawerContent>
            <div class="mx-auto w-full max-w-sm">
            <DrawerHeader>
             <div class="flex flex-col items-center">
              <QrcodeVue :value="stock.stock_id" size="200" color="blue"></QrcodeVue>
              <DrawerDescription>Scan to share!</DrawerDescription>
            </div>
            </DrawerHeader>
            <DrawerFooter class="flex justify-between items-center">

              <DrawerClose>
                <Button variant="outline">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
          </DrawerContent>
        </Drawer>
      </div>
    </CardFooter>
    <!-- temporary console.log statement for debugging -->
    <div v-once>{{ console.log('imageUrl:', imageUrl) }}</div>
  </Card>
</template>

<style scoped>
.min-h-[275px] {
  min-height: 275px;
}
</style>