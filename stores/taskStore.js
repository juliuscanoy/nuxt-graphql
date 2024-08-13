import { defineStore } from "pinia"
import { useAuthStore } from "~/stores/authStore"

export const useTaskStore = defineStore('task', {
    state: () => ({ data: null, }),
    getters: {
      
    },
    actions: {
        setAccessToken() {
            const auth = useAuthStore()

            useGqlToken(auth.accessToken)
        },

        async getTasks() {
            this.setAccessToken();
    
            return await GqlGetUserTasks()
        },
        
        async createTask(taskName) {
            this.setAccessToken();
    
            return await GqlCreateTask({name: taskName})
        },

        async updateTask(taskId, taskStatus) {
            this.setAccessToken();
    
            return await GqlUpdateTask({id: taskId, status: taskStatus})
        },

        async deleteTask(taskId) {
            this.setAccessToken();
    
            return await GqlDeleteTask({id: taskId})
        },

        async deleteTasksByAuthUser(taskStatus) {
            this.setAccessToken();
    
            return await GqlDeleteTasksByAuthUser({status: taskStatus})
        },
        
    },
  })