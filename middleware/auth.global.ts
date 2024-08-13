import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const storage = useStorage('access_token');

    if(storage.value && to.path !== '/todo'){ 
        return navigateTo('/todo')
    } else if (!storage.value && to.path !== '/'){
        return navigateTo('/')  
    }
    
});