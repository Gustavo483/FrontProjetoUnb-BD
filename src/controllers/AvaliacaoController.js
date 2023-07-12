import {ref} from "vue"
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default function useAuthenticationController() {
    const departamentos = ref([]);
    const disciplinas = ref([]);
    const turmas = ref([]);
    const  idTurmas = ref([]);
    const professores = ref([]);
    const  avaliacoes = ref([]);
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
    const AbrirModal = async ($id_turma) => {
        var div = document.getElementById($id_turma)
        div.classList.toggle('none')
        div.classList.toggle('shadow')
    }
    const CadastrarAvaliacao = async ($id_turma) => {
        var st_avaliacaoEditar =document.getElementById('st_avaliacao'+$id_turma)
        var int_estrelasEditar =document.getElementById('int_estrelas'+$id_turma)
        var data = {
            "id_turma": $id_turma,
            "st_avaliacao": st_avaliacaoEditar.value,
            "int_estrelas": int_estrelasEditar.value,
        }
        await axios.post("criarAvaliacao", data)
        st_avaliacaoEditar.value = ''
        int_estrelasEditar.value = ''
        var buscarDisciplina = document.getElementById('buscarDisciplina')
        buscarDisciplina.click()
        AbrirModal($id_turma)

    }
    const getAvaliacoesUsuario = async () => {
        const response = await axios.get('getAvaliacoesUsuario/')
        turmas.value = response.data.turmas
        idTurmas.value = response.data.id_turmas
    }

    const recarregarPagina =async  () => {
        window.location.reload();
    }

    const deleteAvaliacao = async ($id_avaliacao) => {
        await axios.delete('DeleteAvaliacao/' + $id_avaliacao)
        getAvaliacoesUsuario()
    }
    const getDadosAvaliacao = async() => {
        var btn = document.getElementById('btnModalEdit')
        btn.click()
    }
    const EditarAvaliacao = async($id_avaliacao,$st_avaliacao,$int_estrelas) => {
        var div = document.getElementById('DivEdidAvaliacao'+$id_avaliacao)
        div.classList.toggle('none')
        div.classList.toggle('shadow')
        document.getElementById('st_avaliacaoEditar'+$id_avaliacao).value =$st_avaliacao
        document.getElementById('int_estrelasEditar'+$id_avaliacao).value =$int_estrelas
    }
    const UpdadateAvaliacao = async ($id_avaliacao) => {

        var st_avaliacaoEditar =document.getElementById('st_avaliacaoEditar'+$id_avaliacao).value
        var int_estrelasEditar =document.getElementById('int_estrelasEditar'+$id_avaliacao).value
        var data = {
            "id_avaliacao": $id_avaliacao,
            "st_avaliacao": st_avaliacaoEditar,
            "int_estrelas": int_estrelasEditar,
        }
        await axios.put("updateAvaliacao", data)
        getAvaliacoesUsuario()
        var div = document.getElementById('DivEdidAvaliacao'+$id_avaliacao)
        div.classList.toggle('none')
        div.classList.toggle('shadow')
    }

    const buscarProfessores = async () => {
        var id_departamento = document.getElementById('id_codDepartamento').value
        const response = await axios.get('getProfessores/' + id_departamento)
        professores.value = response.data.professores
        avaliacoes.value = response.data.avaliacoes
    }
    const abrirModalAvaliacaoProfessor = async  ($id_professor) => {
        var documento = document.getElementById($id_professor)
        documento.classList.toggle('none')
        documento.classList.toggle('shadow')
    }
    const CadastrarAvaliacaoProfessor = async  ($id_professor) => {
        var st_avaliacao = document.getElementById('st_comentário'+$id_professor)
        var int_estrelas = document.getElementById('int_estrelas'+$id_professor)
        var data = {
            "id_professor": $id_professor,
            "st_avaliacao": st_avaliacao.value,
            "int_estrelas": int_estrelas.value,
        }
        await axios.post("criarAvaliacaoProfessor", data)
        buscarProfessores()
        abrirModalAvaliacaoProfessor($id_professor)
        st_avaliacao.value = ''
        int_estrelas.value = ''
    }
    const getAvaliacoesProfessoresUsuario = async  () => {
        const response = await axios.get('getAvaliacoesProfessoresUsuario')
        professores.value = response.data.professores
        avaliacoes.value = response.data.avaliacoes
    }

    const UpdateAvaliacaoProfessor = async  ($id_avaliacao) => {
        var divAvaliacao = document.getElementById('divAvaliacao'+$id_avaliacao)
        var div = document.getElementById('DivEdidAvaliacao'+$id_avaliacao)
        var st_comentarioEdit = document.getElementById('st_comentarioEdit'+$id_avaliacao).value
        var int_estrelasEdit = document.getElementById('int_estrelasEdit'+$id_avaliacao).value
        var data = {
            "id_avaliacao": $id_avaliacao,
            "st_avaliacao": st_comentarioEdit,
            "int_estrelas": int_estrelasEdit,
        }
        await axios.put("updateAvaliacao", data)
        getAvaliacoesProfessoresUsuario()
        div.classList.toggle('none')
        divAvaliacao.classList.toggle('shadow')
    }
    const EditarAvaliacaoProfessor = async  ($id_avaliacao,$st_avaliacao, $id_estrelas) => {
        var divAvaliacao = document.getElementById('divAvaliacao'+$id_avaliacao)
        var div = document.getElementById('DivEdidAvaliacao'+$id_avaliacao)
        var st_comentarioEdit = document.getElementById('st_comentarioEdit'+$id_avaliacao)
        var int_estrelasEdit = document.getElementById('int_estrelasEdit'+$id_avaliacao)
        console.log(st_comentarioEdit)
        st_comentarioEdit.value = $st_avaliacao
        int_estrelasEdit.value = $id_estrelas
        div.classList.toggle('none')
        divAvaliacao.classList.toggle('shadow')
    }

    const deleteAvaliacaoProfessor = async ($id_avaliacao) => {
        await axios.delete('DeleteAvaliacao/' + $id_avaliacao)
        getAvaliacoesProfessoresUsuario()
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
        deleteAvaliacao,
        deleteAvaliacaoProfessor,
        getDadosAvaliacao,
        EditarAvaliacao,
        UpdadateAvaliacao,
        recarregarPagina,
        buscarProfessores,
        professores,
        avaliacoes,
        abrirModalAvaliacaoProfessor,
        CadastrarAvaliacaoProfessor,
        getAvaliacoesProfessoresUsuario,
        UpdateAvaliacaoProfessor,
        EditarAvaliacaoProfessor

    };
}