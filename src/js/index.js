import todo from "./todo"

export default function index() {
  todo.addItem('work', 'develope todo list', null, 0, null);
  todo.addItem('work2', 'develope todo list', null, 0, null);
  todo.clgList()
}