<template>
    <v-card class="mx-auto mt-10 px-6 py-8" max-width="500">
        <h1 class="page-title">Nuxt 3 GraphQL Todo List</h1>
        <v-form
            v-model="form"
            @submit.prevent="onSubmit"
        >
          
            <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Email"
            clearable
            ></v-text-field>

            <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            label="Password"
            type="password"
            clearable
            ></v-text-field>

            <br>

            <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
            >
            Sign In
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
  import { useAuthStore } from "~/stores/authStore"

  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
    }),

    created(){
    },
    methods: {
      async onSubmit () {
        if (!this.form) return

        this.loading = true

        const authStore = useAuthStore()

        const result = await authStore.login(this.email, this.password)
        
        authStore.setAccessToken(result.login)
        
        this.loading = false

        navigateTo('/todo')
      },

      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>

<style scoped>
.page-title { 
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}
</style>