import {ref} from "vue"
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
export default function useAuthenticationController() {
    const denuncias = ref([]);
    const getDenuncias = async  () => {
        const response = await axios.get("getDenuncias")
        denuncias.value = response.data.denuncias
    }
    const ignorarDenuncia = async  ($id_denuncia) => {
        await axios.delete("ignorarDenuncia/" +$id_denuncia)
        getDenuncias()
    }
    const removerComentario = async  ($id_denuncia, $id_avalacao) => {
        await axios.delete("removerComentario/"+$id_denuncia +"/"+$id_avalacao)
        getDenuncias()
    }
    const removerUsuario = async  ($id_denuncia, $id_avalacao, $id_usuario) => {
        await axios.delete("removerComentario/"+$id_denuncia +"/"+$id_avalacao+"/"+$id_usuario)
        getDenuncias()
    }

    return {
        denuncias,
        getDenuncias,
        ignorarDenuncia,
        removerComentario,
        removerUsuario
    };
}