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

const showAllTodo = () => {
  const deleteProjectBtn = document.querySelector('#delete-project-btn');
  const projectHeader = document.querySelector('#project-header');

  deleteProjectBtn.classList.add('d-none');
  projectHeader.classList.add('me-auto');
  manageNavBold('btn-all');
  changeProjectName('All');
  todoDom.renderAllTodo();
};

const dom = () => {
  const btnAll = document.querySelector("[data-id = 'btn-all']");
  const btnDay = document.querySelector('#btn-day');
  const btnWeek = document.querySelector('#btn-week');

  btnAll.addEventListener('click', showAllTodo);

  showAllTodo();
  projectDom();
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

    deleteProjectBtn.classList.remove('d-none')
    deleteProjectBtn.addEventListener('click', deleteProject);
    manageNavBold(projectID);
    changeProjectName(currentProject.projectName);
    todoDom.renderTodoList(currentProject.todoIDList);
  }
  // render project

  // delete project

  function deleteProject() {
    const projectNav = document.querySelector(`[data-id = '${project.getCurrentProjectID}']`);

    project.deleteProject(project.getCurrentProjectID);
    showAllTodo();
    projectNav.remove();
  }
  // delete project
};

const todoDom = (() => {
  const todoContainer = document.querySelector('#todo-container');

  // render todo list
  const renderTodoList = todoArray => {
    const hr = document.createElement('div');

    todoContainer.replaceChildren();
    hr.classList.add('border-bottom');
    todoContainer.appendChild(hr);
    todoArray.forEach(todo => createTodoArticle(todo));
  };

  const createTodoArticle = todo => {
    const article = document.createElement('article');
    const headerGroupContainer = document.createElement('div');
    const checkbox = document.createElement('input');
    const headerContainer = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    todoContainer.appendChild(article);
    article.classList.add('border-bottom');
    article.appendChild(headerGroupContainer);
    article.appendChild(p);
    headerGroupContainer.classList.add(
      'd-flex',
      'justify-content-start',
      'gap-3',
      'align-items-center'
    );
    headerGroupContainer.appendChild(checkbox);
    headerGroupContainer.appendChild(headerContainer);
    p.classList.add('text-start', 'm-0', 'fs-6', 'fw-light', 'pb-4', 'description');
    p.textContent = todo.description;
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input', 'round-check', 'm-0');
    headerContainer.classList.add('text-start', 'mt-2', 'mb-2');
    headerContainer.appendChild(h2);
    h2.classList.add('fs-4', 'm-0', 'text-start', 'p-2');
    h2.textContent = todo.title;
  };
  // render todo list

  // add todo
  const addTodoBtn = document.querySelector('#add-todo-btn');

  addTodoBtn.addEventListener('click', addTodoBtnOnClick);

  function addTodoBtnOnClick() {
    console.log('first');
  }
  // add todo
  const renderAllTodo = () => {
    renderTodoList(todo.getAllTodoListArray);
  };

  return { renderTodoList, renderAllTodo };
})();

export default dom;
