import { defineStore } from "pinia"
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
    state: () => ({ accessToken: null, }),
    getters: {
      
    },
    actions: {
        initialize() {
            const storage = useStorage('access_token')

            this.accessToken = storage.value
        },
        setAccessToken(token) {
            this.accessToken = token

            useStorage('access_token', this.accessToken)
        },

        async login(email, password) {
            return await GqlLoginUser({email: email, password: password})
        },

        async logout() {
            const response = await GqlLogoutUser()

            const storage = useStorage('access_token', this.accessToken)

            storage.value = null;
            this.accessToken = null

            return true
        },
    },
  })