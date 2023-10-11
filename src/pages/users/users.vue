<script setup>
import {useStore} from "vuex";
import user from "@/store/modules/user";

const users = ref([]);
const loading = ref(true)



const store = useStore()

const getLoads = (payload) => store.dispatch("user/getUsers", {});



getLoads().then(data=>{
  users.value = data;
  loading.value =false
})






</script>

<template>
  <VRow>

    <VCol cols="12 ">
      <VCard title="Listado de usuarios">
        <VTable
          class="pa-5"
          height="250"
          fixed-header
        >
          <thead>
          <tr>
            <th class="text-uppercase">
              ID
            </th>
            <th>
              Email
            </th>
            <th>
              Nombre
            </th>
            <th>
              Actualizado el
            </th>
            <th>
              Acciones
            </th>
          </tr>
          </thead>
          <tbody>
            <template v-if="!loading">
              <tr
                v-for="(item,index) in users"
                :key="'user'+index"
              >
                <td>
                  {{item.id}}
                </td>
                <td class="text-center">
                  {{ item.email }}
                </td>
                <td class="text-center">
                  {{ item.name}}
                </td>
                <td class="text-center">
                  {{ item.updated_at }}
                </td>
                <td class="text-center">
                  <VBtn
                    rel="noopener noreferrer"
                    color="primary"
                    :to="{name:'users.detail', params:{user_id: item.id}}"
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
