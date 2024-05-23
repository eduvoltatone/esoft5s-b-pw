const taskKey = '@tasks'

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = taskId
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      <button class="editButton" onclick="openEditDialog(${taskId})" title="Editar tarefa">✏️</button>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

// Função para abrir o diálogo de edição
function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const task = tasks.find(task => task.id === taskId)

  if (task) {
    const dialog = document.createElement('dialog')
    dialog.innerHTML = `
      <form id="editForm" onsubmit="saveEditedTask(${taskId}, event)">
        <input type="text" name="title" value="${task.title}" required />
        <textarea name="description" required>${task.description}</textarea>
        <button type="submit">Editar</button>
        <button type="button" onclick="closeEditDialog()">Cancelar</button>
      </form>
    `
    document.body.appendChild(dialog)
    dialog.showModal()
  }
}

// Função para fechar o diálogo de edição
function closeEditDialog() {
  const dialog = document.querySelector('dialog')
  if (dialog) {
    dialog.close()
    dialog.remove()
  }
}

// Função para salvar a tarefa editada
function saveEditedTask(taskId, event) {
  event.preventDefault()
  const form = event.target
  const formData = new FormData(form)
  const editedTitle = formData.get('title')
  const editedDescription = formData.get('description')

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const editedTasks = tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, title: editedTitle, description: editedDescription }
    }
    return task
  })

  localStorage.setItem(taskKey, JSON.stringify(editedTasks))
  updateTaskList(editedTasks)
  closeEditDialog()
}

// Atualizar lista de tarefas após edição
function updateTaskList(tasks) {
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map(task => `
      <li id="${task.id}">
        <h2>${task.title}</h2>
        <p>${task.description}</p>
        <button class="editButton" onclick="openEditDialog(${task.id})" title="Editar tarefa">✏️</button>
      </li>
    `)
    .join('')
}
