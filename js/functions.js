//Selectors
const toDoInput = document.querySelector('#task');
const toDoButton = document.querySelector('#taskSubmit');
const toDoList = document.querySelector('.tasksContainer');

const responsable = document.querySelector('#responsable');
const registrationDate = document.querySelector('#registrationDate');
const finalDate = document.querySelector('#finalDate');

//Event Listeners
toDoButton.addEventListener('click', addToDo)

//Functions
function addToDo(event){
    //prevent from submitting
    event.preventDefault();
    //Create div
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("tasks");

    const newToDo = document.createElement('div');
    newToDo.innerText = 'Hey'
    newToDo.classList.add('content');
    todoDiv.appendChild(newToDo);
    
    toDoList.appendChild(todoDiv);
}


/*task.addEventListener('input',()=>{
    tasks.textContent = task.value;
    console.log(tasks.textContent)
})*/

