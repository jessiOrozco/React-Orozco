import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootDOMnode = document.getElementById('root')
const reactRoot = createRoot(rootDOMnode)

reactRoot.render(<App/>)