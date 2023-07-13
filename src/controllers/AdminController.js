import {ref} from "vue"
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
export default function useAuthenticationController() {
    const denuncias = ref([]);
    const denunciasProfessor = ref([]);
    const getDenuncias = async  () => {
        const response = await axios.get("getDenuncias")
        denuncias.value = response.data.denuncias
    }

    const getDenunciasProfessor = async  () => {
        const response = await axios.get("getDenunciasProfessor")
        denunciasProfessor.value = response.data.denunciasProfessores
    }
    const ignorarDenuncia = async  ($id_denuncia, $redirecionar) => {
        await axios.delete("ignorarDenuncia/" +$id_denuncia)
        if ($redirecionar === 'DenunciaProfessor'){
            getDenunciasProfessor()
        }else{
            getDenuncias()
        }

    }
    const removerComentario = async  ($id_denuncia, $id_avalacao,$redirecionar) => {
        await axios.delete("removerComentario/"+$id_denuncia +"/"+$id_avalacao)
        if ($redirecionar === 'DenunciaProfessor'){
            getDenunciasProfessor()
        }else{
            getDenuncias()
        }
    }
    const removerUsuario = async  ($id_denuncia, $id_avalacao, $id_usuario,$redirecionar) => {
        await axios.delete("removerComentario/"+$id_denuncia +"/"+$id_avalacao+"/"+$id_usuario)
        if ($redirecionar === 'DenunciaProfessor'){
            getDenunciasProfessor()
        }else{
            getDenuncias()
        }
    }

    return {
        denuncias,
        getDenuncias,
        ignorarDenuncia,
        removerComentario,
        removerUsuario,
        getDenunciasProfessor,
        denunciasProfessor
    };
}