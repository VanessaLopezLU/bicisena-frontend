<template>
  <v-app>
    <!-- Barra de Navegación -->
    <v-app-bar class="bar" dark height="100px">
      <img src="/src/assets/sena.png" alt="" />

      <!-- Título actualizado -->
      <v-toolbar-title class="ti white--text d-flex align-center">
        Pedaleando juntos hacia un futuro sostenible.
      </v-toolbar-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="login-icon" v-bind="attrs" v-on="on" @click="goToLogin"
            >mdi-login
          </v-icon>
        </template>
        <span>Login</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <v-container class="pa-6">
        <v-row class="cartas mt-10">
          <v-col cols="12" md="4" v-for="i in 2" :key="i">
            <v-card class="pa-4" elevation="4">
              <v-card-title>Tarjeta {{ i }}</v-card-title>
              <v-card-text>Contenido de la tarjeta número {{ i }}</v-card-text>
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
export default {
  data() {
    return {
      validForm: false, // Valida el formulario
      formData: {
        nombre: "", // Nombre del usuario
        email: "", // Correo del usuario
      },
      paqueteUsuario: {
        email: null,
        password: null,
      },
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
    resetForm() {
      this.formData.nombre = "";
      this.formData.email = "";
      this.$refs.form.resetValidation();
    },
    goToLogin() {
      this.$router.push({ name: "InicioSesion" });
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
  background-color: #3f51b5;
  color: white;
  font-weight: bold;
}

.pa-6 {
  padding: 24px;
}
</style>
