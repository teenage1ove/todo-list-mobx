import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.scss'
import { RootStoreContext } from './store/root-store-context.ts'
import RootStore from './store/root-store.ts'

createRoot(document.getElementById('root')!).render(
	<RootStoreContext.Provider value={new RootStore()}>
		<App />
	</RootStoreContext.Provider>
)
