import TodoList from './components/todoList';
import "./Css/App.css"

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="logoside">
          <h1>Coisas para fazer</h1>
        </div>
      </div>

      <TodoList />
    </div>
  )
}

export default App
