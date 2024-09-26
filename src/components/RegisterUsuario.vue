<template>
  <v-app>
    <v-app-bar class="bar" dark height="100px">
      <img src="/src/assets/sena.png" alt="" />

      <!-- Título actualizado -->
      <v-toolbar-title class="ti white--text d-flex align-center">
        Pedaleando juntos hacia un futuro sostenible.
      </v-toolbar-title>
    </v-app-bar>
    <v-container class="contenedor py-10" style="margin-top: 10%">
      <v-responsive max-width="600">
        <v-row class="justify-center">
          <v-col cols="12">
            <v-card class="pa-6" elevation="10">
              <v-card-title class="justify-center">
                <h1 class="text-center mb-4">Formulario de Usuario</h1>
              </v-card-title>
              <v-card-text>
                <v-form
                  ref="formRegister"
                  v-model="validRegister"
                  lazy-validation
                >
                  <v-text-field
                    v-model="paqueteUsuario.nombre"
                    label="Nombre Completo"
                    outlined
                    dense
                    clearable
                    prepend-inner-icon="mdi-account"
                    color="black"
                    class="text-black"
                    :rules="[(v) => !!v || 'Nombre completo es requerido']"
                  ></v-text-field>

                  <v-text-field
                    v-model="paqueteUsuario.usuario"
                    label="Nombre de Usuario"
                    outlined
                    dense
                    clearable
                    prepend-inner-icon="mdi-account"
                    color="black"
                    class="text-black"
                    :rules="[(v) => !!v || 'Nombre de usuario es requerido']"
                  ></v-text-field>

                  <v-text-field
                    v-model="paqueteUsuario.email"
                    label="Correo Electrónico"
                    outlined
                    dense
                    clearable
                    prepend-inner-icon="mdi-email"
                    color="black"
                    class="text-black"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    v-model="paqueteUsuario.password"
                    label="Contraseña"
                    outlined
                    dense
                    clearable
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    color="black"
                    class="text-black"
                    :rules="passwordRules"
                  ></v-text-field>

                  <v-select
                    v-model="paqueteUsuario.regional"
                    :items="regionales"
                    label="Seleccione su Regional "
                    item-title="nombre"
                    item-value="id"
                    color="black"
                    class="text-black"
                    prepend-inner-icon="mdi-account"
                    :rules="[(v) => !!v || 'La regional es requerida']"
                    required
                  ></v-select>

                  <v-select
                    v-model="paqueteUsuario.estrato"
                    :items="Estrato"
                    label="Estrato"
                    outlined
                    dense
                    clearable
                    prepend-inner-icon="mdi-home-city"
                    type="number"
                    color="primary"
                    class="text-black"
                    :rules="[(v) => !!v || 'El estrato es requerido']"
                  ></v-select>

                  <v-text-field
                    v-model.number="paqueteUsuario.edad"
                    label="Edad"
                    outlined
                    dense
                    clearable
                    prepend-inner-icon="mdi-cake"
                    type="number"
                    color="primary"
                    class="text-black"
                    :rules="[(v) => !!v || 'La edad es requerida']"
                  ></v-text-field>

                  <v-card-actions class="justify-center">
                    <v-btn @click="crearUsuario" class="mt-6 btn" block>
                      Enviar
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      paqueteUsuario: {
        nombre: null,
        usuario: null,
        email: null,
        password: null,
        estrato: null,
        edad: null,
        regional: null,
        rol: { id: 2 },
      },
      Estrato: [1, 2, 3, 4, 5, 6],
      validRegister: false,
      regionales: [],
      emailRules: [
        (v) => !!v || "Correo electrónico es requerido",
        (v) => /.+@.+\..+/.test(v) || "Correo electrónico inválido",
      ],
      passwordRules: [
        (v) => !!v || "Contraseña es requerida",
        (v) => v.length >= 6 || "Mínimo 6 caracteres",
      ],
    };
  },
  methods: {
    async crearUsuario() {
      if (!this.$refs.formRegister.validate()) return;

      try {
        const apiUrl = `${import.meta.env.VITE_APP_API}/auth/registro`;
        await axios.post(apiUrl, this.paqueteUsuario);

        Swal.fire({
          title: "Registro exitoso",
          text: "Revisa tu correo electrónico para confirmar tu cuenta.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        this.$router.push("/");
        this.resetForm();
      } catch (error) {
        console.error("Error al registrar el usuario:", error);

        Swal.fire({
          title: "Error",
          text: "No se pudo registrar el usuario. Por favor, intenta de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
    async obtenerRegional() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/regional/obtenerTodos`
        );
        this.regionales = response.data;
      } catch (error) {
        console.error(
          "Error al obtener las regionales:",
          error.response ? error.response.data : error.message
        );
      }
    },
    resetForm() {
      this.paqueteUsuario = {
        nombre: "",
        usuario: "",
        email: "",
        password: "",
        estrato: "",
        edad: "",
        regional: "",
      };
      this.$refs.formRegister.resetValidation();
    },
  },
  created() {
    this.obtenerRegional();
  },
};
</script>

<style scoped>
.contenedor {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: "Cambria", serif;
  color: black;
}

.v-card {
  background-color: #f5f5f5;
  border-radius: 15px;
}

.v-text-field,
.v-checkbox {
  margin-bottom: 16px;
}

.v-text-field .v-input__control,
.v-checkbox .v-input__control {
  color: black;
}

.v-btn {
  font-weight: bold;
}

.btn {
  background-color: #25a745;
  color: #f5f5f5;
}
</style>
