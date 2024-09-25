import { createRouter, createWebHashHistory } from 'vue-router';

import InicioSesion from './components/InicioSesion.vue';
import ConfirmarCuenta from './components/ConfirmarCuenta.vue';
import RegisterUsuario from './components/RegisterUsuario.vue';

import Regional from './components/Regional.vue';
import Bicicletas from './components/Bicicletas.vue';
import AlquilerBici from './components/AlquilerBici.vue';
import CicloPaseo from './components/CicloPaseo.vue';
import UbicacionBici from './components/UbicacionBici.vue';
import Plantilla from './components/Plantilla.vue';







// Definir las rutas de la aplicación
const routes = [
  {
    path: '/',
    name: 'InicioSesion',
    component: InicioSesion
  },
  {
    path: '/registrarse',
    name: 'RegisterUsuario',
    component: RegisterUsuario
  },
  {
    path: '/confirmar/:token',
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
    path: '/plantilla',
    name: 'Plantilla',
    component: Plantilla,

  },
  ];

// Crear la instancia del router
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;