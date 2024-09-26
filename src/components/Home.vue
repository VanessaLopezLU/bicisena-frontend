<template>
  <v-app>
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

    <v-main>
      <v-container class="pa-6">
        <v-row class="cartas mt-10">
          <v-col cols="12" md="4" v-for="i in 2" :key="i">
            <v-card class="pa-4" elevation="4">
              <v-card-title>CicloPaseos {{ i }}</v-card-title>
              <v-card-text
                >Disfruta de la naturaleza con BiciSENA {{ i }}</v-card-text
              >
              <v-card-text>26-09-2024 {{ i }}</v-card-text>
              <v-card-actions>
                <v-btn @click="goToLogin"> Suscribirse </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app class="footer pa-4" dark>
      <span class="white--text">&copy; 2024 SenaSoft</span>
    </v-footer>
  </v-app>
</template>

<script>
import CicloPaseo from "./CicloPaseo.vue";

export default {
  data() {
    return {
      validForm: false, // Valida el formulario
      CicloPaseo: [],
    };
  },
  methods: {
    enviarFormulario() {
      if (this.$refs.form.validate()) {
        alert(
          `Formulario enviado: ${this.formData.nombre}, ${this.formData.email}`
        );
        this.resetForm();
      }
    },
    async obtenerCicloPaseo() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/ciclopaseos/obtenerTodos`
        );
        this.CicloPaseos = response.data;
      } catch (error) {
        console.error(
          "Error al obtener las regionales:",
          error.response ? error.response.data : error.message
        );
      }
    },
    resetForm() {
      this.formData.nombre = "";
      this.formData.email = "";
      this.$refs.form.resetValidation();
    },
    goToLogin() {
      this.$router.push({ name: "InicioSesion" });
    },
    logout() {
      // Destruir el token en el almacenamiento local o sesión
      localStorage.removeItem("token"); // Si guardaste el token en sessionStorage, usa sessionStorage.removeItem("token");

      // Redirigir al usuario a la página de inicio de sesión
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
.login {
  margin-right: 30px;
  color: white;
}
.ti {
  font-size: 30px;
  color: #f5f1f1;
  margin-left: 20px;
  font-family: "Times New Roman", cursive;
}
.carta {
  margin-top: 10px;
}

.custom-height {
  height: 120px; /* Ajusta el valor según la altura deseada */
}

h1 {
  font-family: "Cambria", serif;
  font-weight: bold;
  color: #3f51b5; /* Primary color de Vuetify */
}

.v-footer {
  justify-content: center;
  background-color: #10bd3bff;
}
.pa-6 {
  padding: 24px;
}

.login-icon {
  margin-right: 40px; /* Ajusta el margen derecho del ícono */
  font-size: 36px; /* Aumenta el tamaño del ícono */
}

.v-btn {
  background-color: #247e18;
  color: white;
  font-weight: bold;
  width: 10px;
}

.pa-6 {
  padding: 24px;
}
</style>
