<script>
import { useAuthStore } from "~/stores/authStore"

export default {
  setup() {
    const authStore = useAuthStore()
    // Initialize the store to load the token from local storage
    authStore.initialize()

    return {
      authStore,
    }
  },
}

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
