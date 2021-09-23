import React from 'react'
import {isTodoCompleted} from '../../utils';
import { ChangeEvent } from './ToDoPage'
import {Todo} from "../../models/todo";

interface secondProps {
    todo : Todo
    todoEditing : string | null
    updatingTodo : string
    setTodoEditing : (e: string | null) => void
    setUpdatingTodo : (e : string) => void
    onUpdateTodoStatus : (e: ChangeEvent, todoId : string) => void
    onUpdateTodo : (todoId : string) => void
    onDeleteTodo : (todoId : string) => void
}

const ToDoItem: React.FC<secondProps> = ({
    todo,
    todoEditing, 
    updatingTodo, 
    setTodoEditing, 
    setUpdatingTodo, 
    onUpdateTodoStatus, 
    onUpdateTodo, 
    onDeleteTodo
}) => {

    return (
        <div key={todo.id} className="todoItem">
            <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            {/* Edit Todo */}
            {
                todoEditing === todo.id ? 
                (
                <div className="editTodoItem">
                    <input
                        type="text"
                        placeholder={todo.content}
                        value={updatingTodo}
                        onChange={(e) => setUpdatingTodo(e.target.value)}
                    />
                    <button className="submitEdit" onClick={() => onUpdateTodo(todo.id)}>
                        <i className="fas fa-check"></i>
                    </button>
                    <button className="cancelEdit" onClick={() => setTodoEditing(null)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                ) 
                : 
                (<span className="todoSpan" onDoubleClick={() => setTodoEditing(todo.id)}>{todo.content}</span>)
            }
            <button className="deleteTask" onClick={() => onDeleteTodo(todo.id)}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    )
}

export default ToDoItem
