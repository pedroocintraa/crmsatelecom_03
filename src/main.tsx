import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Importar utilitário de limpeza em desenvolvimento
if (import.meta.env.DEV) {
  // Removido temporariamente - arquivo não existe mais
  // import("./utils/clearTestData");
}

createRoot(document.getElementById("root")!).render(<App />);
