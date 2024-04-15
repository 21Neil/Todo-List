import project from './project';
import todo from './todo';

const changeProjectName = name => {
  const projectHeader = document.querySelector('#project-header');
  projectHeader.textContent = name;
};

const manageNavBold = dataID => {
  const projectNavElement = document.querySelector(`[data-id = '${dataID}'] > button`);

  if (project.getCurrentProjectID !== null) {
    const preProjectNavElement = document.querySelector(
      `[data-id = '${project.getCurrentProjectID}'] > button`
    );
    preProjectNavElement.classList.remove('fw-bold');
  }

  project.switchProject(dataID);
  projectNavElement.classList.add('fw-bold');
};

const renderOpt = projectList => {
  const projectSelect = document.querySelector('#project');

  projectList.forEach(project => {
    const opt = document.createElement('option');
    opt.text = project.projectName;
    opt.value = project.id;
    projectSelect.add(opt);
  });
};

const dom = () => {
  const btnAll = document.querySelector("[data-id = 'btn-all']");
  const btnDay = document.querySelector("[data-id = 'btn-day']");
  const btnWeek = document.querySelector("[data-id = 'btn-week']");

  btnAll.addEventListener('click', () => {
    navBtnOnClick('All');
    todoDom.renderTodoList(todo.getAllTodoListArray);
  });
  btnDay.addEventListener('click', () => {
    navBtnOnClick('Day');
    todoDom.renderTodoList(todo.getDayTodo);
  });
  btnWeek.addEventListener('click', () => {
    navBtnOnClick('Week');
    todoDom.renderTodoList(todo.getWeekTodo);
  });

  todoDom.renderTodoList(todo.getAllTodoListArray);
  navBtnOnClick('All');
  projectDom();
  project.switchProject('btn-all');

  function navBtnOnClick(period) {
    const deleteProjectBtn = document.querySelector('#delete-project-btn');

    if (!deleteProjectBtn.classList.value.includes('d-none')) {
      deleteProjectBtn.classList.add('d-none');
    }

    manageNavBold(`btn-${period.toLowerCase()}`);
    project.switchProject(`btn-${period.toLowerCase()}`);
    changeProjectName(period);
  }
};

const projectDom = () => {
  const projectContainer = document.querySelector('#project-container');

  // render project list
  function renderProjectList(projectList) {
    projectList.forEach(project => {
      const div = document.createElement('div');
      const btn = document.createElement('button');

      projectContainer.appendChild(div);
      div.dataset.id = project.id;
      div.appendChild(btn);
      btn.classList.add('btn', 'w-100', 'text-start', 'fs-6');
      btn.textContent = project.projectName;
      btn.addEventListener('click', () => renderProject(project.id));
    });
    renderOpt(projectList);
  }

  if (project.getProjects.length !== 0) renderProjectList(project.getProjects);
  // render project list

  // add project
  const addProjectBtn = document.querySelector('#add-project-btn');

  const createProjectNameInput = () => {
    const div = document.createElement('div');
    const input = document.createElement('input');

    div.id = 'input-container';
    div.classList.add('p-2');
    div.appendChild(input);
    input.classList.add('form-control', 'p-1');
    projectContainer.appendChild(div);
    input.focus();
    input.addEventListener('focusout', addProject);
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') input.blur();
    });
  };

  function addProject(e) {
    const inputContainer = document.querySelector('#input-container');

    if (!e.target.value) {
      inputContainer.remove();
      return;
    }

    const newProject = project.addProject(e.target.value);

    renderProjectList(newProject);
    inputContainer.remove();
    renderProject(newProject[0].id);
  }

  addProjectBtn.addEventListener('click', createProjectNameInput);
  // add project

  // render project
  function renderProject(projectID) {
    const currentProject = project.getProject(projectID);
    const deleteProjectBtn = document.querySelector('#delete-project-btn');

    deleteProjectBtn.classList.remove('d-none');
    deleteProjectBtn.addEventListener('click', deleteProject);
    manageNavBold(projectID);
    changeProjectName(currentProject.projectName);
    todoDom.renderTodoList(todo.getProjectTodoListArray(currentProject.todoIDList));
  }
  // render project

  // delete project

  function deleteProject() {
    const projectNav = document.querySelector(`[data-id = '${project.getCurrentProjectID}']`);
    const projectOpt = document.querySelector(`[value = '${project.getCurrentProjectID}']`);

    project.deleteProject(project.getCurrentProjectID);
    showAllTodo();
    projectNav.remove();
    projectOpt.remove();
  }
  // delete project

  // priority
  const priorityBtn = document.querySelector('#priority-btn');
  let sort = false;

  priorityBtn.addEventListener('click', priorityBtnOnClick);

  function priorityBtnOnClick() {
    sort = !sort;
    if (sort) {
      const todoList = project.determineTodoListToReturn;
      const priority = ['urgent', 'important', 'normal'];

      todoList.sort((a, b) => priority.indexOf(a.priority) - priority.indexOf(b.priority));
      todoDom.renderTodoList(todoList);
    }
    if (!sort) {
      const todoList = project.determineTodoListToReturn;

      todoDom.renderTodoList(todoList);
    }
  }
  // priority
};

const todoDom = (() => {
  const todoContainer = document.querySelector('#todo-container');

  // render todo list
  const renderTodoList = todoArray => {
    todoContainer.replaceChildren();
    todoArray.forEach(todo => createTodoArticle(todo));
  };

  function todoDeleteOnClick(id) {
    if (todo.getTodoDetail(id).project !== '')
      project.deleteTodoToProject(todo.getTodoDetail(id).project, id);
    todo.deleteItem(id);

    renderTodoList(project.determineTodoListToReturn);
  }

  const createTodoArticle = todo => {
    const article = document.createElement('article');
    const headerGroupContainer = document.createElement('div');
    const checkbox = document.createElement('input');
    const headerContainer = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const leftArea = document.createElement('div');
    const rightArea = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const deleteSpan = document.createElement('span');

    todoContainer.appendChild(article);
    article.classList.add('border-bottom', 'd-flex', 'justify-content-between');
    article.appendChild(leftArea);
    article.appendChild(rightArea);
    article.dataset.id = todo.id
    rightArea.appendChild(deleteBtn);
    deleteBtn.classList.add('btn', 'p-0', 'h-100');
    deleteBtn.appendChild(deleteSpan);
    deleteSpan.classList.add('material-symbols-outlined', 'text-danger', 'fs-5', 'p-1');
    deleteSpan.textContent = ' delete ';
    leftArea.classList.add('flex-fill', 'edit-todo')
    leftArea.appendChild(headerGroupContainer);
    leftArea.appendChild(p);
    headerGroupContainer.classList.add(
      'd-flex',
      'justify-content-start',
      'gap-3',
      'align-items-center'
    );
    headerGroupContainer.appendChild(checkbox);
    headerGroupContainer.appendChild(headerContainer);
    p.classList.add('text-start', 'm-0', 'fs-6', 'fw-light', 'pb-4', 'description', 'text-break');
    p.textContent = todo.description;
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input', 'round-check', 'm-0');
    headerContainer.classList.add('text-start', 'mt-2', 'mb-2');
    headerContainer.appendChild(h2);
    h2.classList.add('fs-4', 'm-0', 'text-start', 'p-2');
    h2.textContent = todo.title;

    deleteBtn.addEventListener('click', () => todoDeleteOnClick(todo.id));

    leftArea.addEventListener('click', editTodo)
  };
  // render todo list

  // add todo
  const todoModal = document.querySelector('#add-todo')
  const addTodoBtn = document.querySelector('#add-todo-btn');

  todoModal.addEventListener('shown.bs.modal', () => {
    // reset field
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('#priority');
    const projectID = document.querySelector('#project');
    title.value = '';
    description.value = '';
    dueDate.value = '';
    priority.value = 'normal';
    projectID.value = '';
    // reset field

    document.querySelector('#title').focus()
  })

  addTodoBtn.addEventListener('click', addTodoBtnOnClick);

  function addTodoBtnOnClick() {
    const projectSelect = document.querySelector('#project');
    
    if (
      project.getCurrentProjectID === 'btn-all' ||
      project.getCurrentProjectID === 'btn-day' ||
      project.getCurrentProjectID === 'btn-week'
    ) {
      projectSelect.value = '';
      return;
    }
    
    projectSelect.value = project.getCurrentProjectID;
  }

  const confirmAddBtn = document.querySelector('#confirm-add');

  confirmAddBtn.addEventListener('click', addConfirmBtnOnClick);

  function addConfirmBtnOnClick() {
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('#priority');
    const projectID = document.querySelector('#project');

    const todoID = todo.addItem(
      title.value,
      description.value,
      dueDate.value,
      priority.value,
      projectID.value
    );

    if (projectID.value !== '') project.addTodoToProject(projectID.value, todoID);

    renderTodoList(project.determineTodoListToReturn);

  }
  // add todo

  // edit todo 
  function editTodo(e) {
    console.log(e)
  }
  // edit todo

  return { renderTodoList };
})();

export default dom;
