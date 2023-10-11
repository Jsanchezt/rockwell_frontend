<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      width="548"
    >
      <VCardItem class="justify-center">
        <VCardTitle class="text-2xl font-weight-bold">
          <img :src="logo" style="width: 210px">
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bienvenivo al Panel de Control! 👋🏻
        </h5>
        <p class="mb-0 mt-3">
          Inicie sesión en su cuenta y comience la aventura.
        </p>
      </VCardText>



      <VCardText>

        <VForm ref="form" class="">
          <VTextField
            v-model="form.email"
            :rules="emailRules"
            label="Email"
            required
          />
          <VTextField
            class="mt-10"
            v-model="form.password"
            :rules="passwordRules"
            label="Password"
            placeholder="············"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
          />

          <v-alert
            v-if="error"
            class="mt-8"
            title="Error al iniciar sesión"
            text="Tus credenciales son incorrectas, verifica tus datos."
            type="error"
          ></v-alert>

          <div class="d-flex flex-column">
            <VBtn
              class="mt-9 btn_login"
              block
              height="48"
              :loading="loading"
              @click="validate"
            >
              Acceder
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script>
import logo from '@images/_logo.svg'
import Auth from "@/api/auth";
export default {
  data: () => ({
    logo: logo,
    form: {
      email: 'jc@gmail.com'
    },
    emailRules: [
      v => !!v || 'Email es requerido',
      v => (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) || 'Email no valido',
    ],
    passwordRules: [
      v => !!v || 'Password es requerido',
    ],
    isPasswordVisible: false,
    error: false,
    loading: false,
  }),
  methods: {
    async validate() {
      const { valid } =  await this.$refs.form.validate();
      if (valid) {
        this.loading = true
        let auth =  new Auth();
        auth.login(this.form.email,this.form.password).then((data)=>{
          localStorage.setItem('at',data.access_token)
          localStorage.setItem('rt',data.refresh_token)
          this.$router.push({name:'dashboard'})
          this.loading = false
        }).catch(err=>{
          this.error = true
          this.loading = false
        })
      }
    }
  },
}
</script>


<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

</style>
