import {ref} from "vue"
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default function useAuthenticationController() {
    const departamentos = ref([]);
    const disciplinas = ref([]);
    const turmas = ref([]);
    const idTurmas = ref([]);
    const professores = ref([]);
    const avaliacoes = ref([]);

    /**
     * Função responsavel por filtrar as turmas conforme o filtro que é selecionado pelo aluno
     * @param data
     * @returns {Promise<void>}
     */
    const buscarTurmas = async (data) => {
        console.log(data)
        const response = await axios.post('filtrarTurmas', data)
        turmas.value = response.data.turmas
        idTurmas.value = response.data.id_turmas
        console.log(turmas,idTurmas)
    }

    /**
     * @returns {Promise<void>}
     */
    const getDepartamentos = async () => {
        const response = await axios.get("getAllDepartamento")
        departamentos.value = response.data.departamentos
    }

    /**
     * Função responsável por cadastrar uma denuncia de uma turma no banco de dados
     * @param $id_avaliacao
     * @returns {Promise<void>}
     */
    const denunciar = async ($id_avaliacao) => {
        let usuarioLogado = localStorage.getItem('usuario');
        let usuario = JSON.parse(usuarioLogado)
        await axios.post('denunciarAvaliacao/' + $id_avaliacao + '/' + usuario.id)
        var buscarDisciplina = document.getElementById('buscarDisciplina')
        buscarDisciplina.click()
        console.log('denuncia cadastrada com sucesso')
    }

    /**
     *
     * @param $id_avaliacao
     * @returns {Promise<void>}
     */
    const denunciarProfessor = async ($id_avaliacao) => {
        console.log($id_avaliacao)
        let usuarioLogado = localStorage.getItem('usuario');
        let usuario = JSON.parse(usuarioLogado)
        await axios.post('denunciarAvaliacao/' + $id_avaliacao + '/' + usuario.id)
        buscarProfessores()
    }

    /**
     * Busca disciplinas no banco levando em consideração o filtro de departamento
     * @returns {Promise<void>}
     */
    const getDisciplinas = async () => {
        var select = document.getElementById('id_codDepartamento')
        var value = select.options[select.selectedIndex].value;
        const response = await axios.get("getDisciplinas/" + value)
        disciplinas.value = response.data.disciplinas
    }

    /**
     * Responsável por abrir os modais de criação de avaliação de turma
     * @param $id_turma
     * @returns {Promise<void>}
     * @constructor
     */
    const AbrirModal = async ($id_turma) => {
        var div = document.getElementById($id_turma)
        div.classList.toggle('none')
        div.classList.toggle('shadow')
    }

    /**
     * Cadastra uma nova Avaliação no banco de dados
     * @param $id_turma
     * @returns {Promise<void>}
     * @constructor
     */
    const CadastrarAvaliacao = async ($id_turma) => {
        var st_avaliacaoEditar = document.getElementById('st_avaliacao' + $id_turma)
        var int_estrelasEditar = document.getElementById('int_estrelas' + $id_turma)
        var data = {
            "id_turma": $id_turma,
            "st_avaliacao": st_avaliacaoEditar.value,
            "int_estrelas": int_estrelasEditar.value,
        }
        let usuarioLogado = localStorage.getItem('usuario');
        let usuario = JSON.parse(usuarioLogado)
        await axios.post("criarAvaliacao/" + usuario.id, data)
        st_avaliacaoEditar.value = ''
        int_estrelasEditar.value = ''
        var buscarDisciplina = document.getElementById('buscarDisciplina')
        buscarDisciplina.click()
        AbrirModal($id_turma)

    }

    /**
     * Recupera as avaliações realizadas pelo usuário logado
     * @returns {Promise<void>}
     */
    const getAvaliacoesUsuario = async () => {
        let usuarioLogado = localStorage.getItem('usuario');
        let usuario = JSON.parse(usuarioLogado)
        const response = await axios.get('getAvaliacoesUsuario/' + usuario.id)
        turmas.value = response.data.turmas
        idTurmas.value = response.data.id_turmas
    }

    /**
     * @param $id_avaliacao
     * @returns {Promise<void>}
     */
    const deleteAvaliacao = async ($id_avaliacao) => {
        await axios.delete('DeleteAvaliacao/' + $id_avaliacao)
        getAvaliacoesUsuario()
    }

    /**
     * Responsável por abrir a modal de edição de avaliação e deixar os campos pré-preenchidos
     * @param $id_avaliacao
     * @param $st_avaliacao
     * @param $int_estrelas
     * @returns {Promise<void>}
     * @constructor
     */
    const EditarAvaliacao = async ($id_avaliacao, $st_avaliacao, $int_estrelas) => {
        var div = document.getElementById('DivEdidAvaliacao' + $id_avaliacao)
        div.classList.toggle('none')
        div.classList.toggle('shadow')
        document.getElementById('st_avaliacaoEditar' + $id_avaliacao).value = $st_avaliacao
        document.getElementById('int_estrelasEditar' + $id_avaliacao).value = $int_estrelas
    }

    /**
     * Responsável por atualizar o banco de dados com os novos dados da avaliação
     * @param $id_avaliacao
     * @returns {Promise<void>}
     * @constructor
     */
    const UpdadateAvaliacao = async ($id_avaliacao) => {

        var st_avaliacaoEditar = document.getElementById('st_avaliacaoEditar' + $id_avaliacao).value
        var int_estrelasEditar = document.getElementById('int_estrelasEditar' + $id_avaliacao).value
        var data = {
            "id_avaliacao": $id_avaliacao,
            "st_avaliacao": st_avaliacaoEditar,
            "int_estrelas": int_estrelasEditar,
        }
        await axios.put("updateAvaliacao", data)
        getAvaliacoesUsuario()
        var div = document.getElementById('DivEdidAvaliacao' + $id_avaliacao)
        div.classList.toggle('none')
        div.classList.toggle('shadow')
    }

    /**
     * Busca os professores pelo departamento selecionado
     * @returns {Promise<void>}
     */
    const buscarProfessores = async () => {
        var id_departamento = document.getElementById('id_codDepartamento').value
        console.log(id_departamento)
        const response = await axios.get('getProfessores/' + id_departamento)
        professores.value = response.data.professores
        avaliacoes.value = response.data.avaliacoes
    }

    /**
     * @param $id_professor
     * @returns {Promise<void>}
     */
    const abrirModalAvaliacaoProfessor = async ($id_professor) => {
        var documento = document.getElementById($id_professor)
        documento.classList.toggle('none')
        documento.classList.toggle('shadow')
    }

    /**
     * Cadastra uma nova avaliação para o professor
     * @param $id_professor
     * @returns {Promise<void>}
     * @constructor
     */
    const CadastrarAvaliacaoProfessor = async ($id_professor) => {
        var st_avaliacao = document.getElementById('st_comentário' + $id_professor)
        var int_estrelas = document.getElementById('int_estrelas' + $id_professor)
        var data = {
            "id_professor": $id_professor,
            "st_avaliacao": st_avaliacao.value,
            "int_estrelas": int_estrelas.value,
        }
        let usuarioLogado = localStorage.getItem('usuario');
        let usuario = JSON.parse(usuarioLogado)
        await axios.post("criarAvaliacaoProfessor/" + usuario.id, data)
        buscarProfessores()
        abrirModalAvaliacaoProfessor($id_professor)
        st_avaliacao.value = ''
        int_estrelas.value = ''
    }

    /**
     * Recupera as avaliações de professores realizadas pelo usuario
     * @returns {Promise<void>}
     */
    const getAvaliacoesProfessoresUsuario = async () => {
        let usuarioLogado = localStorage.getItem('usuario');
        let usuario = JSON.parse(usuarioLogado)
        const response = await axios.get('getAvaliacoesProfessoresUsuario/' + usuario.id)
        professores.value = response.data.professores
        avaliacoes.value = response.data.avaliacoes
    }

    /**
     * Atualiza o avaliação do professor
     * @param $id_avaliacao
     * @returns {Promise<void>}
     * @constructor
     */
    const UpdateAvaliacaoProfessor = async ($id_avaliacao) => {
        var divAvaliacao = document.getElementById('divAvaliacao' + $id_avaliacao)
        var div = document.getElementById('DivEdidAvaliacao' + $id_avaliacao)
        var st_comentarioEdit = document.getElementById('st_comentarioEdit' + $id_avaliacao).value
        var int_estrelasEdit = document.getElementById('int_estrelasEdit' + $id_avaliacao).value
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

    /**
     * Responsável por abrir a div de edição de avaliação de professor e pre-preencher os campos
     * @param $id_avaliacao
     * @param $st_avaliacao
     * @param $id_estrelas
     * @returns {Promise<void>}
     * @constructor
     */
    const EditarAvaliacaoProfessor = async ($id_avaliacao, $st_avaliacao, $id_estrelas) => {
        var divAvaliacao = document.getElementById('divAvaliacao' + $id_avaliacao)
        var div = document.getElementById('DivEdidAvaliacao' + $id_avaliacao)
        var st_comentarioEdit = document.getElementById('st_comentarioEdit' + $id_avaliacao)
        var int_estrelasEdit = document.getElementById('int_estrelasEdit' + $id_avaliacao)
        console.log(st_comentarioEdit)
        st_comentarioEdit.value = $st_avaliacao
        int_estrelasEdit.value = $id_estrelas
        div.classList.toggle('none')
        divAvaliacao.classList.toggle('shadow')
    }

    /**
     * @param $id_avaliacao
     * @returns {Promise<void>}
     */
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
        EditarAvaliacao,
        UpdadateAvaliacao,
        buscarProfessores,
        professores,
        avaliacoes,
        abrirModalAvaliacaoProfessor,
        denunciarProfessor,
        CadastrarAvaliacaoProfessor,
        getAvaliacoesProfessoresUsuario,
        UpdateAvaliacaoProfessor,
        EditarAvaliacaoProfessor,
        denunciar
    };
}