//Where Todo objects will be stored
let todos = [];

//Bringing the Checked Checkbox down
const updateTodosSequence = () => {
  //Get all the completed -- array filter
  const completed = todos.filter((todo) => todo.completed);

  //Get all the not completed  -- array filter
  const notCompleted = todos.filter((todo) => !todo.completed);

  //Update the Todos List -- combing 2 arrays using spread operator
  todos = [...notCompleted, ...completed];
};

//This will make the table appear.
const drawTable = () => {
  //Clear the table.
  userFeedbackTable.innerHTML = "";

  //Loop to the Todo Array
  for (let i = 0; i < todos.length; i++) {
    //Get the current Todo.
    const todo = todos[i];

    //Creating Checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.completed;
    //Sequence of the todo in the array -- adding custom attribute -- storing the position of the todo in the array.
    checkbox.setAttribute("sequence", i);

    //Drawing process happens here
    //Creating a row in a table <tr>
    const row = userFeedbackTable.insertRow(i);

    //Creating a td inside the row.
    row.insertCell(0).innerHTML = todo.todo;
    const created = row.insertCell(1);
    created.innerHTML = todo.created; // Try to console log this todo.created.

    row.insertCell(2).appendChild(checkbox);
    const updated = row.insertCell(3);
    updated.innerHTML = todo.updated;
  }
};

const addTodo = (e) => {
  e.preventDefault();

  const todo = userInput.value.trim();

  if (!todo) {
    return;
  }

  const now = new Date();
  const created = now.toDateString();

  todos.push({
    todo,
    created,
    completed: false,
    updated: "",
  });

  userInput.value = "";
  userInput.focus();

  updateTodosSequence();

  //Display To Table
  drawTable();
};

addItem.addEventListener("click", addTodo);

//Event Delegation -- Checkbox Event Listeners
userFeedbackTable.addEventListener("click", (e) => {
  // This will check if the the checkbox has been clicked
  if (e.target.matches("input")) {
    //Custom attribute, need to retrience the data using getAttribute
    const id = e.target.getAttribute("sequence");
    const todo = todos[id];
    todo.completed = !todo.completed;

    if (todo.completed) {
      const now = new Date();
      const date = now.toDateString();

      todo.updated = date;
    } else {
      todo.updated = "";
    }

    //Bringing the Checked Checkbox down
    updateTodosSequence();

    //Redraw the table
    drawTable();
  }
});
