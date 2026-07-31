import './App.css'

function App() {
  return (
    <main>
      <h1>ToDo App</h1>

      <form>
        <label htmlFor="titulo">Título da tarefa</label>
        <input
          id="titulo"
          type="text"
          placeholder="Digite o título da tarefa"
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          placeholder="Digite uma descrição"
        />

        <button type="submit">Adicionar tarefa</button>
      </form>

      <button type="button">Ver tarefas criadas</button>
    </main>
  )
}

export default App