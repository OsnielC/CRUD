//Selectors
const toDoInput = document.querySelector('#task');
const responsable = document.querySelector('#responsable');
const registrationDate = document.querySelector('#registrationDate');
const finalDate = document.querySelector('#finalDate');

const toDoButton = document.querySelector('#taskSubmit');
const toDoList = document.querySelector('.taskList');

//Event Listeners
toDoButton.addEventListener('click', addToDo)

//Functions


function addToDo(event){
    //prevent from submitting
    event.preventDefault();
    //Check if any of the forms are empty
    if(!toDoInput.value || !responsable.value || !registrationDate.value || !finalDate.value){
        alert("Revise que todos los campos esten rellenados")
        return
    }
    //Create div class task
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("task");
    toDoList.appendChild(todoDiv);
    //Create div class content
    const todoContent =document.createElement("div");
    todoContent.classList.add("content");
    todoDiv.appendChild(todoContent);

    //Activity
    const newToDoLabel = document.createElement('label');
    newToDoLabel.innerHTML = "Actividad:";
    newToDoLabel.htmlFor = "task";
    todoContent.appendChild(newToDoLabel);

    const newToDo = document.createElement('input');
    newToDo.classList.add("text");
    newToDo.type = "text";
    newToDo.value = toDoInput.value
    newToDo.setAttribute("readonly", "readonly");
    todoContent.appendChild(newToDo);

    //Responsable
    const newResponsableLabel = document.createElement('label');
    newResponsableLabel.innerHTML = "Responsable:";
    newResponsableLabel.htmlFor = "responsable";
    todoContent.appendChild(newResponsableLabel);

    const newResponsable = document.createElement('input');
    newResponsable.classList.add("text");
    newResponsable.type = "text";
    newResponsable.value = responsable.value
    newResponsable.setAttribute("readonly", "readonly");
    todoContent.appendChild(newResponsable);

    //RegistrationDate
    const newRegistrationLabel = document.createElement('label');
    newRegistrationLabel.innerHTML = "Fecha de registro:";
    newRegistrationLabel.htmlFor = "registrationDate";
    todoContent.appendChild(newRegistrationLabel);

    const newRegistration = document.createElement('input');
    newRegistration.classList.add("text");
    newRegistration.type = "date";
    newRegistration.value = registrationDate.value
    newRegistration.setAttribute("readonly", "readonly");
    todoContent.appendChild(newRegistration);

    //FinalDate
    const newFinalLabel = document.createElement('label');
    newFinalLabel.innerHTML = "Fecha de cumplimiento:";
    newFinalLabel.htmlFor = "finalDate";
    todoContent.appendChild(newFinalLabel);

    const newFinal = document.createElement('input');
    newFinal.classList.add("text");
    newFinal.type = "date";
    newFinal.value = registrationDate.value
    newFinal.setAttribute("readonly", "readonly");
    todoContent.appendChild(newFinal);

    //Status
    const newStatusLabel = document.createElement('label');
    newStatusLabel.innerHTML = "Estado:";
    newStatusLabel.htmlFor = "status";
    todoContent.appendChild(newStatusLabel);

    const newStatus = document.createElement('select');
    newStatus.classList.add("status");
    newStatus.setAttribute("disabled", "disabled");
    todoContent.appendChild(newStatus);

    //Options
    //In Process
    const inProcess = document.createElement('option');
    inProcess.setAttribute("selected", "true");
    inProcess.value = "En proceso";
    inProcess.innerHTML = "En proceso";
    newStatus.appendChild(inProcess);

    //Finished
    const finished = document.createElement('option');
    finished.value = "Terminada";
    finished.innerHTML = "Terminada";
    newStatus.appendChild(finished);

    //Delayed
    const delayed = document.createElement('option');
    delayed.value = "Retrasada";
    delayed.innerHTML = "Retrasada";
    newStatus.appendChild(delayed);

    //Eliminated
    const eliminated = document.createElement('option');
    eliminated.value = "Eliminada";
    eliminated.innerHTML = "Eliminada";
    newStatus.appendChild(eliminated);

    //Buttons
    const actions =document.createElement("div");
    actions.classList.add("actions");
    todoContent.appendChild(actions);

    const edit = document.createElement('button');
    actions.appendChild(edit);
    edit.classList.add("edit");
    edit.innerHTML = "EDITAR";

    const delate = document.createElement('button');
    actions.appendChild(delate);
    delate.classList.add("delate");
    delate.innerHTML = "ELIMINAR";

    edit.addEventListener('click', ()=>{
        if(edit.innerHTML == "EDITAR"){
            newToDo.removeAttribute("readonly");
            newResponsable.removeAttribute("readonly");
            newRegistration.removeAttribute("readonly");
            newFinal.removeAttribute("readonly");
            newStatus.removeAttribute("disabled")
            edit.focus();
            edit.innerHTML = "GUARDAR"
        }
        else{
            newToDo.setAttribute("readonly", "readonly");
            newResponsable.setAttribute("readonly", "readonly");
            newRegistration.setAttribute("readonly", "readonly");
            newFinal.setAttribute("readonly", "readonly");
            newStatus.setAttribute("disabled", "disabled");
            edit.innerHTML = "EDITAR"
        }
    })

    delate.addEventListener('click', ()=>{
        if(newStatus.value !== "Eliminada"){
            if (confirm("¿Desea marcar como eliminada esta actividad?")) {
                newStatus.value = "Eliminada";
            } 
        }
        else {
            if (confirm("¿Desea eliminar definitivamente esta actividad?")){
                toDoList.removeChild(todoDiv);
            }
            return;
        }
    })

}

