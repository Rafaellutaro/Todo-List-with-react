import React, { useState } from 'react'
import type { Dispatch, SetStateAction } from "react"
import todoService from '../todoService'
import type { todoTypes } from '../todo'
import "../Css/TodoForm.css"


interface  propTypes {
    setTodos: Dispatch<SetStateAction<todoTypes []>>
}

const todoForm: React.FC<propTypes> = ({ setTodos }) => {

    const [newTitle, setNewTitle] = useState<string>("");

    const addTodo = () => {
        if (newTitle.trim() !== "") {
            const newTodo = todoService.addTodos(newTitle);
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTitle("");
        }
    };

    return (
        <div className='inputForm'>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus={true}
                placeholder="Tarefa"
            />
            <button onClick={addTodo}>Adicionar Tarefa</button>
        </div>
    );
}

export default todoForm;
