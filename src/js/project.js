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
    const newProject = createProject(id, projectName);
    projects[id] = newProject;
    localStorage.setItem('projects', JSON.stringify(projects));
    return [{ id: newProject.id, projectName: newProject.projectName }];
  };

  const addTodoToProject = (projectID, todoID) => {
    projects[projectID].todoIDList.push(todoID);
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
    addProject,
    addTodoToProject,
    switchProject,
    changeProjectName,
    deleteProject,
    getProject,
  };
})();

export default project;
