<script setup>
const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})

const route = useRoute()

const isActive = computed(() => {
  return props.item?.module === route.name?.split('.')[0]
})





</script>

<template>
  <li
    class="nav-link"
    :class="{ disabled: item.disable }"
  >
    <Component
      :is="item.to ? 'RouterLink' : 'a'"
      :to="item.to"
      :href="item.href"
      :class="[isActive?'router-link-active router-link-exact-active':'']"
    >
      <VIcon
        :icon="item.icon"
        class="nav-item-icon"
      />
      <!-- 👉 Title -->
      <span class="nav-item-title">
        {{ item.title }}
      </span>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
