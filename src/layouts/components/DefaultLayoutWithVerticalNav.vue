<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'


</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>



        <VSpacer />



        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />

<!--      <VerticalNavSectionTitle
        :item="{
          heading: 'Users',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Users',
          icon: 'bx-user',
          module: 'users',
          to: '/users',
        }"
      />-->

      <!-- 👉 Categories -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Categorias',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Categorias',
          icon: 'bx-add-to-queue',
          module: 'categories',
          to: '/categories',
        }"
      />

      <!-- 👉 Categories -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Products',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Products',
          icon: 'bx-cut',
          module: 'products',
          to: '/products',
        }"
      />

    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 illustration -->

    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
