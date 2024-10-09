import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { Todo } from '../interfaces/todo-interface'

class TodoListStore {
	todos: Todo[] = [
		{
			id: uuidv4(),
			title: 'Test TODO',
			completed: false,
		},
	]
	constructor() {
		makeAutoObservable(this)
	}

	addTodoItem = (value: string, completed?: boolean) => {
		if (!value) return
		this.todos.push({
			id: uuidv4(),
			title: value,
			completed: completed || false,
		})
	}

	removeTodoItem = (todo: Todo) => {
		this.todos = this.todos.filter(item => item !== todo)
	}

	completeTodoItem = (todo: Todo) => {
		todo.completed = !todo.completed

		let it = this.todos.splice(this.todos.indexOf(todo), 1)
		if (todo.completed === false) {
			return this.todos.unshift(todo)
		}
		this.todos.push(it[0])
	}

	deleteFirstItem = () => {
		this.todos = this.todos.slice(1)
	}

	deleteLastItem = () => {
		this.todos = this.todos.slice(0, -1)
	}
}

export default new TodoListStore()
