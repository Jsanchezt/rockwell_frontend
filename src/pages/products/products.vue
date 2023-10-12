<script setup>
import {useStore} from "vuex";
const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const store = useStore()
const getProducts = (payload) => store.dispatch("products/getProducts", {});
const getCategories = (payload) => store.dispatch("categories/getCategories", {});

const transformToDesiredFormat = (data) => {
  const result = {};
  for (const item of data) {
    result[item.code] = item.name;
  }
  return result;
}


const getData = ()=>{
  loading.value = true
  getCategories().then(data=>{
    categories.value = transformToDesiredFormat(data.data);
    getProducts().then(data=>{
      products.value = data;
      loading.value =false
    })
  })
}

getData()
</script>

<template>
  <VRow>
    <VCol cols="12 ">
      <VCard >
        <v-card-title class="pt-5 pb-5 d-flex justify-space-between align-center">
          <p class="ma-0">
            Listado de productos
          </p>
          <div class="">
            <v-btn density="compact" elevation="10" icon="bx-refresh" class="mr-5" @click="getData"  color="white"></v-btn>
            <VBtn
              rel="noopener noreferrer"
              color="primary"
              :to="{name:'categories.new'}"
              size="small"
            >
              Agregar producto
            </VBtn>
          </div>

        </v-card-title>


        <VTable
          class="pa-5"
          height="650"
          fixed-header
        >
          <thead>
          <tr>
            <th class="text-uppercase">
              ID
            </th>
            <th>
              Nombre
            </th>
            <th>
              Categoría
            </th>
            <th>
              Marca
            </th>
            <th>
              Precio
            </th>
            <th>
              Acciones
            </th>
          </tr>
          </thead>
          <tbody>
            <template v-if="!loading">
              <tr v-if="products.data.length === 0">
                <td colspan="5" class="text-center">
                  Sin categorias
                </td>
              </tr>
              <tr
                v-for="(item,index) in products.data"
                :key="'user'+index"
              >
                <td>
                  {{item.id}}
                </td>
                <td class="text-center">
                  {{ item.name }}
                </td>
                <td class="text-center">
                  {{ categories[item.category]}}
                </td>
                <td class="text-center">
                  {{ item.brand}}
                </td>
                <td class="text-center">
                   <span class="tachado">${{ item.old_price }}</span> /
                   <span>${{ item.price }}</span>
                </td>
                <td class="text-center">
                  <VBtn
                    rel="noopener noreferrer"
                    color="primary"
                    :to="{name:'products.detail', params:{product_id: item.id}}"
                    size="small"
                  >
                    Ver detalle
                  </VBtn>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="6" class="text-center pt-16">
                  <v-progress-circular indeterminate :size="55"></v-progress-circular>
                </td>
              </tr>
            </template>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.tachado {
  text-decoration: line-through;
}
</style>
