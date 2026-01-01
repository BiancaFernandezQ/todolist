export class UI {
  constructor(tastManager) {
    this.taskManager = tastManager;
    this.editId = null;

    // Elementos de la UI (referencia a los elementos del DOM)
    this.input = document.getElementById('taskInput');
    this.button = document.getElementById('addBtn');
    this.list = document.getElementById('taskList');

    this.filtro = 'todasTareas'; //todasTareas, completadosTareas, pendientesTareas

    //filtros
    this.todasTareas = document.getElementById('todasTareas');
    this.completadosTareas = document.getElementById('completadosTareas');
    this.pendientesTareas = document.getElementById('pendientesTareas');

    //ordenara
    this.ordenarAZ = document.getElementById('ordenarAZ');

    //contadores
    this.cantTotal = document.getElementById('cantTotal');
    this.cantCompletadas = document.getElementById('cantCompletadas');
    this.cantPendientes = document.getElementById('cantPendientes');

    // Eventos
    this.button.addEventListener('click', () => this.addOrSave());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.addOrSave();
    });

    this.todasTareas.addEventListener('click', () => {
      this.filtro = 'todasTareas';
      this.render();
    });

    this.completadosTareas.addEventListener('click', () => {
      this.filtro = 'completadosTareas';
      this.render();
    });

    this.pendientesTareas.addEventListener('click', () => {
      this.filtro = 'pendientesTareas';
      this.render();
    });

    this.ordenarAZ.addEventListener('click', () => {
      this.taskManager.ordenarAZ();
      this.render(); // Re pintar la lista después de ordenar
    });

    this.render();
  }

  // Renderizar Tareas
  render() {
    this.list.innerHTML = '';

    this.contadores();

    let tareas = this.taskManager.getAll();

    if (this.filtro == 'completadosTareas') {
      tareas = tareas.filter(tarea => tarea.completado == true);
    } else if (this.filtro === 'pendientesTareas') {
      tareas = tareas.filter(tarea => tarea.completado == false);
    }

    tareas.forEach((task) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <span class="${task.completado ? 'text-decoration-line-through' : ''}">${task.text}</span>
          <p style="font-size:11px;" class="mb-0 text-muted">Creado en: ${task.fechaCreacion}</p>
        </td>
        <td>
          <span class="badge ${task.completado ? 'text-bg-success': 'text-bg-danger'}"> ${task.completado ? 'Completo😁' : 'Incompleto☹️'}</span>
        </td>
        <td>
          <button class="btn btn-warning btn-sm">Editar</button>
          <button class="btn btn-danger btn-sm">Eliminar</button>
          <button class="btn btn-success btn-sm">${task.completado == true ? 'Desmarcar' : 'Completar'}</button>
        </td>
      `;

      // Eventos de los botones Editar y Eliminar
      tr.querySelector('.btn-warning').onclick = () => this.startEdit(task.id);
      tr.querySelector('.btn-danger').onclick = () => this.deleteTask(task.id);
      tr.querySelector('.btn-success').onclick = () => this.estadoTarea(task.id);

      // Añadir la fila a la tabla
      this.list.appendChild(tr);
    });
  }

  startEdit(id) {
    const task = this.taskManager.getOne(id);
    this.input.value = task.text;
    this.input.focus();
    this.editId = task.id;
    this.button.textContent = 'Guardar cambios';
  }

  addOrSave() {
    const text = this.input.value.trim();
    if (!text) return alert('Escribe una tarea');

    if (this.editId) {
      // Estamos editando
      this.taskManager.update(this.editId, text);
      this.editId = null;
      this.button.textContent = 'Agregar Tarea';
    } else this.taskManager.add(text);

    this.input.value = '';
    this.render();
  }

  deleteTask(id) {
    this.taskManager.remove(id);
    this.render();
  }

  estadoTarea(id) {
    this.taskManager.estado(id);
    this.render();
  }

  contadores() {
    this.cantTotal.innerHTML = `<span class="negrilla">Total: </span> ${this.taskManager.contadorTodasTareas()}`;
    this.cantCompletadas.innerHTML = `<span class="negrilla">Completadas: </span> ${this.taskManager.contadorTareasCompletadas()}`;
    this.cantPendientes.innerHTML = `<span class="negrilla">Pendientes: </span> ${this.taskManager.contadorTareasPendientes()}`;
  }
}