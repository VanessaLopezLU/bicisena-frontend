<template>
    <v-app>
        <v-row class="justify-center" style="margin-top: 70px;">
            <v-col cols="12" md="6">
                <v-card class="pa-4" elevation="10">
                    <v-card-title class="text-center"> 
                        <h1 class="text-center mb-4">Registrar Marca</h1></v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="validForm" lazy-validation>
                            <v-text-field v-model="paqueteMarca.nombre" label="Nombre Marca" prepend-icon="mdi-account"
                                outlined dense clearable :rules="[(v) => !!v || 'El Marca es requerido']"
                                color="black"></v-text-field>
                            <v-card-actions class="justify-center">
                                <v-btn class="mt-6 btn" @click="guardarMarca" block>
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="pa-4" elevation="10">
                    <v-card-title class="text-center">
                        <h1 class="text-center mb-4">Registrar Bicicleta</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="formBici" v-model="validForm" lazy-validation>
                            <!-- Campo para el nombre -->
                            <v-text-field v-model.number="paqueteBici.precio_alquiler" label="Precio Alquiler "
                                prepend-inner-icon="mdi-account" outlined dense clearable
                                :rules="[(v) => !!v || 'El precio es requerido']" color="black"></v-text-field>

                            <v-select v-model="paqueteBici.estado" :items="estado" label="Estado de la Bicicleta"
                                prepend-inner-icon="mdi-map" outlined dense clearable
                                :rules="[(v) => !!v || 'El estado es requerido']" color="black"></v-select>

                            <v-select v-model="paqueteBici.color" :items="color" label="color de la Bicicleta"
                                prepend-inner-icon="mdi-city" outlined dense clearable
                                :rules="[(v) => !!v || 'El color es requerido']" color="black"></v-select>

                            <v-select v-model="paqueteBici.marca" :items="marcas"
                                label="Seleccione la marca " item-title="nombre" item-value="id" color="black"
                                class="text-black" prepend-inner-icon="mdi-account"
                                :rules="[(v) => !!v || 'La Marca es requerida']" required></v-select>


                                <v-select v-model="paqueteBici.regional" :items="regionales"
                                label="Seleccione la regional " item-title="nombre" item-value="id" color="black"
                                class="text-black" prepend-inner-icon="mdi-account"
                                :rules="[(v) => !!v || 'La Regional es requerida']" required></v-select>

                            <v-card-actions class="justify-center">
                                <v-btn class="mt-6 btn" @click="guardarBici" block>
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            validForm: false,
            paqueteMarca: {
                nombre: null,
            },
            paqueteBici: {
                precio_alquiler: null,
                estado: null,
                color: null,
                marca:null,
                regional:null

            },
            marcas: [],
            regionales: [],

            estado: ["Disponible", "Alquilada"],
            color: ["Amarrillo", "Rojo", "Azul", "verde", "Naranja", "violeta"],
        };
    },
    methods: {
        async guardarMarca() {
            const isValid = this.$refs.form.validate();
            if (!isValid) return;

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_API}/marcas/crear`,
                    this.paqueteMarca
                );
                Swal.fire({
                    title: "Registro exitoso",
                    text: `Nombre: ${this.paqueteMarca.nombre}`,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                this.$router.push("/marca-bici");
                this.resetMarca();
            } catch (error) {
                Swal.fire("Error", "Credenciales incorrectas", "error");
            }
        },
        async guardarBici() {
            const isValid = this.$refs.formBici.validate();
            if (!isValid) return;

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_API}/bicicletas/crear`,
                    this.paqueteBici
                );
                Swal.fire({
                    title: "Registro exitoso",
                    text: `Nombre: ${this.paqueteBici.precio_alquiler}, Estado de la Bicicleta : ${this.paqueteBici.estado}, Color de la Bicicleta: ${this.paqueteBici.color},`,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                this.$router.push("/");
            } catch (error) {
                Swal.fire("Error", "Credenciales incorrectas", "error");
            }
        },
        async obtenerRegional(){
            try {
                const response = await axios.get( `${import.meta.env.VITE_APP_API}/regional/obtenerTodos`);
                this.regionales = response.data
            } catch (error) {
                console.error(
                    "Error al obtener las regionales:",
                    error.response ? error.response.data : error.message

                );
            }

        },
        async obtenerMarcas(){
            try {
                const response = await axios.get( `${import.meta.env.VITE_APP_API}/marcas/obtenerTodos`);
                this.marcas = response.data
            } catch (error) {
                console.error(
                    "Error al obtener las regionales:",
                    error.response ? error.response.data : error.message

                );
            }

        },
        resetMarca() {
            this.paqueteMarca = {
                nombre: "",
            };
            this.$refs.form.resetValidation();
        },
    },
    created() {
        this.obtenerMarcas();
        this.obtenerRegional();
    },
};
</script>
<style>
v-card-title {
    font-size: 24px;
    font-weight: bold;
    font-family: "Cambria", serif;
}
h1 {
    font-family: "Cambria", serif;
    color: black;
}


.v-btn {
    font-weight: bold;
}

.v-text-field {
    margin-bottom: 16px;
}

.v-text-field .v-input__control {
    color: black;
}
</style>
<style>
.btn {
    background-color: #25a745;
    color: #f5f5f5;
    width: 10px;
}
</style>