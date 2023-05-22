
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/login.vue') },
      { path: '/table/:id?',name: 'idpost', component: () => import('src/pages/table.vue') },
      { path: '/tableshow' , component: () => import('src/pages/tableshow.vue') },
      { path: '/tablecreate', component: () => import('src/pages/tablecreate.vue') },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
