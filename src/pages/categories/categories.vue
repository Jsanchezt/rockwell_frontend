<script setup>
import {useStore} from "vuex";
const categories = ref([]);
const loading = ref(true)
const store = useStore()
const getCategories = (payload) => store.dispatch("categories/getCategories", {});
getCategories().then(data=>{
  categories.value = data;
  loading.value =false
})
</script>

<template>
  <VRow>
    <VCol cols="12 ">
      <VCard >
        <v-card-title class="pt-5 pb-5 d-flex justify-space-between align-center">
          <p class="ma-0">
            Listado de categorias
          </p>
          <VBtn
            rel="noopener noreferrer"
            color="primary"
            :to="{name:'categories.new'}"
            size="small"
          >
            Agregar categoría
          </VBtn>
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
              Codigo
            </th>
            <th>
              Creado el
            </th>
            <th>
              Acciones
            </th>
          </tr>
          </thead>
          <tbody>
            <template v-if="!loading">
              <tr
                v-for="(item,index) in categories.data"
                :key="'user'+index"
              >
                <td>
                  {{item.id}}
                </td>
                <td class="text-center">
                  {{ item.name }}
                </td>
                <td class="text-center">
                  {{ item.code}}
                </td>
                <td class="text-center">
                  {{ item.created_at }}
                </td>
                <td class="text-center">
                  <VBtn
                    rel="noopener noreferrer"
                    color="primary"
                    :to="{name:'categories.detail', params:{category_id: item.id}}"
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
