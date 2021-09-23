import React from 'react'
import { FormEvent, ChangeEvent } from './ToDoPage'

interface Props {
    input : string
    onCreateTodo : (e: FormEvent) => void
    inputHandler : (e: ChangeEvent) => void
}

const ToDoInput: React.FC<Props> = ({ 
    input, 
    onCreateTodo, 
    inputHandler 
}) => {
    
    return (
        <form id ="todoInput" onSubmit={(e) => onCreateTodo(e)}>
            <div className="inputContainer">
                <input value={input} onChange={inputHandler} placeholder="What are your tasks today?"/>
                <button className="addTask" type="submit">
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </form>
    )
}

export default ToDoInput
