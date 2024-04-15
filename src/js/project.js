import generateID from './generateID';
import todo from './todo';

const project = (() => {
  const projects = localStorage.projects ? JSON.parse(localStorage.projects) : {};
  let currentProjectID = null;

  const createProject = (id, projectName) => {
    const todoIDList = [];
    return {
      id,
      projectName,
      todoIDList,
    };
  };

  const addProject = projectName => {
    const id = generateID();
    const newProject = createProject(id, projectName);
    projects[id] = newProject;
    localStorage.setItem('projects', JSON.stringify(projects));
    return [{ id: newProject.id, projectName: newProject.projectName }];
  };

  const addTodoToProject = (projectID, todoID) => {
    projects[projectID].todoIDList.push(todoID);
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const deleteTodoToProject = (projectID, todoID) => {
    const index = projects[projectID].todoIDList.indexOf(todoID);
    if (index > -1) {
      projects[projectID].todoIDList.splice(index, 1);
    }
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const switchProject = projectID => {
    currentProjectID = projectID;
  };

  const changeProjectName = (projectID, name) => {
    projects[projectID].projectName = name;
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const deleteProject = projectID => {
    delete projects[projectID];
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const getProject = id => projects[id];

  return {
    get getProjects() {
      const projectArray = [...Object.keys(projects).map(key => projects[key])];
      return projectArray.map(project =>
        (({ id, projectName }) => ({
          id,
          projectName,
        }))(project)
      );
    },
    get getCurrentProjectID() {
      return currentProjectID;
    },
    // determine todo list to return
    get determineTodoListToReturn() {
      const currentProject = project.getCurrentProjectID;
      if (currentProject === 'btn-all') {
        return todo.getAllTodoListArray;
      }

      if (currentProject === 'btn-day') {
        return todo.getDayTodo;
      }

      if (currentProject === 'btn-week') {
        return todo.getWeekTodo;
      }

      return todo.getProjectTodoListArray(project.getProject(currentProject).todoIDList);
    },
    // determine todo list to return
    addProject,
    addTodoToProject,
    deleteTodoToProject,
    switchProject,
    changeProjectName,
    deleteProject,
    getProject,
  };
})();

export default project;
