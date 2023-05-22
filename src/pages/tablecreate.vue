<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">
      <q-btn round color="primary" icon="logout" alt="sair" to="/"/>  
    </h5>
    <div class="q-pa-md">
      <q-btn-group>
        <q-btn color="secondary" glossy label="List" to="table"/>
        <q-btn color="secondary" glossy label="Show" to="tableshow"/>
        <q-btn color="secondary" glossy label="Create" to="tablecreate" />
      </q-btn-group>     
      
    
      <q-card style="min-width: 350px ; max-width: 800px">
        <q-card-section>
          <div class="text-h6">New Client</div>
        </q-card-section>

        <q-card-section class="q-pt-md">

          <q-form
            @submit.prevent="onSubmit"            
            class="q-gutter-md"
          >
          <q-input
              dense
              v-model="newAdd.house_rules.name"
              label="name"
              hint="Name"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input 
              dense v-model="newAdd.house_rules.active" autofocus @keyup.enter="prompt = false" label="Active" 
              lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" 
              style="padding:5px 0px 25px;"
            />
            <q-card-actions align="right" class="text-primary">   
              <q-btn flat label="Reset" type="reset" />
              <q-btn flat label="Add"   type="submit" />
            </q-card-actions>
        </q-form>

        </q-card-section>

       
      </q-card>
    </div>
  </q-page>
  
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios';

export default defineComponent({
  name: 'tableCreate',
  setup () {
    const newAdd = ref({
      house_rules: {
        name:'',
        active:'',
      }
    })
  
    const onSubmit = async () => {
      try {
        api.post(' ', newAdd.value)             
      } catch(error) {
        console.log(error);
      }
    }

    return {
        newAdd,
        onSubmit,      
    }
  }
  
})




</script>
