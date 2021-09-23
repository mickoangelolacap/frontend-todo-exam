import React, {useEffect, useReducer, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import reducer, {initialState} from '../../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo,
} from '../../store/actions';
import Service from '../../service';
import {TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';
// import functions for saving and retrieving todos from local storage
import { saveLocalTodos, getLocalTodos } from '../../service/api-frontend'
// import todo components
import ToDoInput from './ToDoInput'
import ToDoLists from './ToDoLists'


type EnhanceTodoStatus = TodoStatus | string | 'ALL';
export type FormEvent = React.FormEvent<HTMLFormElement>
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>


const ToDoPage = ({history}: RouteComponentProps) => {

    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    // replaced this code with a useState as the inputhandler
    // const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState<string>('')
    // Added for Update Todo
    const [todoEditing, setTodoEditing] = useState<string | null>(null)
    const [updatingTodo, setUpdatingTodo] = useState<string>('')


    // retrive todos from local storage
    useEffect(() => {
        const localTodos = getLocalTodos();
        const run = async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(localTodos || resp));
        }
        run()
    },[])
    // save todos to local storage
    useEffect(() => {
        saveLocalTodos(todos);
    })


    // Added todo input handler
    const inputHandler = (e: ChangeEvent) => {
        setInput(e.target.value)
    }
    // Add Todo
    const onCreateTodo = async (e: FormEvent) => {
        if (input) {
            e.preventDefault()
            const resp = await Service.createTodo(input)
            dispatch(createTodo(resp))
            setInput('')
            setShowing('ALL')
        } else {
            e.preventDefault()
            return
        }
    }
    // Added for Update Todo
    const onUpdateTodo = (todoId: string) => {
        dispatch(updateTodo(todoId, updatingTodo))
        setUpdatingTodo('')
        setTodoEditing(null)
    }

    const onUpdateTodoStatus = (e: ChangeEvent, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: ChangeEvent) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }
    // change status
    const statusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowing(e.target.value)
    }

    const showTodos = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    // EXTRA feature - time and date
    const [timeDate, setTimeDate] = useState(new Date())
    let time = timeDate.toLocaleTimeString('en', { hour: 'numeric', hour12: true, minute: 'numeric' });
    let date = timeDate.toDateString();
    let timeHours = timeDate.getHours()
    let userName = localStorage.getItem("userName")
    let greetings = `Good ${(timeHours < 12 && 'Morning') || (timeHours < 17 && 'Afternoon') || 'Evening'}, ${userName}`
    useEffect(() => {
        let timer = setInterval(() => setTimeDate(new Date()), 1000)
        return () => {clearInterval(timer)}
    },[])

    return (
        <section id="todoPage">
            <div className="container">
                <div className="timeDateContainer">
                    <h1 className="time">{time}</h1>
                    <h2 className="greetings">{greetings}</h2>
                    <i className="date">{date}</i>
                </div>
                <ToDoInput 
                    input={input} 
                    onCreateTodo={onCreateTodo} 
                    inputHandler={inputHandler}
                />
                <ToDoLists
                    showTodos={showTodos}
                    todoEditing={todoEditing}
                    setTodoEditing={setTodoEditing}
                    updatingTodo={updatingTodo}
                    setUpdatingTodo={setUpdatingTodo}
                    onUpdateTodoStatus={onUpdateTodoStatus}
                    onUpdateTodo={onUpdateTodo}
                    onDeleteTodo={onDeleteTodo}
                />
                <div id="todoToolbar">
                    {todos.length > 0 ?
                        <div className="toolBarShow">
                            <div className="checkStatusContainer">
                                    <input
                                        type="checkbox"
                                        checked={activeTodos === 0}
                                        onChange={onToggleAllTodo}
                                    />
                                <select name="status" onChange={statusHandler} value={showing} className="statusSelector">
                                    <option value='ALL'>All</option>
                                    <option value={TodoStatus.ACTIVE}>Active</option>
                                    <option value={TodoStatus.COMPLETED}>Completed</option>
                                </select>
                            </div>
                            <button className="clearTasks" onClick={onDeleteAllTodo}>
                                Delete All
                            </button>
                        </div>
                        : 
                        ''
                    }
                </div>
            </div>
        </section>
    );
};

export default ToDoPage;