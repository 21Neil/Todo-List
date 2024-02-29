/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/generateID.js":
/*!******************************!*\
  !*** ./src/js/generateID.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => self.crypto.randomUUID());

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ index)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/js/todo.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/js/project.js");



function index() {
  const todoList = _todo__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList

  const addBtn = document.querySelector('#add')
  addBtn.addEventListener('click', () => {
    _todo__WEBPACK_IMPORTED_MODULE_0__["default"].addItem('work', 'develope todo list', null, 0, null);
    console.log(todoList)
    localStorage.todoList = JSON.stringify(todoList)
  })
  
  const deleteBtn = document.querySelector('#delete')
  deleteBtn.addEventListener('click', () => {
    _todo__WEBPACK_IMPORTED_MODULE_0__["default"].deleteItem(Object.keys(todoList)[0])
    console.log(todoList)
    localStorage.todoList = JSON.stringify(todoList)
  })

  const changeBtn = document.querySelector('#change')
  changeBtn.addEventListener('click', () => {
    _todo__WEBPACK_IMPORTED_MODULE_0__["default"].changeItem(Object.keys(todoList)[0], 'changeA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', null, 0, null)
    console.log(todoList)
    localStorage.todoList = JSON.stringify(todoList)
  })

  _project__WEBPACK_IMPORTED_MODULE_1__["default"].addProject('test')
  _project__WEBPACK_IMPORTED_MODULE_1__["default"].addProject('test2')
  _project__WEBPACK_IMPORTED_MODULE_1__["default"].switchProject(_project__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects[0].id)
  const newItemID = _todo__WEBPACK_IMPORTED_MODULE_0__["default"].addItem('work', 'develope todo list', null, 0, _project__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentProjectID);
  _project__WEBPACK_IMPORTED_MODULE_1__["default"].addTodoToProject(_project__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentProjectID, newItemID)
  const currentProject = _project__WEBPACK_IMPORTED_MODULE_1__["default"].getProject(_project__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects[0].id)
  const projectNeedDelete = _project__WEBPACK_IMPORTED_MODULE_1__["default"].getProject(_project__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects[1].id)
  _project__WEBPACK_IMPORTED_MODULE_1__["default"].changeProjectName(currentProject.id, 'change name')
  _project__WEBPACK_IMPORTED_MODULE_1__["default"].deleteProject(projectNeedDelete.id)
  console.log(_todo__WEBPACK_IMPORTED_MODULE_0__["default"].projectTodoList(currentProject.todoIDList))
  console.log(_project__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects, _project__WEBPACK_IMPORTED_MODULE_1__["default"].getProject(_project__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects[0].id), _project__WEBPACK_IMPORTED_MODULE_1__["default"].switchProject(_project__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects[0].id))
}

/***/ }),

/***/ "./src/js/project.js":
/*!***************************!*\
  !*** ./src/js/project.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateID */ "./src/js/generateID.js");


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
    const id = (0,_generateID__WEBPACK_IMPORTED_MODULE_0__["default"])();
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);


/***/ }),

/***/ "./src/js/todo.js":
/*!************************!*\
  !*** ./src/js/todo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateID */ "./src/js/generateID.js");


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
    const id = (0,_generateID__WEBPACK_IMPORTED_MODULE_0__["default"])();
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todo);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/index.js */ "./src/js/index.js");


(0,_js_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFlLDhCQUE4Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ0FwQjtBQUNNO0FBQy9CO0FBQ2U7QUFDZixtQkFBbUIsNkNBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2Q0FBSTtBQUNSO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2Q0FBSTtBQUNSO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2Q0FBSTtBQUNSO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFLGdEQUFPO0FBQ1QsRUFBRSxnREFBTztBQUNULEVBQUUsZ0RBQU8sZUFBZSxnREFBTztBQUMvQixvQkFBb0IsNkNBQUksZ0RBQWdELGdEQUFPO0FBQy9FLEVBQUUsZ0RBQU8sa0JBQWtCLGdEQUFPO0FBQ2xDLHlCQUF5QixnREFBTyxZQUFZLGdEQUFPO0FBQ25ELDRCQUE0QixnREFBTyxZQUFZLGdEQUFPO0FBQ3RELEVBQUUsZ0RBQU87QUFDVCxFQUFFLGdEQUFPO0FBQ1QsY0FBYyw2Q0FBSTtBQUNsQixjQUFjLGdEQUFPLGNBQWMsZ0RBQU8sWUFBWSxnREFBTyxxQkFBcUIsZ0RBQU8sZUFBZSxnREFBTztBQUMvRzs7Ozs7Ozs7Ozs7Ozs7O0FDdENzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVEQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlCQUFpQjtBQUM3QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RGU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZUFBZSx1REFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDOUNwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtDO0FBQ2xDO0FBQ0Esd0RBQUssRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9qcy9nZW5lcmF0ZUlELmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvanMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvanMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAoKSA9PiBzZWxmLmNyeXB0by5yYW5kb21VVUlEKCk7IiwiaW1wb3J0IHRvZG8gZnJvbSBcIi4vdG9kb1wiXHJcbmltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5kZXgoKSB7XHJcbiAgY29uc3QgdG9kb0xpc3QgPSB0b2RvLmdldFRvZG9MaXN0XHJcblxyXG4gIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQnKVxyXG4gIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHRvZG8uYWRkSXRlbSgnd29yaycsICdkZXZlbG9wZSB0b2RvIGxpc3QnLCBudWxsLCAwLCBudWxsKTtcclxuICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0KVxyXG4gICAgbG9jYWxTdG9yYWdlLnRvZG9MaXN0ID0gSlNPTi5zdHJpbmdpZnkodG9kb0xpc3QpXHJcbiAgfSlcclxuICBcclxuICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVsZXRlJylcclxuICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0b2RvLmRlbGV0ZUl0ZW0oT2JqZWN0LmtleXModG9kb0xpc3QpWzBdKVxyXG4gICAgY29uc29sZS5sb2codG9kb0xpc3QpXHJcbiAgICBsb2NhbFN0b3JhZ2UudG9kb0xpc3QgPSBKU09OLnN0cmluZ2lmeSh0b2RvTGlzdClcclxuICB9KVxyXG5cclxuICBjb25zdCBjaGFuZ2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlJylcclxuICBjaGFuZ2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0b2RvLmNoYW5nZUl0ZW0oT2JqZWN0LmtleXModG9kb0xpc3QpWzBdLCAnY2hhbmdlQScsICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlIHZlbGl0IGVzc2UgY2lsbHVtIGRvbG9yZSBldSBmdWdpYXQgbnVsbGEgcGFyaWF0dXIuIEV4Y2VwdGV1ciBzaW50IG9jY2FlY2F0IGN1cGlkYXRhdCBub24gcHJvaWRlbnQsIHN1bnQgaW4gY3VscGEgcXVpIG9mZmljaWEgZGVzZXJ1bnQgbW9sbGl0IGFuaW0gaWQgZXN0IGxhYm9ydW0uJywgbnVsbCwgMCwgbnVsbClcclxuICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0KVxyXG4gICAgbG9jYWxTdG9yYWdlLnRvZG9MaXN0ID0gSlNPTi5zdHJpbmdpZnkodG9kb0xpc3QpXHJcbiAgfSlcclxuXHJcbiAgcHJvamVjdC5hZGRQcm9qZWN0KCd0ZXN0JylcclxuICBwcm9qZWN0LmFkZFByb2plY3QoJ3Rlc3QyJylcclxuICBwcm9qZWN0LnN3aXRjaFByb2plY3QocHJvamVjdC5nZXRQcm9qZWN0c1swXS5pZClcclxuICBjb25zdCBuZXdJdGVtSUQgPSB0b2RvLmFkZEl0ZW0oJ3dvcmsnLCAnZGV2ZWxvcGUgdG9kbyBsaXN0JywgbnVsbCwgMCwgcHJvamVjdC5nZXRDdXJyZW50UHJvamVjdElEKTtcclxuICBwcm9qZWN0LmFkZFRvZG9Ub1Byb2plY3QocHJvamVjdC5nZXRDdXJyZW50UHJvamVjdElELCBuZXdJdGVtSUQpXHJcbiAgY29uc3QgY3VycmVudFByb2plY3QgPSBwcm9qZWN0LmdldFByb2plY3QocHJvamVjdC5nZXRQcm9qZWN0c1swXS5pZClcclxuICBjb25zdCBwcm9qZWN0TmVlZERlbGV0ZSA9IHByb2plY3QuZ2V0UHJvamVjdChwcm9qZWN0LmdldFByb2plY3RzWzFdLmlkKVxyXG4gIHByb2plY3QuY2hhbmdlUHJvamVjdE5hbWUoY3VycmVudFByb2plY3QuaWQsICdjaGFuZ2UgbmFtZScpXHJcbiAgcHJvamVjdC5kZWxldGVQcm9qZWN0KHByb2plY3ROZWVkRGVsZXRlLmlkKVxyXG4gIGNvbnNvbGUubG9nKHRvZG8ucHJvamVjdFRvZG9MaXN0KGN1cnJlbnRQcm9qZWN0LnRvZG9JRExpc3QpKVxyXG4gIGNvbnNvbGUubG9nKHByb2plY3QuZ2V0UHJvamVjdHMsIHByb2plY3QuZ2V0UHJvamVjdChwcm9qZWN0LmdldFByb2plY3RzWzBdLmlkKSwgcHJvamVjdC5zd2l0Y2hQcm9qZWN0KHByb2plY3QuZ2V0UHJvamVjdHNbMF0uaWQpKVxyXG59IiwiaW1wb3J0IGdlbmVyYXRlSUQgZnJvbSAnLi9nZW5lcmF0ZUlEJztcclxuXHJcbmNvbnN0IHByb2plY3QgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IHByb2plY3RzID0gbG9jYWxTdG9yYWdlLnByb2plY3RzID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UucHJvamVjdHMpIDoge307XHJcbiAgbGV0IGN1cnJlbnRQcm9qZWN0SUQgPSBudWxsO1xyXG5cclxuICBjb25zdCBjcmVhdGVQcm9qZWN0ID0gKGlkLCBwcm9qZWN0TmFtZSkgPT4ge1xyXG4gICAgY29uc3QgdG9kb0lETGlzdCA9IFtdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQsXHJcbiAgICAgIHByb2plY3ROYW1lLFxyXG4gICAgICB0b2RvSURMaXN0LFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhZGRQcm9qZWN0ID0gcHJvamVjdE5hbWUgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBnZW5lcmF0ZUlEKCk7XHJcbiAgICBwcm9qZWN0c1tpZF0gPSBjcmVhdGVQcm9qZWN0KGlkLCBwcm9qZWN0TmFtZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWRkVG9kb1RvUHJvamVjdCA9IChwcm9qZWN0SUQsIHRvZG9JRCkgPT4ge1xyXG4gICAgcHJvamVjdHNbcHJvamVjdElEXS50b2RvSURMaXN0LnB1c2godG9kb0lEKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzd2l0Y2hQcm9qZWN0ID0gcHJvamVjdElEID0+IHtcclxuICAgIGN1cnJlbnRQcm9qZWN0SUQgPSBwcm9qZWN0SUQ7XHJcbiAgICByZXR1cm4gY3VycmVudFByb2plY3RJRDtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaGFuZ2VQcm9qZWN0TmFtZSA9IChwcm9qZWN0SUQsIG5hbWUpID0+IHtcclxuICAgIHByb2plY3RzW3Byb2plY3RJRF0ucHJvamVjdE5hbWUgPSBuYW1lXHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3RJRCkgPT4ge1xyXG4gICAgZGVsZXRlIHByb2plY3RzW3Byb2plY3RJRF1cclxuICB9XHJcblxyXG4gIGNvbnN0IGdldFByb2plY3QgPSBpZCA9PiBwcm9qZWN0c1tpZF07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBnZXQgZ2V0UHJvamVjdHMoKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RBcnJheSA9IFsuLi5PYmplY3Qua2V5cyhwcm9qZWN0cykubWFwKGtleSA9PiBwcm9qZWN0c1trZXldKV07XHJcbiAgICAgIHJldHVybiBwcm9qZWN0QXJyYXkubWFwKHByb2plY3QgPT5cclxuICAgICAgICAoKHsgaWQsIHByb2plY3ROYW1lIH0pID0+ICh7XHJcbiAgICAgICAgICBpZCxcclxuICAgICAgICAgIHByb2plY3ROYW1lLFxyXG4gICAgICAgIH0pKShwcm9qZWN0KVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIGdldCBnZXRDdXJyZW50UHJvamVjdElEKCkge1xyXG4gICAgICByZXR1cm4gY3VycmVudFByb2plY3RJRDtcclxuICAgIH0sXHJcbiAgICBhZGRQcm9qZWN0LFxyXG4gICAgYWRkVG9kb1RvUHJvamVjdCxcclxuICAgIHN3aXRjaFByb2plY3QsXHJcbiAgICBjaGFuZ2VQcm9qZWN0TmFtZSxcclxuICAgIGRlbGV0ZVByb2plY3QsXHJcbiAgICBnZXRQcm9qZWN0LFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0O1xyXG4iLCJpbXBvcnQgZ2VuZXJhdGVJRCBmcm9tICcuL2dlbmVyYXRlSUQnO1xyXG5cclxuY29uc3QgdG9kbyA9ICgoKSA9PiB7XHJcbiAgY29uc3QgdG9kb0xpc3QgPSBsb2NhbFN0b3JhZ2UudG9kb0xpc3QgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS50b2RvTGlzdCkgOiB7fTtcclxuXHJcbiAgY29uc3QgY3JlYXRlSXRlbSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpZCkgPT4gKHtcclxuICAgIGlkLFxyXG4gICAgdGl0bGUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGR1ZURhdGUsXHJcbiAgICBwcmlvcml0eSxcclxuICAgIHByb2plY3QsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGFkZEl0ZW0gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBnZW5lcmF0ZUlEKCk7XHJcbiAgICB0b2RvTGlzdFtpZF0gPSBjcmVhdGVJdGVtKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlkKTtcclxuICAgIHJldHVybiBpZDtcclxuICB9O1xyXG5cclxuICBjb25zdCBkZWxldGVJdGVtID0gaWQgPT4ge1xyXG4gICAgZGVsZXRlIHRvZG9MaXN0W2lkXTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaGFuZ2VJdGVtID0gKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XHJcbiAgICB0b2RvTGlzdFtpZF0udGl0bGUgPSB0aXRsZTtcclxuICAgIHRvZG9MaXN0W2lkXS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdG9kb0xpc3RbaWRdLmR1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgdG9kb0xpc3RbaWRdLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB0b2RvTGlzdFtpZF0ucHJvamVjdCA9IHByb2plY3Q7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFRvZG9MaXN0ID0gdG9kb0lETGlzdCA9PiB0b2RvSURMaXN0Lm1hcChpZCA9PiB0b2RvTGlzdFtpZF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3JlYXRlSXRlbSxcclxuICAgIGFkZEl0ZW0sXHJcbiAgICBkZWxldGVJdGVtLFxyXG4gICAgY2hhbmdlSXRlbSxcclxuICAgIGdldCBnZXRUb2RvTGlzdCgpIHtcclxuICAgICAgcmV0dXJuIHRvZG9MaXN0O1xyXG4gICAgfSxcclxuICAgIHByb2plY3RUb2RvTGlzdCxcclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdG9kbztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5kZXggZnJvbSBcIi4vanMvaW5kZXguanNcIjtcclxuXHJcbmluZGV4KCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=