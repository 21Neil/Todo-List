import todo from "./todo"

export default function index() {
  const todoList = todo.getTodoList()
  todo.addItem('work', 'develope todo list', null, 0, null);
  todo.addItem('changeC', 'test changeC', null, 0, null);
  todo.deleteItem(Object.keys(todoList)[0])
  console.log(todoList)
  todo.changeItem(Object.keys(todoList)[0], 'changeA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', null, 0, null)
}