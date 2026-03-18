const taskForm = document.getElementById('taskForm');
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const stats = document.getElementById('stats');
        const emptyMessage = document.getElementById('emptyMessage');
        const STORAGE_KEY = 'tarefas-v1';

        let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        function saveTasks() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }

        function render() {
            taskList.innerHTML = '';
            if (tasks.length === 0) {
                emptyMessage.classList.remove('hidden');
                stats.classList.add('hidden');
                return;
            }
            emptyMessage.classList.add('hidden');
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'item';

                const check = document.createElement('button');
                check.className = 'check' + (task.done ? ' checked' : '');
                check.setAttribute('aria-label', task.done ? 'Marcar não concluída' : 'Marcar concluída');
                check.innerHTML = task.done ? '✓' : '';
                check.addEventListener('click', () => {
                    tasks[index].done = !tasks[index].done;
                    saveTasks();
                    render();
                });

                const span = document.createElement('span');
                span.className = 'task-text' + (task.done ? ' done' : '');
                span.textContent = task.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    saveTasks();
                    render();
                });

                li.append(check, span, deleteButton);
                taskList.appendChild(li);
            });

            const completed = tasks.filter(t => t.done).length;
            stats.textContent = `Total: ${tasks.length} | Concluídas: ${completed}`;
            stats.classList.remove('hidden');
        }

        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const text = taskInput.value.trim();
            if (!text) return;
            tasks.unshift({ text, done: false, createdAt: Date.now() });
            taskInput.value = '';
            saveTasks();
            render();
        });

        render();