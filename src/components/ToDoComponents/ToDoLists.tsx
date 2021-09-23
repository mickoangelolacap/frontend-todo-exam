import React from 'react'
import { ChangeEvent } from './ToDoPage'
import {Todo} from "../../models/todo";
import TodoItem from './ToDoItem'

export interface Props {
    showTodos : Todo[]
    todoEditing : string | null
    updatingTodo : string
    setTodoEditing : (e: string | null) => void
    setUpdatingTodo : (e : string) => void
    onUpdateTodoStatus : (e: ChangeEvent, todoId : string) => void
    onUpdateTodo : (todoId : string) => void
    onDeleteTodo : (todoId : string) => void

}

const ToDoLists: React.FC<Props> = ({ 
    showTodos, 
    todoEditing, 
    updatingTodo, 
    setTodoEditing, 
    setUpdatingTodo, 
    onUpdateTodoStatus, 
    onUpdateTodo, 
    onDeleteTodo 
}) => {

    return (
        <div id="todoList">
            <div className="noteContainer">
                <i className="note">Double-click to edit task</i>
            </div>
            {
                showTodos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            todoEditing={todoEditing}
                            updatingTodo={updatingTodo}
                            setTodoEditing={setTodoEditing}
                            setUpdatingTodo={setUpdatingTodo}
                            onUpdateTodoStatus={onUpdateTodoStatus}
                            onUpdateTodo={onUpdateTodo}
                            onDeleteTodo ={onDeleteTodo}
                        />
                    );
                })
            }
        </div>
    )
}

export default ToDoLists
