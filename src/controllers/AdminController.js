import {ref} from "vue"
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
export default function useAuthenticationController() {
    const denuncias = ref([]);
    const denunciasProfessor = ref([]);

    /**
     * Recupera todas as denuncias de turmas cadastradas no sistema
     * @returns {Promise<void>}
     */
    const getDenuncias = async  () => {
        const response = await axios.get("getDenuncias")
        denuncias.value = response.data.denuncias
    }

    /**
     * Recupera todas as denuncias de professores cadastradas no sistema
     * @returns {Promise<void>}
     */
    const getDenunciasProfessor = async  () => {
        const response = await axios.get("getDenunciasProfessor")
        denunciasProfessor.value = response.data.denunciasProfessores
    }

    /**
     * Responsável por excluir a denuncia e deixar o comentário ativo
     * @param $id_denuncia
     * @param $redirecionar
     * @returns {Promise<void>}
     */
    const ignorarDenuncia = async  ($id_denuncia, $redirecionar) => {
        await axios.delete("ignorarDenuncia/" +$id_denuncia)
        if ($redirecionar === 'DenunciaProfessor'){
            getDenunciasProfessor()
        }else{
            getDenuncias()
        }
    }

    /**
     * Responsável por excluir a denuncia e comentário
     * @param $id_denuncia
     * @param $id_avalacao
     * @param $redirecionar
     * @returns {Promise<void>}
     */
    const removerComentario = async  ($id_denuncia, $id_avalacao,$redirecionar) => {
        await axios.delete("removerComentario/"+$id_denuncia +"/"+$id_avalacao)
        if ($redirecionar === 'DenunciaProfessor'){
            getDenunciasProfessor()
        }else{
            getDenuncias()
        }
    }

    /**
     * Responsável por excluir a denuncia e comentário e banir o usuário
     * @param $id_denuncia
     * @param $id_avalacao
     * @param $id_usuario
     * @param $redirecionar
     * @returns {Promise<void>}
     */
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