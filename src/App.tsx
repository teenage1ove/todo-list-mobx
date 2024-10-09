import { Toaster } from 'sonner'
import { TodoList } from './components/TodoList'

export function App() {
	return (
		<div className='app'>
			<h1 className='app__title'>My ToDo List</h1>
			<TodoList />
			<Toaster />
		</div>
	)
}
