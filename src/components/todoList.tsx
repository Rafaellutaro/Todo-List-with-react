import React, { useState } from 'react'
import type { todoTypes } from '../todo'
import todoService from '../todoService'
import { FaEdit, FaCheck} from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const todoList = () => {

  const [todos, setTodos] = useState<todoTypes []>(todoService.getTodos());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  // functions to handle edit actions will go here

  const editStart = (id: number, text: string) => {
    setEditingId(id);
    setNewTitle(text);
  }

  const editCancel = () => {
    setEditingId(null);
    setNewTitle("");
  }

  const editSave = (id: number) => {
    if (newTitle.trim() !== "") {
      const saveChanges = todoService.updateTodo({
        id,
        title: newTitle,
        completed: false
      });

      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id == id ? saveChanges : todo)));

      setEditingId(null);
      setNewTitle("");
    }
  }

  const deleteTodo = (id: number) => {
    todoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className='todoContainer'>
      
    <div>
      {/* todo input from component goes here */}
    </div>
    
    {todos.map((todo) => (
      <div className="items" key={todo.id}>
        {editingId  ==  todo.id ? (
          <div className="editedText">

            <input type="text"  value={newTitle} onChange={(e) => setNewTitle (e.target.value)} autoFocus={true} />
            <button onClick={() => editSave(todo.id)}>
              <FaCheck />
            </button>

            <button className='cancelBtn' onClick={() => editCancel()}>
              <GiCancel />
            </button>
          </div>
        ) : (
          <div className="editBtn">
            <span>{todo.title}</span>
            <button onClick={() => editStart(todo.id, todo.title)}>
              <FaEdit />
            </button>
          </div>
        )}

        <button onClick={() => deleteTodo(todo.id)}>
          <RiDeleteBin5Fill/>
        </button>
      </div>
    ))}

    </div>
  )
};

export default todoList;
