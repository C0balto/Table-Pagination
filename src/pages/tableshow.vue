<template>
  
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">
      <q-btn round color="primary" icon="logout" alt="sair" to="/"/>  
    </h5>
    <div class="q-pa-md">
    <q-btn-group>
      <q-btn color="secondary" glossy label="List" to="table"/>
      <q-btn color="secondary" glossy label="Show" to="tableshow"/>
      <q-btn color="secondary" glossy label="Create" to="tablecreate"/>
    </q-btn-group> 
    <q-table
      title="Entities"
      :rows="posts"
      :columns="columns"
      :rows-per-page-options="[10]"
      row-key="name"
    />
  </div>
  </q-page>
  
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios';

export default defineComponent({
  name: 'TableShow',
  setup () {
    const posts = ref([])
    const columns = [
      { name: 'id', field:'id' , label: 'Id', align: 'left'},
      { name: 'name', field: 'name', label: 'Name', align:'left' },
      { name: 'active', field: 'active', label: 'Active'},
      { name: 'order', field: 'order' , label: 'Order'}, 
    ]
    onMounted(() => {
      getShow();
    })
  const id = 1390; 
  const getShow = async() => { 
      try { 
          const { data } = await api.get('/' + `${id}`)
          posts.value = [data.data]
          
      }catch(error){
          console.log(error)
      }
  }
  
    return {
      posts,
      columns
    }
  }
})




</script>
