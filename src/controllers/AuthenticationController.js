import {ref} from "vue"
import axios from "axios";
import {useRouter} from "vue-router";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
export default function useAuthenticationController() {
    const usuarios = ref([]);
    const usuario = ref([]);
    const errors = ref({});
    const router = useRouter();
    const Authentication = ref([]);

    const verificarLogin = async () => {
        if (localStorage.getItem('token')) {
            Authentication.value = 1
        } else {
            Authentication.value = 0
        }
    }

    const authenticationValidation = async () => {
        const notNeedPermision = ['login', 'register']
        if (localStorage.getItem('route') === 'login' && localStorage.getItem('token')) {
            await router.push({name: "home"});
        }
        if ((!notNeedPermision.includes(localStorage.getItem('route'))) && (!localStorage.getItem('token'))) {
            await router.push({name: "login", params: {blFeed: 0}})
        }
    }

    const getUsuarios = async () => {
        const response = await axios.get("teste")
        usuarios.value = response.data.usuarios
    }

    const getUsuario = async () => {
        const response = await axios.get("editUsuario")
        usuario.value = response.data.usuario
    }

    const login = async (data) => {
        try {
            const response = await axios.post("login", data)
            localStorage.setItem('token', response.data.token)
            window.location.reload();
            await router.push({name: "home"});
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const register = async (data) => {
        try {
            await axios.post('register', data)
            await router.push({name: "login", params: {blFeed: 1}})
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const updateUsuario = async (id) => {
        try {
            await axios.put("uptadeUsuario/" + id, usuario.value)
            errors.value = ''
            await router.push({name: "profile", params: {blFeed: 1}})
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const logout = async () => {
        try {
            await axios.post("logout")
            localStorage.setItem('token', '')
            await router.push({name: "login", params: {blFeed: 0}})
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    return {
        authenticationValidation,
        usuarios,
        getUsuario,
        updateUsuario,
        logout,
        register,
        Authentication,
        verificarLogin,
        getUsuarios,
        login,
        errors,
        usuario,
    };
}