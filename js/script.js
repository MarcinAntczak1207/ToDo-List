{

  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const completeAllTasks = () => {
    tasks = tasks.map(task => ({ content: task.content, done: true }));
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };


  const bindToggleDoneEvents = () => {

    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) { 
      tasksListHTMLContent += `   
     <li
     class="tasks__item js-task ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}"
     >
     <button class="tasks__button tasks__button--toggleDone js-toggleDone">
     ${task.done ? "✔" : ""}
     </button>
     <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
     ${task.content}
     </span>
     <button class="tasks__button tasks__button--remove js-remove">   
     🗑️
     </button>
     </li>
      `;
    };

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => {
    let buttonsHTMLContent = "";

    if (tasks.length > 0) {
      buttonsHTMLContent = `
     <button class="section__buttons js-hideDoneTasksButton">
     ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
     </button>
     <button class="section__buttons js-completeAllTasksButton"
     ${tasks.every(task => task.done) ? "disabled" : ""}>   
     Ukończ wszystkie
     </button>`;
    };
    document.querySelector(".js-sectionButtons").innerHTML = buttonsHTMLContent;

  }; 

  const bindButtonsEvents = () => {

    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");
    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener("click", () => {
        toggleHideDoneTasks();
      })
    };


    const completeAllTasksButton = document.querySelector(".js-completeAllTasksButton");
    if (completeAllTasksButton) {
      completeAllTasksButton.addEventListener("click", () => {
        completeAllTasks();
      })
    };


  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindButtonsEvents();
    bindRemoveEvents();
    bindToggleDoneEvents();
  };


  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();

  };


  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}