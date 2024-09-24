import { createRouter, createWebHashHistory } from 'vue-router';
import Registrarse from './components/Registrarse.vue';
import InicioSesion from './components/InicioSesion.vue';
import ConfirmarCuenta from './components/ConfirmarCuenta.vue';







// Definir las rutas de la aplicación
const routes = [
    {
      path: '/',
      name: 'IniciarSesion',
      component: InicioSesion
    },
   
    {
      path: '/registrarse',
      name: 'Registrarse',
      component: Registrarse
    },
    {
      path: '/confirmar/:token',
      name: 'ConfirmaCuenta',
      component:ConfirmarCuenta
  
    },
  ];

// Crear la instancia del router
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;