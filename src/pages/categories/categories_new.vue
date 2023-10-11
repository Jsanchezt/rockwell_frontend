<script setup>
import {  useRouter } from 'vue-router'
import {useStore} from "vuex";
const router = useRouter();
const store = useStore();
const loading = ref(true);
const data = ref({

});
const getCategories = (payload) => store.dispatch("categories/getCategory", payload);


getCategories(1).then((_data)=>{

  }).catch(()=>{

  }).finally(()=>{
    loading.value = false
})


import { reactive, watch } from 'vue';
import { useDropzone } from 'vue3-dropzone';
import axios from "../../api/client";

const state = reactive({
  files: [],
});

const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
  onDrop,
});

watch(state, () => {
  //console.log('state', state);
});

watch(isDragActive, () => {
  //console.log('isDragActive', isDragActive.value, rest);
});

function onDrop(acceptFiles, rejectReasons) {
  saveFiles(acceptFiles);
  state.files = acceptFiles;
}

function handleClickDeleteFile(index) {
  state.files.splice(index, 1);
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
      console.info(response.data);
      state.files =[]
      data.value.image = response.data.url
    })
    .catch((err) => {
      console.error(err);
    });
};



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

                          <div v-if="state.files.length > 0" class="files">
                            <div class="file-item" v-for="(file, index) in state.files" :key="index">
                              <span>{{ file.name }}</span>
                              <span class="delete-file" @click="handleClickDeleteFile(index)"
                              >Delete</span
                              >
                            </div>
                          </div>
                          <div v-else class="dropzone" v-bind="getRootProps()">
                            <div
                              class="border"
                              :class="{
                                isDragActive,
                              }"
                            >

                              <input v-bind="getInputProps()" />
                              <p v-if="isDragActive">Suelta los archivos aquí...</p>
                              <div v-else class="text-center">
                                <VIcon icon="bx-camera" size="30" class="mb-2" />
                                <p>Arrastre y suelte archivos aquí, o haga clic para seleccionar archivos</p>
                              </div>
                            </div>
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



  </div>
</template>
<style lang="scss" scoped>
.dropzone,
.files {

}

.border {
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
</style>
