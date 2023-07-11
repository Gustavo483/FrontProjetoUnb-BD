import {ref} from "vue"
import axios from "axios";
import {useRouter} from "vue-router";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default function useAuthenticationController() {
    const departamentos = ref([]);
    const disciplinas = ref([]);
    const turmas = ref([]);
    const  idTurmas = ref([]);
    const router = useRouter();
    const buscarTurmas = async (data) => {
        const response = await axios.post('filtrarTurmas', data)
        turmas.value = response.data.turmas
        idTurmas.value = response.data.id_turmas
    }
    const getDepartamentos = async () => {
        const response = await axios.get("getAllDepartamento")
        departamentos.value = response.data.departamentos
    }
    const getDisciplinas = async () => {
        var select = document.getElementById('id_codDepartamento')
        var value = select.options[select.selectedIndex].value;
        const response = await axios.get("getDisciplinas/"+ value)
        disciplinas.value = response.data.disciplinas
    }
    const AbrirModal = async ($id_turma,$st_nomeDisciplina,$st_turma) => {
        var btn = document.getElementById('BotaoModel')
        var inputIdTurma = document.getElementById('id_turma')
        var tituloAvaliacao = document.getElementById('TituloAvaliacao')
        var tituloAvaliacao2 = document.getElementById('TituloAvaliacao2')
        tituloAvaliacao.innerText = 'Avaliação da turma '+$st_turma
        tituloAvaliacao2.innerText = 'disciplina: '+$st_nomeDisciplina
        inputIdTurma.innerText = $id_turma
        btn.click()
    }
    const CadastrarAvaliacao = async (data) => {
        var inputIdTurma = document.getElementById('id_turma')
        var id_turma = inputIdTurma.innerHTML
        var response = await axios.post("criarAvaliacao/" + id_turma, data)
        var buscarDisciplina = document.getElementById('buscarDisciplina')
        buscarDisciplina.click()
    }
    const getAvaliacoesUsuario = async () => {
        const response = await axios.get('getAvaliacoesUsuario/')
        turmas.value = response.data.turmas
        idTurmas.value = response.data.id_turmas
    }
    const excluirAvaliacao = async ($id_avaliacao) => {
        await axios.delete('DeleteAvaliacao/' + $id_avaliacao)
    }


    return {
        getDepartamentos,
        buscarTurmas,
        getDisciplinas,
        departamentos,
        disciplinas,
        turmas,
        idTurmas,
        AbrirModal,
        CadastrarAvaliacao,
        getAvaliacoesUsuario,
        excluirAvaliacao
    };
}