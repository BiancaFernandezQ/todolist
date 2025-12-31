import { TaskManager } from './components/taskManager.js';
import { UI } from './components/ui.js';
// Al cargar la página
window.onload = () => {
  // Crear una instancia del manader que maneja los datos
  const manager = new TaskManager();
  new UI(manager);
};
