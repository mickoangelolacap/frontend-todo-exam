import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        return []
    }
}

// save todos to local storage
export const saveLocalTodos = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// retrive todos from local storage
export const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]))
    } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos") || '[]')
        return todoLocal
    }
}

export default new ApiFrontend();