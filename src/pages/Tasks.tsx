import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../App.css'
import { Check, RotateCcw, Trash2 } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL

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
          `${API_URL}/tasks/`,
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

  async function alternarConclusao(tarefa: Task) {
    try {
      const response = await fetch(
        `${API_URL}/tasks/${tarefa.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            concluida: !tarefa.concluida,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Não foi possível atualizar a tarefa')
      }

      const tarefaAtualizada: Task = await response.json()

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((item) =>
          item.id === tarefaAtualizada.id ? tarefaAtualizada : item,
        ),
      )
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
      setErro('Erro ao atualizar a tarefa.')
    }
  }

  async function excluirTarefa(id: number) {
    const confirmarExclusao = window.confirm(
      'Tem certeza de que deseja excluir esta tarefa?',
    )

    if (!confirmarExclusao) {
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        throw new Error('Não foi possível excluir a tarefa')
      }

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa.id !== id),
      )
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error)
      setErro('Erro ao excluir a tarefa.')
    }
  }

  function formatarData(data: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(data))
}

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

              <p className="data-criacao">
                Criada em {formatarData(tarefa.data_criacao)}
              </p>

              <div className="tarefa-rodape">
                <span className={tarefa.concluida ? 'status concluida' : 'status pendente'}>
                  {tarefa.concluida ? 'Concluída' : 'Pendente'}
                </span>
                <div className="tarefa-acoes">
                  <button
                    type="button"
                    className="botao-concluir"
                    onClick={() => alternarConclusao(tarefa)}
                    aria-label={tarefa.concluida ? 'Reabrir tarefa' : 'Concluir tarefa'}
                    title={tarefa.concluida ? 'Reabrir tarefa' : 'Concluir tarefa'}
                  >
                    {tarefa.concluida ? <RotateCcw size={18} /> : <Check size={18} />}
                  </button>

                  <button
                    type="button"
                    className="botao-excluir"
                    onClick={() => excluirTarefa(tarefa.id)}
                    aria-label="Excluir tarefa"
                    title="Excluir tarefa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
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