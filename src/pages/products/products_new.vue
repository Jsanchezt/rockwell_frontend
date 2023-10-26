<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useStore} from "vuex";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import cloneDeep from "@/utils";
import axios from "@/api/client";
import {useDropzone} from "vue3-dropzone";


const route = useRoute();
const router = useRouter();
const store = useStore();
const id = ref(route.params.product_id)
const loading = ref(true);
const readonly = ref(false);
const confirm = ref(null);
const available = ref(true);
const best_seller = ref(false);
const snackbar = ref(false);
const data = ref({});
const images = ref([]);
const errors = ref([]);
const categories = ref([]);


const tickLabels = ref({
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
})


const updateProducts = (payload) => store.dispatch("products/storeProducts", payload);
const getCategories = (payload) => store.dispatch("categories/getCategories", payload);

getCategories().then(dataCategories=>{
  categories.value = dataCategories.data
  loading.value = false
})




const updateData = async () => {
  let payload = cloneDeep(data.value)
  payload.available = available.value
  payload.best_seller = best_seller.value
  payload.images = images.value.join(',')
  let keys = [ 'name', 'price', 'brand', 'category',
    'best_seller', 'available', 'color', 'ranking', 'description',
    'old_price', 'image_principal', 'images'];
  const form = JSON.parse(JSON.stringify(payload));
  keys.map((item)=>{
    errors.value[item] = !validateData(form, item);
  })
  if (!Object.values(errors.value).some(i=>i)){
    if (
      await confirm.value.open(
        "Confirmar",
        "Estas seguro que quieres actualizar este producto?",
        undefined,
        "Aceptar"
      )
    ) {
      updateProducts(payload).then(_dta=>{
        router.push({name: "products.index"})
      }).catch(err=>{
        console.log(err)
      })
    }

  }else{
    snackbar.value = true
  }
}


const onDrop = (acceptFiles,reject, event) => {
  saveFiles(acceptFiles, event.target.name);
}


const validateData = (form, key)=>{
  if (key in form){
    if (form[key] !== ''){
      return true
    }
  }
  return false
}


const saveFiles = (files, key) => {
  const formData = new FormData(); // pass data as a form
  formData.append("images", files[0]);
  axios
    .post('https://rockwell.com.mx/backend/api/files', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(key)
      if (key ==='images'){
        images.value.push(response.data.url)
      }else{
        data.value[key] = response.data.url
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
  onDrop,
});


const clickDrop = (e)=>{
  document.getElementById(e).click()
}


</script>

<template>
  <div>
    <VRow>
      <VCol cols="12 ">
        <VCard>
          <v-card-title class="pt-5 pb-5 d-flex align-center">
            <router-link :to="{name:'products.index'}">
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
                        <label for="firstName">Nombre del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="name"
                          v-model="data.name"
                          :error-messages="errors?.name?'El campo es requerido':''"
                          :readonly="readonly"
                          placeholder="Tijeras"
                          persistent-placeholder
                          autocomplete="off"
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
                        <label for="firstName">Categoria del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <v-select
                          v-model="data.category"
                          :error-messages="errors?.category?'El campo es requerido':''"
                          :items="categories"
                          item-title="name"
                          item-value="code"
                        ></v-select>
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
                        <label for="firstName">Precio anterior del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="old_price"
                          v-model="data.old_price"
                          :error-messages="errors?.old_price?'El campo es requerido':''"
                          :readonly="readonly"
                          placeholder="15,000"
                          persistent-placeholder
                          autocomplete="off"
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
                        <label for="firstName">Precio del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="name"
                          v-model="data.price"
                          :error-messages="errors?.price?'El campo es requerido':''"
                          :readonly="readonly"
                          placeholder="15,000"
                          persistent-placeholder
                          autocomplete="off"
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
                        <label for="firstName">Marca del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="brand"
                          v-model="data.brand"
                          :error-messages="errors?.brand?'El campo es requerido':''"
                          :readonly="readonly"
                          placeholder="RockWell"
                          autocomplete="off"
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
                        <label for="firstName">Color del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="color"
                          v-model="data.color"
                          :error-messages="errors?.color?'El campo es requerido':''"
                          :readonly="readonly"
                          placeholder="Rojo"
                          persistent-placeholder
                          autocomplete="off"
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
                        <label for="firstName">Descripción del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextarea
                          id="name"
                          type="textarea"
                          v-model="data.description"
                          :readonly="readonly"
                          :error-messages="errors?.description?'El campo es requerido':''"
                          placeholder="Descripción general del producto"
                          persistent-placeholder
                          autocomplete="off"
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
                        <label for="firstName">Calificaion del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <v-slider
                          :max="5"
                          v-model="data.ranking"
                          :error-messages="errors?.ranking?'El campo es requerido':''"
                          :ticks="tickLabels"
                          step="1"
                          show-ticks="always"
                          tick-size="4"
                        ></v-slider>
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
                        <label for="firstName">Detalle del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <v-checkbox label="Habilitado" v-model="available"></v-checkbox>
                        <v-checkbox label="Mejor vendido" v-model="best_seller"></v-checkbox>
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
                        <label for="firstName">Imagen principal del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >

                        <v-img
                          v-if="data.image_principal"
                          :src="data?.image_principal"
                          :lazy-src="data?.image_principal"
                          width="300px"
                          height="300px"
                          cover
                          class="bg-grey-lighten-2"
                          @click="data.image_principal = null"
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

                        <div v-else>
                          <div class="dropzone" @click="clickDrop('image_principal')" name="image_principal">
                            <div
                              class="border"
                              name="image_principal"
                              :class="[
                                isDragActive ? 'isDragActive' : '' ,
                                errors?.image ? 'error' : ''
                              ]"
                            >
                              <input v-bind="getInputProps()" name="image_principal" id="image_principal" key="image_principal" />
                              <p v-if="isDragActive">Suelta los archivos aquí...</p>
                              <div v-else class="text-center">
                                <VIcon icon="bx-camera" size="30" class="mb-2" />
                                <p>Arrastre y suelte archivos aquí, o haga clic para seleccionar archivos</p>
                              </div>
                            </div>
                          </div>
                          <p class="file_error " v-if="errors?.image" >La imagen es requerida</p>
                        </div>



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
                        <label for="firstName">Imagenes del producto</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >

                        <div class="gallery" >
                          <v-img
                            v-for="img in images"
                            :src="img"
                            :lazy-src="img"
                            width="300px"
                            cover
                            class="bg-grey-lighten-2 img"
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
                          <div >
                            <div class="dropzone mt-10" @click="clickDrop('images')">
                              <div
                                class="border images"
                                :class="[
                                isDragActive ? 'isDragActive' : '' ,
                                errors?.image ? 'error' : ''
                              ]"
                              >
                                <input v-bind="getInputProps()" name="images" id="images" />
                                <p v-if="isDragActive">Suelta los archivos aquí...</p>
                                <div v-else class="text-center">
                                  <VIcon icon="bx-camera" size="30" class="mb-2" />
                                  <p>Arrastre y suelte archivos aquí, o haga clic para seleccionar archivos</p>
                                </div>
                              </div>
                            </div>
                            <p class="file_error " v-if="errors?.image" >La imagen es requerida</p>
                          </div>
                        </div>
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
                    <VBtn type="submit" @click="updateData" >
                      Guardar
                    </VBtn>
                    <VBtn
                      color="secondary"
                      variant="tonal"
                      type="reset"
                      @click="$router.push({name:'products.index'})"
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
    <v-snackbar
      v-model="snackbar"
      color="deep-purple-accent-4"
      elevation="24"
      multi-line
    >
      Existen algunos errores, revisa los campos
      <template v-slot:actions>
        <v-btn
          color="red-darken-2"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<style lang="scss">
.gallery{
  img{
    margin-top: 10px;
  }
}
.red_icon{
  background: red;
}
.dropzone,
.files {
  &:hover{
    cursor: pointer;
  }
}

.border {
  &.error{
    border-color: red!important;
  }
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: all 0.3s ease;
  background: #fff;

  &.isDragActive {
    border: 2px dashed #00d0ff;
    background: rgb(158 159 255 / 20%);
  }

  p{
    margin: 0;
  }

}

.file-item {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(255 167 18 / 20%);
  padding: 7px;
  padding-left: 15px;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .delete-file {
    background: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
}

.file_error{
  font-size: 13px;
  padding: 10px ;
  color: rgb(255,62,29);
}
</style>
