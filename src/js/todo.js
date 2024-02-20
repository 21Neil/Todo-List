const todo = (() => {
  const todoList = {};

  const createItem = (title, description, dueDate, priority, project, id) => ({
    id,
    title,
    description,
    dueDate,
    priority,
    project,
  });

  const generateID = () => self.crypto.randomUUID();

  const addItem = (title, description, dueDate, priority, project) => {
    const id = generateID();
    todoList[id] = createItem(title, description, dueDate, priority, project, id);
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

  const getTodoList = () => todoList;

  return {
    createItem,
    addItem,
    deleteItem,
    changeItem,
    getTodoList,
  };
})();

export default todo;
