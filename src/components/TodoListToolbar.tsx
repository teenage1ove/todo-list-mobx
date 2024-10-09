import { useStore } from '../store/root-store-context'

interface Props {
	handleClickRemoveItem: (fnDelete: () => void, item: 'last' | 'first') => void
	handleClickSelectEvenItems: () => void
	handleClickSelectOddItems: () => void
}

export function TodoListToolbar({
	handleClickRemoveItem,
	handleClickSelectEvenItems,
	handleClickSelectOddItems,
}: Props) {
	const {
		todoListStore: { deleteFirstItem, deleteLastItem },
	} = useStore()

	return (
		<div className='todolist__toolbar'>
			<button onClick={() => handleClickRemoveItem(deleteFirstItem, 'first')}>
				Delete first item
			</button>
			<button onClick={() => handleClickRemoveItem(deleteLastItem, 'last')}>
				Delete last item
			</button>
			<button onClick={handleClickSelectEvenItems}>Select even items</button>
			{/*четные*/}
			<button onClick={handleClickSelectOddItems}>Select odd items</button>
			{/*нечетные*/}
		</div>
	)
}
