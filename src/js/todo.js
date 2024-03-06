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
    localStorage.setItem('todoList', JSON.stringify(todoList));
    return id;
  };

  const deleteItem = id => {
    delete todoList[id];
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  const changeItem = (id, title, description, dueDate, priority, project) => {
    todoList[id].title = title;
    todoList[id].description = description;
    todoList[id].dueDate = dueDate;
    todoList[id].priority = priority;
    todoList[id].project = project;
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };

  const getProjectTodoListArray = todoIDList =>
    todoIDList.map(id => ({
      id: todoList[id].id,
      title: todoList[id].title,
      description: todoList[id].description,
    }));

  return {
    createItem,
    addItem,
    deleteItem,
    changeItem,
    get getTodoList() {
      return todoList;
    },
    get getAllTodoListArray() {
      const todoArray = [...Object.keys(todoList).map(key => todoList[key])];
      return todoArray.map(todo =>
        (({ id, title, description }) => ({
          id,
          title,
          description,
        }))(todo)
      );
    },
    getProjectTodoListArray,
  };
})();

export default todo;
