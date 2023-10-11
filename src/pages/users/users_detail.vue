<script setup>
import { useRoute } from 'vue-router'
import avatar1 from "@images/avatars/avatar-1.png";

const route = useRoute()


const accountData = {
  avatarImg: avatar1,
  name: 'john',
  email: 'johnDoe@example.com',
  org: 'ThemeSelection',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD',
}
const accountDataLocal = ref(structuredClone(accountData))

// tabs

</script>

<template>
  <div>

    <VDivider />

    <VRow>
      <VCol cols="12">
        <VCard >

          <v-card-title class="pt-5 pb-5 d-flex align-center">
            <router-link :to="{name:'users.index'}">
              <VIcon
                size="20"
                icon="bx-arrow-back"
                class="mr-3"
              />
            </router-link>
            Editar usuario
          </v-card-title>

          <VDivider />

          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <!-- 👉 First Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.firstName"
                    placeholder="John"
                    label="First Name"
                  />
                </VCol>

                <!-- 👉 Last Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="accountDataLocal.lastName"
                    placeholder="Doe"
                    label="Last Name"
                  />
                </VCol>

                <!-- 👉 Email -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.email"
                    label="E-mail"
                    placeholder="johndoe@gmail.com"
                    type="email"
                  />
                </VCol>

                <!-- 👉 Organization -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.org"
                    label="Organization"
                    placeholder="ThemeSelection"
                  />
                </VCol>

                <!-- 👉 Phone -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.phone"
                    label="Phone Number"
                    placeholder="+1 (917) 543-9876"
                  />
                </VCol>

                <!-- 👉 Address -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.address"
                    label="Address"
                    placeholder="123 Main St, New York, NY 10001"
                  />
                </VCol>

                <!-- 👉 State -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.state"
                    label="State"
                    placeholder="New York"
                  />
                </VCol>

                <!-- 👉 Zip Code -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="accountDataLocal.zip"
                    label="Zip Code"
                    placeholder="10001"
                  />
                </VCol>

                <!-- 👉 Country -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="accountDataLocal.country"
                    label="Country"
                    :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                    placeholder="Select Country"
                  />
                </VCol>

                <!-- 👉 Language -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="accountDataLocal.language"
                    label="Language"
                    placeholder="Select Language"
                    :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']"
                  />
                </VCol>

              </VRow>
            </VForm>
          </VCardText>
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn>Save changes</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Reset
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <!-- 👉 Deactivate Account -->
        <VCard title="Deactivate Account">
          <VCardText>
            <div>
              <VCheckbox
                v-model="isAccountDeactivated"
                label="I confirm my account deactivation"
              />
            </div>

            <VBtn
              :disabled="!isAccountDeactivated"
              color="error"
              class="mt-3"
            >
              Deactivate Account
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
    <!-- SECTION: Change Password -->
      <VCol cols="12">
      <VCard title="Change Password">
        <VForm>
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Current Password"
                  placeholder="············"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="New Password"
                  placeholder="············"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                  label="Confirm New Password"
                  placeholder="············"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Password Requirements:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="bxs-circle"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn>Save changes</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Reset
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->
    </VRow>

  </div>
</template>
