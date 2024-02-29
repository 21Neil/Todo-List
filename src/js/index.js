import todo from "./todo"
import project from "./project"

export default function index() {
  const todoList = todo.getTodoList

  const addBtn = document.querySelector('#add')
  addBtn.addEventListener('click', () => {
    todo.addItem('work', 'develope todo list', null, 0, null);
    console.log(todoList)
    localStorage.todoList = JSON.stringify(todoList)
  })
  
  const deleteBtn = document.querySelector('#delete')
  deleteBtn.addEventListener('click', () => {
    todo.deleteItem(Object.keys(todoList)[0])
    console.log(todoList)
    localStorage.todoList = JSON.stringify(todoList)
  })

  const changeBtn = document.querySelector('#change')
  changeBtn.addEventListener('click', () => {
    todo.changeItem(Object.keys(todoList)[0], 'changeA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', null, 0, null)
    console.log(todoList)
    localStorage.todoList = JSON.stringify(todoList)
  })

  project.addProject('test')
  project.addProject('test2')
  project.switchProject(project.getProjects[0].id)
  const newItemID = todo.addItem('work', 'develope todo list', null, 0, project.getCurrentProjectID);
  project.addTodoToProject(project.getCurrentProjectID, newItemID)
  const currentProject = project.getProject(project.getProjects[0].id)
  const projectNeedDelete = project.getProject(project.getProjects[1].id)
  project.changeProjectName(currentProject.id, 'change name')
  project.deleteProject(projectNeedDelete.id)
  console.log(todo.projectTodoList(currentProject.todoIDList))
  console.log(project.getProjects, project.getProject(project.getProjects[0].id), project.switchProject(project.getProjects[0].id))
}