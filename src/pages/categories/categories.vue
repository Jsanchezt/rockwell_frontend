<script setup>
import {useStore} from "vuex";
import {ref, watch} from "vue";

const categories = ref([]);
const loading = ref(true);
const search = ref("");
const results = ref([]);
const store = useStore()
const getCategories = (payload) => store.dispatch("categories/getCategories", {});
const getData = ()=>{
  loading.value = true
  getCategories().then(data=>{
    categories.value = data;
    results.value = categories.value.data
    loading.value =false
  })
}

getData();

watch(search,(newValue)=>{
  if (newValue.length){
    results.value = filterByName(categories.value.data, newValue)
  }else{
    results.value = categories.value.data
  }
})

function filterByName(arrayOfObjects, searchString) {
  return arrayOfObjects.filter(function(object) {
    // Convert to lowercase for case-insensitive search
    const nameInLowerCase = object.name.toLowerCase();
    const searchInLowerCase = searchString.toLowerCase();

    // Use startsWith to check if the name starts with the search string
    // Or use includes to check if the name contains the search string
    return nameInLowerCase.startsWith(searchInLowerCase) || nameInLowerCase.includes(searchInLowerCase);
  });
}

</script>

<template>
  <VRow>
    <VCol cols="12 ">
      <VCard >
        <v-card-title class="pt-5 pb-5 d-flex justify-space-between align-center">
          <p class="ma-0">
            Listado de categorias
          </p>
          <div class="">
            <v-btn density="compact" elevation="10" icon="bx-refresh" class="mr-5" @click="getData"  color="white"></v-btn>
            <VBtn
              rel="noopener noreferrer"
              color="primary"
              :to="{name:'categories.new'}"
              size="small"
            >
              Agregar categoría
            </VBtn>
          </div>

        </v-card-title>

        <div class="px-5">
          <VRow no-gutters>
            <VCol
              cols="12"
              md="9"
            >
              <VTextField
                id="name"
                append-icon="search"
                v-model="search"
                placeholder="Buscar"
                persistent-placeholder
                autocomplete="off"
              />
            </VCol>
          </VRow>
        </div>

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
              <tr v-if="results === 0">
                <td colspan="5" class="text-center">
                  Sin categorias
                </td>
              </tr>
              <tr
                v-for="(item,index) in results"
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
