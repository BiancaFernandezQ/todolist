// Clase que se encarga de manejar los datos de las tareas
//const sTasks = 'tasks'
export class TaskManager {
  // Constructor inicializa las tareas y carga las tareas guardadas
  constructor() {
    this.tasks = []; //Array que fuarda las tareas (que son objetos) en memoria
    this.load(); // Carga las tareas
  }

  // Cargas lar tareas guardadas del localStorage
  load() {
    const saved = localStorage.getItem('tasks');
    this.tasks = saved ? JSON.parse(saved) : []
  }

  // Guardar las tareas actuales en localStorage
  save() {
    const tasks = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasks);
  }

  // Agregar una nueva tarea
  add(text) {
    const newTask = {
      id: Date.now(),
      text,
      completado: false,
      fechaCreacion: new Date().toLocaleDateString(),
    };
    this.tasks.push(newTask); // Añadir la nueva tarea al array
    this.save();
    //mostrar todas las tareas del array newTask
    console.log(this.tasks);
  }

  // Actualizar una tarea
  update(id, text) {
    const task = this.tasks.find((t) => t.id === id); // Buscar tarea
    if (task) {
      task.text = text;
      this.save();
    }
  }

  // Eliminar tarea
  remove(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.save();
  }

  // Obtener todas las tareas
  getAll() {
    return this.tasks;
  }

  // Obtener una tarea por su id
  getOne(id) {
    return this.tasks.find((t) => t.id === id); // Buscar tarea
  }

  // Marcar tarea como completada o no y guardarla
  estado(id) {
    const task = this.tasks.find((t) => t.id === id); // Buscar tarea
    if (task.completado == false) {
      task.completado = true;
      this.save();
    } else {
      task.completado = false;
      this.save();
    }
  }

  //Contar las tareas totales, completadas y pendientes
  contadorTodasTareas() {
    let tareas = this.getAll(); //tareas totales
    let todasTareas = tareas.length;
    return todasTareas;
  }

  contadorTareasCompletadas() {
    let tareas = this.getAll();
    let tareasCompletadas = 0;
    for (let i = 0; i < tareas.length; i++) {
      if (tareas[i].completado == true) {
        tareasCompletadas = tareasCompletadas + 1;
      }
    }
    return tareasCompletadas;
  }

  contadorTareasPendientes() {
    let tareas = this.getAll();
    let tareasPendientes = 0;
    for (let i = 0; i < tareas.length; i++) {
      if (tareas[i].completado == false) {
        tareasPendientes = tareasPendientes + 1;
      }
    }
    return tareasPendientes;
  }

  ordenarAZ() {
    for (let i = 0; i < this.tasks.length - 1; i++) {
      for (let j = i + 1; j < this.tasks.length; j++) {
        if (this.tasks[i].text.toLowerCase() > this.tasks[j].text.toLowerCase()) { //mayor que el siguiente cambio
          let temporal = this.tasks[i];
          this.tasks[i] = this.tasks[j];
          this.tasks[j] = temporal;
        }
      }
    }
    console.log(this.tasks);
    return this.tasks;
  }
}