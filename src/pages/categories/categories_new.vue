<script setup>
import {  useRouter } from 'vue-router'
import {useStore} from "vuex";
import { watch } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import axios from "../../api/client";


const router = useRouter();
const store = useStore();
const loading = ref(false);
const data = ref({});
const errors = ref({});
const storeCategories = (payload) => store.dispatch("categories/storeCategories", payload);




const onDrop = (acceptFiles) => {
  saveFiles(acceptFiles);
}


watch(data.value, () => {
  const form = JSON.parse(JSON.stringify(data.value));
  let keys = Object.keys(form);
  keys.map((item)=>{
    errors.value[item] = !validateData(form, item);
  })

});

const validateData = (form, key)=>{
    if (key in form){
        if (form[key] !== ''){
          return true
        }
    }
    return false
}

const saveCategory = () => {
  let keys = ['name', 'code', 'image'];
  const form = JSON.parse(JSON.stringify(data.value));
  keys.map((item)=>{
    errors.value[item] = !validateData(form, item);
  })
  if (!Object.values(errors.value).some(i=>i)){
      console.log("SAVE CATEGO")
      storeCategories(form).then((_data)=>{
        router.push({name:'categories.index'})
      }).catch(()=>{

      })
  }
}

const saveFiles = (files) => {
  const formData = new FormData(); // pass data as a form
  formData.append("images", files[0]);
  axios
    .post('http://localhost/api/files', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      data.value.image = response.data.url
    })
    .catch((err) => {
      console.error(err);
    });
};

const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
  onDrop,
});


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
                          :error-messages="errors?.name?'El nombre es requerido':''"
                          v-model="data.name"
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
                        <label for="firstName">Código de la categoría</label>
                      </VCol>

                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          id="code"
                          :error-messages="errors?.code?'El código es requerido':''"
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
                          v-if="data.image"
                          :src="data?.image"
                          :lazy-src="data?.image"
                          width="300px"
                          height="300px"
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

                        <div v-else>
                          <div class="dropzone" v-bind="getRootProps()">
                            <div
                              class="border"
                              :class="[
                                isDragActive ? 'isDragActive' : '' ,
                                errors?.image ? 'error' : ''
                              ]"
                            >
                              <input v-bind="getInputProps()" />
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


                  <!-- 👉 submit and reset button -->
                  <VCol
                    offset-md="3"
                    cols="12"
                    md="9"
                    class="d-flex gap-4 mt-8"
                  >
                    <VBtn type="submit" @click="saveCategory"  class="text-white">
                      Guardar
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



  </div>
</template>
<style lang="scss" scoped>
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
