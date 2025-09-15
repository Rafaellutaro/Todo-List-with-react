import type { todoTypes } from "./todo";

const LOCAL_STORAGE_KEY = "todos";

const todoService = {

    // Get all todos from local storage
    getTodos: (): todoTypes[] => {
        const todosStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todosStr ? JSON.parse(todosStr) : [];
    },

    // Save todos to local storage
    addTodos: (text: string): todoTypes => {
        const todos = todoService.getTodos();
        const newTodo: todoTypes = {id: todos.length + 1, title: text, completed: false};
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        return newTodo;
    },

    // Update a todo in local storage

    updateTodo: (updatedTodo: todoTypes): todoTypes => {
        const todos = todoService.getTodos();
        const updateTodos = todos.map((t) => t.id == updatedTodo.id ? updatedTodo : t);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return updatedTodo;

    },

    //Delete a todo from local storage

    deleteTodo: (id: number): void => {
        const todos = todoService.getTodos();
        const filteredTodos = todos.filter((t) => t.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTodos));
    }
};

export default todoService;