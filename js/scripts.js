/**
 * En esta clase se encarga de almacenar el texto de una tarea que se realiza y con el se muestra si se ha realizado o no
 * @class
 * @param {string}text Aqui se almacena el texto de la tarea que se va a realizar 
 * @param {boolean}completed Aqui se almacena un boolean el cual muestra si se ha realizado la tarea o no
 */
class Task {
    constructor(text) {
        this.text = text;
        this.completed = false;
    }
}

/**
 * Clase que gestiona las tareas, permite añadir, eliminar y actualizar el estado de las tareas
 * @class
 */
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    /**
     * @class addTask Se añade una tarea a la lista de tareas la cual almacena su texto y se almacena en la base de datos de el navegador de forma local 
     * @param {string} text -Es el texto el cual almacena la informacion de la tarea 
     */
    addTask(text) {
        const task = new Task(text);
        this.tasks.push(task);
        this.updateLocalStorage();
    }

    /**
     * @class  Elimina la tarea que se introduce mediante el id de la tarea, tras eso se actualiza el localStorage
     * @param {number} index - El índice de la tarea a eliminar
     */
    removeTask(index) {
        this.tasks.splice(index, 1);
        this.updateLocalStorage();
    }

    /**
     * @class se encarga de cambiar el estado de la tarea es decir pone el contrario de el estado el que esta, pasa de true a false y viceversaa
     * @param {number} index - Id de la tarea que se modifica su estado
     */
    toggleTaskCompleted(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.updateLocalStorage();
    }

    /**
     * @class Se encarga de actualizar la base de datos de las tareas con las nuevas tareas ya modificadas
     */
    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    /**
     * @param getTasks  Devuelve las tareas que se almacenan en el array
     * @returns {Array} -Lista de tareas 
     */
    getTasks() {
        return this.tasks;
    }
}
/**
 * @param taskManager Crea una nueva instancia del objeto TaskManager y la asigna a la constante taskManager
 */

const taskManager = new TaskManager();

/**
 * @param taskInput Seleccionan el id atraves del DOM introducido en el elemento con id taskInput
 * @param text Coge el contenido de taskInput 
 * @param taskManager Crea una nueva instancia del objeto TaskManager y la asigna a la constante taskManager y añade la funcion addtask con el texto de la tarea a realizar
 * @param taskInput Añade en el valor de el id del DOM como vacio 
 * @function renderTasks Renderiza lo cambios hechos 
 */
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        taskManager.addTask(text);
        taskInput.value = '';
        renderTasks();
    }
}

/**
 * @function deleteTaskFunción para eliminar una tarea
 * @param {number} index - El índice de la tarea a eliminar
 */
function deleteTask(index) {
    taskManager.removeTask(index);
    renderTasks();
}

/**
 * @function renderTasks   Funcion la cual se encarga atraves de DOM que los botones hagan sus funcines recupera las tareas del `taskManager` y genera elementos HTML para mostrarlas y los agrega al elemento con id 'taskList' en el DOM.
*/
function renderTasks() {

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    // Iterar sobre todas las tareas almacenadas en taskManager
    taskManager.getTasks().forEach((task, index) => {
        /**
         * Crea en el HTML un elemento li
         * @constant taskEl
         */
        const taskEl = document.createElement('li');

        /**
         *  Constante la cual crea un elemento de html
         * @constant taskText
         */
        const taskText = document.createElement('span');
        taskText.textContent = task.text; // Asignar el texto de la tarea al elemento de texto

        taskText.style.flexGrow = '1';//  Establecer flex-grow para permitir que el texto se expanda
        if (task.completed) {
            taskText.style.textDecoration = 'line-through'; // Aplicar línea a través del texto si la tarea está completada
        }

        /**
         * constante la cual almacena un botón HTML para borrar la tarea.
         * @param deleteBtn 
         */
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar'; ón
        deleteBtn.onclick = () => deleteTask(index); 
        deleteBtn.style.marginLeft = '10px'; 
        deleteBtn.classList.add('buttonB'); 
        /**
        *
        */
        taskEl.appendChild(taskText);
        taskEl.appendChild(deleteBtn);
        /**
         * Hereda de taskEL
        *@constant taskList
        */
        taskList.appendChild(taskEl);
    });
}

/**
 * 
 * @param {number} index Función que cambia el estado  de una tarea
 */
function toggleTaskCompleted(index) {
    taskManager.toggleTaskCompleted(index);
    renderTasks();
}

/**
 * @function addTaskBtnClickListener Función que se encarga de manejar el evento de clic en el botón de añadir tarea
 * @param {Event} event - El evento de clic en el botón
 * @callback addTaskBtnClickListener
 */
function addTaskBtnClickListener(event) {
    addTask();
    renderTasks();
}

/**
 * @param setupTaskButton Función que inicializa la funcionalidad del botón de agregar tarea.
 */
function setupTaskButton() {
    /**
     * Crea una funcion la cual al presionarla crea un boton 
     * @constant addButton 
     */

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Task';

    addButton.onclick = function() {
        addTaskBtnClickListener();
    };

    document.querySelector('.content').appendChild(addButton);
}

setupTaskButton();
