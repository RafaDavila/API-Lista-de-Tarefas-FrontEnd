import { useState } from 'react'
import { useNavigate } from 'react-router'
import '../App.css'

const API_URL = import.meta.env.VITE_API_URL

function Home() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setMensagem('')
    setTipoMensagem('')
    setCarregando(true)

    try {
      const response = await fetch(
        `${API_URL}/tasks/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo,
            descricao: descricao || null,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Não foi possível criar a tarefa')
      }

      const respostaTexto = await response.text()

      console.log('Status da resposta:', response.status)
      console.log('Corpo da resposta:', respostaTexto)

        if (!respostaTexto) {
          throw new Error('A API respondeu sem conteúdo')
        }

        const tarefaCriada = JSON.parse(respostaTexto)

        console.log('Tarefa criada:', tarefaCriada)

      setTitulo('')
      setDescricao('')
      setMensagem('Tarefa criada com sucesso!')
      setTipoMensagem('sucesso')
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)

      setMensagem('Erro ao criar a tarefa. Tente novamente.')
      setTipoMensagem('erro')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main>
      <h1>ToDo App</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título da tarefa</label>
        <input
          id="titulo"
          type="text"
          placeholder="Digite o título da tarefa"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          required
          minLength={3}
          maxLength={100}
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          placeholder="Digite uma descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          maxLength={500}
        />

        <button type="submit" disabled={carregando}>
          {carregando ? 'Adicionando...' : 'Adicionar tarefa'}
        </button>

        {mensagem && (
          <p className={`mensagem ${tipoMensagem}`}>
            {mensagem}
          </p>
        )}
      </form>

      <button type="button" onClick={() => navigate('/tasks')}>
        Ver tarefas criadas
      </button>
    </main>
  )
}

export default Home