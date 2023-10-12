<script setup>
import { useRoute, useRouter } from 'vue-router'
import {useStore} from "vuex";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const route = useRoute();
const router = useRouter();
const store = useStore();
const id = ref(route.params.category_id)
const loading = ref(true);
const confirm = ref(null);
const data = ref({});
const getCategories = (payload) => store.dispatch("categories/getCategory", payload);
const delCategories = (payload) => store.dispatch("categories/delCategory", payload);

getCategories(id.value).then((_data)=>{
  data.value = _data
  }).catch(()=>{
    router.push({name:'categories.index'})
  }).finally(()=>{
    loading.value = false
})

const delRecord = async () => {
  if (
    await confirm.value.open(
      "Confirmar",
      "Estas seguro que queires eliminar esta categoria?"
    )
  ) {
    deleteRecord();
  }
}

const deleteRecord = ()=>{
  delCategories(id.value).then(()=>{
    router.push({name:'categories.index'})
  }).catch(()=>{

  })
}




</script>

<template>
  <div>
    <VRow>
      <VCol cols="12 ">
        <VCard>
          <v-card-title class="pt-5 pb-5 d-flex align-center">
            <router-link :to="{name:'categories.index'}">
              <VIcon
                size="20"
                icon="bx-arrow-back"
                class="mr-3"
              />
            </router-link>
            Detalle de la categoría
          </v-card-title>

          <VCardText>
            <template  v-if="loading">
              <VCol col="12" class="text-center pt-16 pb-16 ">
                <v-progress-circular indeterminate :size="55"></v-progress-circular>
              </VCol>
            </template>
            <template v-else>
              <div class="mt-8">
                <VRow>
                  <VCol cols="12">
                    <VRow no-gutters>
                      <!-- 👉 First Name -->
                      <VCol
                        cols="12"
                        md="3"
                        class="d-flex align-center"
                      >
                        <label for="firstName">Nombre de la categoría</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="name"
                          v-model="data.name"
                          :readonly="true"
                          placeholder="Tijeras"
                          persistent-placeholder
                        />
                      </VCol>
                    </VRow>
                  </VCol>
                  <VCol cols="12">
                    <VRow no-gutters>
                      <!-- 👉 First Name -->
                      <VCol
                        cols="12"
                        md="3"
                        class="d-flex align-center"
                      >
                        <label for="firstName">Codigo de la categoría</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="name"
                          :readonly="true"
                          v-model="data.code"
                          placeholder="Tijeras"
                          persistent-placeholder
                        />
                      </VCol>
                    </VRow>
                  </VCol>
                  <VCol cols="12" class="mt-5">
                    <VRow no-gutters>
                      <!-- 👉 First Name -->
                      <VCol
                        cols="12"
                        md="3"
                        class="d-flex align-center"
                      >
                        <label for="firstName">Imagen de la categoría</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <v-img
                          v-if="data.image===''"
                          src="https://camexa-formularios.com/sector/beneficiosPics/sin-imagen.jpg"
                          lazy-src="https://camexa-formularios.com/sector/beneficiosPics/sin-imagen.jpg"
                          width="200px"
                          cover
                          class="bg-grey-lighten-2"
                        />
                        <v-img
                          v-else
                          :src="data?.image"
                          :lazy-src="data?.image"
                          width="300px"
                          cover
                          class="bg-grey-lighten-2"
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey-lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </VCol>
                    </VRow>
                  </VCol>


                  <!-- 👉 submit and reset button -->
                  <VCol
                    offset-md="3"
                    cols="12"
                    md="9"
                    class="d-flex gap-4 mt-8"
                  >
                    <VBtn type="submit" @click="delRecord" color="#F44336" class="text-white">
                      Eliminar
                    </VBtn>
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      type="reset"
                      @click="$router.push({name:'categories.index'})"
                    >
                      Cancelar
                    </VBtn>
                  </VCol>
                </VRow>
              </div>
            </template>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VDivider />

    <ConfirmDialog ref="confirm"/>


  </div>
</template>
