<template>
  <v-layout>
    <!-- Barra de Navegación -->
    <v-app-bar class="bar" dark height="100px">
      <img src="/src/assets/sena.png" alt="Sena Logo" />

      <!-- Título actualizado -->
      <v-toolbar-title class="ti white--text d-flex align-center">
        Pedaleando juntos hacia un futuro sostenible
      </v-toolbar-title>

      <!-- Ícono de Logout -->
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Menú lateral -->
    <v-navigation-drawer class="nave" v-model="drawer" permanent>
      <v-list>
        <!-- Iteración de los items con íconos y rutas -->
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.ruta"
        >
          <v-list-item-icon>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido Principal -->
    <v-main style="height: 500px">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Bicicletas",
          icon: "mdi-bike", // Ícono de bicicleta
          ruta: "/administracion/bicicletas",
          color: "green", // Color verde
        },
        {
          title: "Regional",
          icon: "mdi-city", 
          ruta: "/administracion/regional",
          color: "green", 
        },
        {
          title: "Finanzas",
          icon: "mdi-cash",
          ruta: "/administracion/finanzas",
          color: "green",
        },
        {
          title: "Mapa",
          icon: "mdi-map", 
          ruta: "/administracion/ubicacion", 
          color: "green",
        },
      ],
    };
  },
  computed: {
    // Utiliza un getter para saber si el usuario está autenticado
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    usuario() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logout() {
      // Llamar a la acción logout en el store
      this.$store.dispatch("logout");

      // Redirigir a la página de inicio de sesión
      this.$router.push("/inicio");
    },
  },
};
</script>

<style scoped>
.bar {
  background: radial-gradient(
    circle,
    rgb(174, 238, 190) 0%,
    rgb(7, 180, 50) 100%
  );
}

.ti {
  font-size: 30px;
  color: #f5f1f1;
  margin-left: 20px;
  font-family: "Times New Roman", cursive;
}

.nave {
  width: 200px; /* Ajustar el ancho del sidebar */
  margin-top: 110px;
}
</style>
