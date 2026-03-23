import { createRoot } from 'react-dom/client';
import './index.css';
import GlobalProvider from './utils/GlobalProvider';

createRoot(document.getElementById('root')).render(<GlobalProvider />);
