<template>
  <q-page class="flex column flex-center" >
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="text" label="Username" />
      
      <q-input v-model="password" :type="isPwd ? 'password' : 'text'" hint="Password with hint" label="Password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
      </q-input>


      <div class="q-pa-md q-gutter-sm">
        <q-btn-group push>
        <q-btn to="/table" color="blue" glossy text-color="white" push label="Login" icon="verified_user" />
        <q-btn color="primary" glossy text-color="white" push label="Help?" />
      </q-btn-group>
      </div>
    </div>
  </q-page>
  
</template>

<script>

import { defineComponent } from 'vue'
import { ref } from 'vue'
export default defineComponent({
  name: 'LoginPage',
  setup () {
    return {
      password: ref(''),
      isPwd: ref(true),

      email: ref(''),
      search: ref(''),
      tel: ref(''),
      url: ref(''),
      time: ref(''),
      date: ref('')
    }
  }
  
})
</script>
