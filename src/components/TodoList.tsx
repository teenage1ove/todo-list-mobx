import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { toast } from 'sonner'
import { Todo } from '../interfaces/todo-interface'
import { useStore } from '../store/root-store-context'
import { TodoListToolbar } from './TodoListToolbar'

export const TodoList = observer(() => {
	const [value, setValue] = useState('')
	const [isEvenSelected, setIsEvenSelected] = useState(false)
	const [isOddSelected, setIsOddSelected] = useState(false)

	const {
		todoListStore: { todos, addTodoItem, removeTodoItem, completeTodoItem },
	} = useStore()

	function handleClickAddItem(value: string, completed?: boolean) {
		addTodoItem(value, completed)
		setValue('')
	}

	function handleClickRemoveItem(fnDelete: () => void, item: 'last' | 'first') {
		fnDelete()
		if (item === 'last') {
			toastDeleteMessage(todos[todos.length - 1])
		} else if (item === 'first') {
			toastDeleteMessage(todos[0])
		}
	}

	function toastDeleteMessage(todo: Todo) {
		toast.success('Todo deleted', {
			richColors: true,
			cancel: {
				label: 'Undo',
				onClick: () => handleClickAddItem(todo.title, todo.completed),
			},
		})
	}

	function handleClickSelectEvenItems() {
		setIsEvenSelected(!isEvenSelected)
	}

	function handleClickSelectOddItems() {
		setIsOddSelected(!isOddSelected)
	}

	return (
		<div className='todolist'>
			<div className='todolist__form'>
				<input
					type='text'
					placeholder='Add an item'
					className='todolist__input'
					value={value}
					onChange={e => setValue(e.target.value)}
					onKeyDown={e => {
						e.key === 'Enter' && handleClickAddItem(value)
					}}
				/>
				<button
					className='todolist__res-button'
					onClick={() => {
						handleClickAddItem(value)
					}}
				>
					Add Item
				</button>
			</div>

			<TodoListToolbar
				handleClickRemoveItem={handleClickRemoveItem}
				handleClickSelectEvenItems={handleClickSelectEvenItems}
				handleClickSelectOddItems={handleClickSelectOddItems}
			/>

			<div
				className={cn('todolist__list', {
					even: isEvenSelected,
					odd: isOddSelected,
				})}
			>
				{todos.map(todo => (
					<div
						key={todo.id}
						className={cn('todolist__list-item', {
							completed: todo.completed && 'green',
						})}
					>
						<div
							className='todolist__list-checkbox'
							onClick={() => completeTodoItem(todo)}
						>
							{todo.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
						</div>

						<p className='todolist__list-text'>{todo.title}</p>
						<IoClose
							className='todolist__list-close'
							onClick={() => {
								removeTodoItem(todo)
								toastDeleteMessage(todo)
							}}
						/>
					</div>
				))}
			</div>
		</div>
	)
})
