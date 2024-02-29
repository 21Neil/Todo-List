import generateID from './generateID';

const todo = (() => {
  const todoList = localStorage.todoList ? JSON.parse(localStorage.todoList) : {};

  const createItem = (title, description, dueDate, priority, project, id) => ({
    id,
    title,
    description,
    dueDate,
    priority,
    project,
  });

  const addItem = (title, description, dueDate, priority, project) => {
    const id = generateID();
    todoList[id] = createItem(title, description, dueDate, priority, project, id);
    return id;
  };

  const deleteItem = id => {
    delete todoList[id];
  };

  const changeItem = (id, title, description, dueDate, priority, project) => {
    todoList[id].title = title;
    todoList[id].description = description;
    todoList[id].dueDate = dueDate;
    todoList[id].priority = priority;
    todoList[id].project = project;
  };

  const projectTodoList = todoIDList => todoIDList.map(id => todoList[id]);

  return {
    createItem,
    addItem,
    deleteItem,
    changeItem,
    get getTodoList() {
      return todoList;
    },
    projectTodoList,
  };
})();

export default todo;
