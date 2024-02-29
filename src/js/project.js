import generateID from './generateID';

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
    projects[id] = createProject(id, projectName);
  };

  const addTodoToProject = (projectID, todoID) => {
    projects[projectID].todoIDList.push(todoID);
  };

  const switchProject = projectID => {
    currentProjectID = projectID;
    return currentProjectID;
  };

  const changeProjectName = (projectID, name) => {
    projects[projectID].projectName = name
  }

  const deleteProject = (projectID) => {
    delete projects[projectID]
  }

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
    addProject,
    addTodoToProject,
    switchProject,
    changeProjectName,
    deleteProject,
    getProject,
  };
})();

export default project;
