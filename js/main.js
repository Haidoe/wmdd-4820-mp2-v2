//Event Listener --- For Add to List

let todoList = [];

function drawTable() {
  //Reset the table
  userFeedbackTable.innerHTML = "";

  //For of
  for (const item of todoList) {
    //<tr> </tr>
    const row = userFeedbackTable.insertRow();

    // <td></td> --- Todo
    const cell1 = row.insertCell();
    cell1.innerHTML = item.todo;

    // Created Date
    const cell2 = row.insertCell();
    cell2.innerHTML = item.createdDate;

    // Display Checkbox
    const cell3 = row.insertCell();
    cell3.appendChild(item.checkbox);
    item.checkbox.value = item.name;

    // Display dateCompletion
    const cell4 = row.insertCell();
    cell4.innerHTML = item.dateCompletion;

    if (item.dateCompletion) {
      row.style.backgroundColor = "#000";
    }
  }
}

addItem.addEventListener("click", () => {
  // Get User Input -- Todo
  const todo = userInput.value;

  // Created Date
  const createdDate = new Date().toDateString();

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  // Date Completion.
  const dateCompletion = "";

  //Create an object of the data needed.
  const todoObject = {
    todo,
    createdDate,
    checkbox,
    dateCompletion,
    name: todoList.length,
  };

  // Stored in Array.
  todoList.push(todoObject);

  userInput.value = "";
  userInput.focus();

  sortTodo();

  //Display the Table
  drawTable();
});

userFeedbackTable.addEventListener("click", (event) => {
  //Trigger Checkbox Listener
  if (event.target.matches("input")) {
    //Update the DateCompletion
    const result = todoList.find((item) => item.name == event.target.value);

    //Shift to the bottom
    if (result.dateCompletion) {
      result.dateCompletion = "";
    } else {
      result.dateCompletion = new Date().toDateString();
    }

    sortTodo();

    //Refresh the table
    drawTable();
  }
});

function sortTodo() {
  //Get completed todos
  const completed = todoList.filter(function (item) {
    return item.dateCompletion.length;
  });

  //Get the not completed
  const notCompleted = todoList.filter(function (item) {
    return item.dateCompletion.length === 0;
  });

  //Combine into new array
  const newTodoList = [];

  notCompleted.forEach((item) => {
    newTodoList.push(item);
  });

  completed.forEach((item) => {
    newTodoList.push(item);
  });

  todoList = newTodoList;
}
