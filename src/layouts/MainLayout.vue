<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="height:90px">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Table Test
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      :breakpooint="600"
    >
      <q-list >
        <q-item-label
          header
          style="background-color:#0f2133; color:white; height:90px; margin-bottom: 30px;"

        >
        <q-avatar size="56px" class="q-mb-sm">
              <img src="https://avatars.githubusercontent.com/u/32967281?v=4">
        </q-avatar>
          Hewerton Rodrigues
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Linked IN',
    caption: 'linkedin.com/in/hwrodrigues/',
    icon: 'account_circle',
    link: 'https://www.linkedin.com/in/hwrodrigues/'
  },
  {
    title: 'Github',
    caption: 'github.com/C0balto',
    icon: 'code',
    link: 'https://github.com/C0balto'
  },
  {
    title: 'Code PEN',
    caption: 'codepen.io/cobalto',
    icon: 'create',
    link: 'https://codepen.io/cobalto'
  },
  
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
