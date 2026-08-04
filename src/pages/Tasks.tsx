import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../App.css'

type Task = {
  id: number
  titulo: string
  descricao: string | null
  concluida: boolean
  data_criacao: string
}

function Tasks() {
  const navigate = useNavigate()

  const [tarefas, setTarefas] = useState<Task[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarTarefas() {
      try {
        const response = await fetch(
          'https://api-lista-de-tarefas-zjn5.onrender.com/tasks/',
        )

        if (!response.ok) {
          throw new Error('Não foi possível buscar as tarefas')
        }

        const dados: Task[] = await response.json()

        setTarefas(dados)
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error)
        setErro('Erro ao carregar as tarefas.')
      } finally {
        setCarregando(false)
      }
    }

    buscarTarefas()
  }, [])

  return (
    <main>
      <h1>Tarefas criadas</h1>

      {carregando && <p>Carregando tarefas...</p>}

      {erro && <p className="mensagem erro">{erro}</p>}

      {!carregando && !erro && tarefas.length === 0 && (
        <p>Nenhuma tarefa foi criada.</p>
      )}

      {!carregando && !erro && tarefas.length > 0 && (
        <section className="lista-tarefas">
          {tarefas.map((tarefa) => (
            <article className="tarefa-card" key={tarefa.id}>
              <h2>{tarefa.titulo}</h2>

              {tarefa.descricao && <p>{tarefa.descricao}</p>}

              <span>
                {tarefa.concluida ? 'Concluída' : 'Pendente'}
              </span>
            </article>
          ))}
        </section>
      )}

      <button type="button" onClick={() => navigate('/')}>
        Voltar para criar tarefa
      </button>
    </main>
  )
}

export default Tasks