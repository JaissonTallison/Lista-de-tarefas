// Array para armazenar as tarefas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adicionar nova tarefa
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text === '') return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
    input.focus();
}

// Renderizar a lista de tarefas
function renderTasks() {
    const container = document.getElementById('tasksContainer');

    if (tasks.length === 0) {
        container.innerHTML = '<div class="empty">Nenhuma tarefa adicionada. Comece agora!</div>';
        return;
    }

    container.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
        `;
        
        container.appendChild(taskElement);
    });
}

// Alternar entre concluída/não concluída
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    saveTasks();
    renderTasks();
}

// Deletar tarefa
function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}

// Adicionar tarefa com Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Carregar tarefas quando a página abrir
renderTasks();