import { createRouter, createWebHashHistory } from 'vue-router';

import InicioSesion from './components/InicioSesion.vue';
import ConfirmarCuenta from './components/ConfirmarCuenta.vue';
import RegisterUsuario from './components/RegisterUsuario.vue';

import Regional from './components/Regional.vue';
import Bicicletas from './components/Bicicletas.vue';
import AlquilerBici from './components/AlquilerBici.vue';
import CicloPaseo from './components/CicloPaseo.vue';
import UbicacionBici from './components/UbicacionBici.vue';
import Home from './components/Home.vue';
import Administracion from './components/Administracion.vue';
import MostrarBici from './components/MostrarBici.vue';
import Graficos from './components/Graficos.vue';






// Definir las rutas de la aplicación
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

  },
  {
    path: '/inicio',
    name: 'InicioSesion',
    component: InicioSesion
  },
  {
    path: '/registrarse',
    name: 'RegisterUsuario',
    component: RegisterUsuario
  },
  {
    path: '/confirmarCuenta/:token',
    name: 'ConfirmaCuenta',
    component: ConfirmarCuenta,

  },
  {
    path: '/regional',
    name: 'Regional',
    component: Regional,

  },
  {
    path: '/marca-bici',
    name: 'Bicicletas',
    component: Bicicletas,

  },
  {
    path: '/alquiler',
    name: 'Alquiler',
    component: AlquilerBici,

  },
  {
    path: '/ciclo-paseo',
    name: 'CicloPaseo',
    component: CicloPaseo,

  },
  {
    path: '/ubicacion-bici',
    name: 'UbicacionBici',
    component: UbicacionBici,

  },
 
  {
    path: '/administracion',
    name: 'Administracion',
    component:  Administracion,
    children: [
     
      {
        path: 'regional',
        name: 'Regional',
        component: Regional,

      },
      {
        path: 'bicicletas',
        name: 'MostrarBici',
        component: MostrarBici,

      },
      {
        path: 'finanzas',
        name: 'Finanzas',
        component: Graficos,

      },
       {
    path: 'ubicacion',
    name: 'UbicacionBici',
    component: UbicacionBici,

  },
    ]

  },
  ];

// Crear la instancia del router
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;