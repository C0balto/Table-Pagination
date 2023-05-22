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
      
      <q-table
        title="Entities"
        :rows="posts"
        :columns="columns"
        v-model:pagination="pagination"
        row-key="name"
        @request = "handleRequest"
        :rows-per-page-options="[10]"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn icon="create" @click="prompt = true; handleEditPost(props.row.id)" />
            <q-btn icon="delete"  @click="handleDeletePost(props.row.id)"/>
          </q-td>
        </template>
      </q-table>
      
    </div>
  </q-page>
  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6" v-for="(columns, index) in columns" :key="index"></div>
        </q-card-section>
        <q-form
          @submit.prevent="editSubmit"
        >
          <q-card-section class="q-pt-none">
            <p>{{ editId }}</p>
          
              <q-input 
                style="padding: 15px 0px" 
                v-model="addEdit.house_rules.name"
                dense label="name" 
                autofocus 
                @keyup.enter="prompt = false"
              />
              <q-input 
                style="padding: 15px 0px" 
                v-model="addEdit.house_rules.active" 
                dense label="active" 
                autofocus 
                @keyup.enter="prompt = false" 
              />
            
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Fechar" v-close-popup to="/table" />
            <q-btn flat label="Edit It" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    
    </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'TablePage',
  setup () {
    const posts = ref([])
    const router = useRouter()
    const pagination = ref({
      page: 1,
      rowPerPage: 10,
      rowsNumber: 0
    })
    const columns = [
      { name: 'id', field:'id' , label: 'Id', align: 'left'},
      { name: 'name', field: 'name', align: 'left', label: 'Name', },
      { name: 'active', field: 'active', label: 'Active'},
      { name: 'order', field: 'order' , label: 'Order'} ,
      { name: 'actions', field: 'actions', align: 'right'}
    ]
    const editId = ref({
      name: 'id'
    })
    const addEdit = ref({
      house_rules: {
        name:'',
        active:'',
      }
    })
    
      onMounted(() => {
      getList();
    })

    const getList = async(page = 1) => { 
      try { 
          const {data} = await api.get('', { 
          params: {page: page}
        })
          posts.value = data.data.entities          
          const pages = data.data.pagination
          pagination.value.page = pages.current_page
          pagination.value.rowsPerPage = pages.per_page
          pagination.value.rowsNumber = pages.total          
      }catch(error){
          console.log(error)
      }
    
    }
    const handleEditPost = (id) => {
      router.push({name: 'idpost', params: {id}})
      editId.value = id
      addEdit.value.house_rules.name = null
      addEdit.value.house_rules.active = null
    }

    const editSubmit = async () => {
      try {
        await api.put('/'+ editId.value , addEdit.value)
        alert("Edited with success")
        await getList();
        
      } catch(error) {
        console.log(error);
      }
    }

    const handleDeletePost = async(id) => {
    try {
      await api.delete('/' + `${id}`)
      alert("Row has been erased");
      await getList();  
    }catch(error){
      console.log(error)
    }
  }
    const handleRequest = (props) => {
      console.log(props)
      getList(props.pagination.page)
    }
    

    return {
      posts,
      pagination, 
      columns,
      editId,
      addEdit,
      handleRequest,
      handleDeletePost,
      handleEditPost,
      editSubmit,
      prompt: ref(false),
    }
  }
})




</script>
