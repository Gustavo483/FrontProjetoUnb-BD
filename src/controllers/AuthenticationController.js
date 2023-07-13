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
    const admin = ref([]);

    /**
     * Verifica se o perfil logado é de um usuário admin
     * @returns {Promise<void>}
     */
   const verificarAdmin = async  () => {
       let usuarioString = localStorage.getItem('usuario');
       if (usuarioString){
           let usuarioObj = JSON.parse(usuarioString);
           var bl_admin = usuarioObj.bl_admin

           if (bl_admin) {
               admin.value = 1
           } else {
               admin.value = 0
           }
       }else{
           admin.value = 0
       }

   }
    const verificarLogin = async () => {
        if (localStorage.getItem('token')) {
            Authentication.value = 1
        } else {
            Authentication.value = 0
        }
    }

    /**
     * Verifica a autenticação dos usuários e redireciona conforme condições
     * @returns {Promise<void>}
     */
    const authenticationValidation = async () => {
        let usuarioLogado = localStorage.getItem('usuario');
        if (usuarioLogado){
            let usuarioLogadoObj = JSON.parse(usuarioLogado);
            var bl_admin = usuarioLogadoObj.bl_admin ? 1 : 0
        }else{
            bl_admin = 0
        }

        const notNeedPermision = ['login', 'register']
        const needPermisionAdmin = ['denunciasTurmas','denunciasProfessores']
        if (!bl_admin && needPermisionAdmin.includes(localStorage.getItem('route'))){
            await router.push({name: "home"});
        }

        if (localStorage.getItem('route') === 'login' && localStorage.getItem('token')) {
            await router.push({name: "home"});
        }
        if ((!notNeedPermision.includes(localStorage.getItem('route'))) && (!localStorage.getItem('token'))) {
            await router.push({name: "login", params: {blFeed: 0}})
        }
    }

    /**
     * Recuperao os daods do usuário logado
     * @returns {Promise<void>}
     */
    const getUsuario = async () => {
        let usuarioLogado = localStorage.getItem('usuario');
        usuario.value = JSON.parse(usuarioLogado)
        console.log(usuario)
    }

    /**
     * Realiza o login do usuário caso os dados estejam corretos
     * @param data
     * @returns {Promise<void>}
     */
    const login = async (data) => {
        try {
            const response = await axios.post("login", data)
            localStorage.setItem('token', response.data.token)
            let usuario = response.data.usuario
            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location.reload();
            await router.push({name: "home"});
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    /**
     * Registra um novo usuario na base de dados
     * @param data
     * @returns {Promise<void>}
     */
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

    /**
     * Atualiza o cadastro do usuário
     * @param id
     * @returns {Promise<void>}
     */
    const updateUsuario = async (id) => {
       console.log(usuario.value)
        try {
            await axios.post("updateUsuario/" + id, usuario.value)
            errors.value = ''
            await router.push({name: "profile", params: {blFeed: 1}})
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    /**
     * Desloga o usuário
     * @returns {Promise<void>}
     */
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
        login,
        verificarAdmin,
        admin,
        errors,
        usuario,
    };
}