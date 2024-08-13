<template>
    <v-card class="mx-auto mt-10 px-6 py-8" max-width="700">
      <v-card-title>
        <div class="header">
          <v-chip
            class="ma-2 pr-0"
            size="small"
          >
            <template v-slot:append>
              <v-avatar
                class="ml-1 mr-0"
              >
                {{ taskCount }}
              </v-avatar>
            </template>
            Tasks
          </v-chip>
          <v-chip
            class="ma-2 pr-0"
            size="small"
          >
            <template v-slot:append>
              <v-avatar
                class="ml-1 mr-0"
              >
                {{ taskDoneCount }}
              </v-avatar>
            </template>
            Tasks Done
          </v-chip>
          

          <v-btn @click="deleteTasksByAuthUser(null)" class="mr-2 my-2" size="small" prepend-icon="mdi-trash-can" color="red">
            Tasks
          </v-btn>

          <v-btn @click="deleteTasksByAuthUser('done')" v-if="taskDoneCount > 0" class="my-2" size="small" prepend-icon="mdi-trash-can" color="red"
          >
            Tasks Done
          </v-btn>
          
        </div>
      </v-card-title>
      <v-card-text>
        <v-list density="compact">

          <v-list-item
            v-for="(item, i) in tasks"
            :key="i"
            :value="item"
            color="primary"
            @mouseover="showDeleteIcon(item.id)"
            @mouseleave="hideDeleteIcon()"
            
          >
            <template v-slot:prepend>
              <v-icon :disabled="loading" icon="mdi-checkbox-marked-circle" :color="item.status == 'done' ? '' : 'success'" @click="completeTask(item.id)"></v-icon>
            </template>

            <v-list-item-title 
              v-text="item.name"
              :class="[
                item.status == 'done' ? 'task-done' : ''
              ]"
              
            />

            <template v-slot:append>
              <v-icon :disabled="loading" v-if="showDeleteIconId == item.id " icon="mdi-trash-can" color="red" @click="deleteTask(item.id)"></v-icon>
          </template>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-text-field
          v-model="newTask"
          :loading="loading"
          append-inner-icon="mdi-plus"
          density="compact"
          label="New task"
          variant="solo"
          hide-details
          single-line
          rounded
          @click:append-inner="createTask()"
        ></v-text-field>
        <v-btn 
          class="mt-5"
          variant="flat"
          color="red"
          prepend-icon="mdi-logout"
          @click="logout()"
        >
        Logout
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
  import { useTaskStore } from "~/stores/taskStore"

  export default {
    data: () => ({
      tasks: [],
      showDeleteIconId: null,
      loading: false,
      newTask: null,
    }),

    computed: {
        taskCount() {
          return this.tasks.length
        },
        taskDoneCount() {
          return this.tasks.filter(function(item){
            return item.status == 'done';
          }).length;
        },
    },

    created(){
      this.getTasks()
    },
    methods: {
      async onSubmit () {
       
      },
      required (v) {
        return !!v || 'Field is required'
      },

      async getTasks() {
        const task = useTaskStore()

        const response = await task.getTasks();

        this.tasks = response.tasks
      },
      async createTask() {
        
        if(!this.newTask) return

        const task = useTaskStore()

        this.loading = true

        const response = await task.createTask(this.newTask);

        this.tasks.push(response.createTask);

        this.loading = false
        this.newTask = null
      },

      async completeTask(id) {
        const task = useTaskStore()

        this.loading = true

        const response = await task.updateTask(id, 'done');

        this.loading = false

        const index = this.tasks.findIndex((task) => task.id == id);

        this.tasks[index] = response.updateTask
      },

      async deleteTask(id) {
        const task = useTaskStore()

        this.loading = true

        await task.deleteTask(id);

        this.loading = false

        const index = this.tasks.findIndex((task) => task.id == id);

        this.tasks.splice(index, 1);
        
      },

      async deleteTasksByAuthUser(status) {
        const task = useTaskStore()

        this.loading = true

        await task.deleteTasksByAuthUser(status);

        this.loading = false

        this.getTasks()
      },

      async logout() {
        const auth = useAuthStore()

        await auth.logout();

        navigateTo('/')

      },

      showDeleteIcon(id) {
        this.showDeleteIconId = id
      },
      hideDeleteIcon() {
        this.showDeleteIconId = null
      }

    },
  }
</script>

<style scoped>
.v-list-item {
  border: 1px solid #f2f2f2;
  margin-bottom: 5px;
  
}

.v-list-item-title {
  cursor: default;
  font-weight: 600;
}

.v-list {
  height: 300px;
  overflow-y: auto;
}

.task-done {
  text-decoration: line-through;
  color: gray;
}

.v-chip {
  font-weight: 600;
  color: white;
  background: #3f64aafd;
}

.v-avatar {
  color: #3f64aafd;
  background: #ffffff;
}

.v-text-field {
  width: 100%;
}
.header {
  display: flex;
  justify-content: end;
}



</style>