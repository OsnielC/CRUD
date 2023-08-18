import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyA7NBOKfJnCC6s4VrSpcJuVtpEZfoqqi-g",
  authDomain: "crud-ac8c8.firebaseapp.com",
  projectId: "crud-ac8c8",
  storageBucket: "crud-ac8c8.appspot.com",
  messagingSenderId: "1041522586493",
  appId: "1:1041522586493:web:9f50a17c40ac9834291214"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const application = new function(){
    this.toDoInput = document.querySelector('#task');
    this.responsable = document.querySelector('#responsable');
    this.registrationDate = document.querySelector('#registrationDate');
    this.finalDate = document.querySelector('#finalDate');
    this.status = document.querySelector('#status2');
    this.toDoList = document.querySelector('.taskList');
    this.btnSubmit = document.querySelector('#taskSubmit');
    this.btnMod = document.querySelector('#modSubmit');
    this.btnUp = document.querySelector('#btnScrollUp');

    this.btnUp.addEventListener('click', (e)=>{
        e.preventDefault()
        window.scrollTo(0,0)
    })

    this.add = async function(){
        try{
            if(!this.toDoInput.value || !this.responsable.value || !this.registrationDate.value || !this.finalDate.value){
                alert("Revise que todos los campos esten rellenados")
                return
            }
            this.addTask(this.toDoInput.value,"En progreso", this.responsable.value, this.finalDate.value, this.registrationDate.value)
             //Boton borrar
            const on =(element, event, selector, handler)=>{
                element.addEventListener(event, e =>{
                    if(e.target.closest(selector)){
                        handler(e)
                    }
                })
            }
            on(document, 'click','.delate',e=>{
                console.log("Borrado")
                const idTarget = e.target.parentNode.parentNode
                const id = idTarget.firstElementChild.innerHTML
                console.log(id)
                if (confirm("¿Desea eliminar definitivamente esta actividad?")){
                    this.deleteTask(id)
                }
                return;
            })

            //Editar
            let idForm =0
            on(document, 'click','.edit',e=>{
                console.log("Editar")
                window.scrollTo(0,0)
                const idTarget = e.target.parentNode.parentNode
                idForm= idTarget.children[0].innerHTML
                const activityForm = idTarget.children[2].value
                const responsableForm = idTarget.children[4].value
                const registerForm = idTarget.children[6].value
                const dateForm = idTarget.children[8].value
                this.toDoInput.value = activityForm
                this.responsable.value = responsableForm
                this.registrationDate.value = registerForm
                this.finalDate.value = dateForm
                this.status.removeAttribute('hidden')
                this.registrationDate.setAttribute('readonly','readonly')
                this.btnMod.removeAttribute('hidden')
                this.btnSubmit.setAttribute('hidden','hidden')
            })

            this.btnMod.addEventListener('click', (e)=>{
                e.preventDefault()
                this.modifyTask(idForm, this.toDoInput.value, this.status.value, this.responsable.value, this.finalDate.value)
                this.btnSubmit.removeAttribute('hidden')
                this.btnMod.setAttribute('hidden','hidden')
                console.log("modificar")
                this.toDoInput.value = ''
                this.responsable.value = ''
                this.finalDate.value = ''
                this.registrationDate.value= ''
                this.registrationDate.removeAttribute('readonly')
                this.status.setAttribute('hidden', 'hidden')
            })
            
        }
        catch(error){
            console.log(error)
        }
    }

    this.addTask = async function(Task, Status, Responsable, DateCompliance,DateRegister){
        try{
            const methodSend = "POST";
            const headersSend ={
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
            const info = new URLSearchParams({
                Task : Task,
                Status : Status,
                Responsable : Responsable,
                DateCompliance : DateCompliance,
                DateRegister : DateRegister
            });
            const response = await fetch(url,{method: methodSend, headers: headersSend, body: info})
            const data = await response.json();
            console.log(data);
            this.allTasks();
            alert("Se ha añadido la tarea con éxito")
        }
        catch(error){
            alert("Ha ocurrido un error al agregar la tarea, vuelva a intentarlo")
            console.log(error)
        }
    }

    this.modifyTask = async function(idTask, Task, Status, Responsable, DateCompliance){
        try{
            const methodSend = "PUT";
            const headersSend ={
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
            const info = new URLSearchParams({
                idTask : idTask,
                Task : Task,
                Status : Status,
                Responsable : Responsable,
                DateCompliance : DateCompliance,
            });
            const response = await fetch(url,{method: methodSend, headers: headersSend, body: info})
            const data = await response.json();
            console.log(data);
            this.allTasks();
            alert("Se ha modificado la tarea con éxito")
        }
        catch(error){
            alert("Ha ocurrido un error al modificar la tarea, vuelva a intentarlo")
            console.log(error)
        }
    }

    this.deleteTask = async function(idTask){
        try{
            const methodSend = "DELETE";
            deleteUrl = url + idTask;
            const response = await fetch(deleteUrl,{method: methodSend})
            const data = await response.json();
            console.log(data);
            alert("Se ha eliminado la tarea con éxito")
            this.allTasks();
        }
        catch(error){
            alert("Ha ocurrido un error al eliminar la tarea, vuelva a intentarlo")
            console.log(error)
        }
    }

    this.allTasks = async function(){
        try{
            const methodSend = "GET";
            const response = await fetch(url,{method: methodSend})
            const data = await response.json();
            console.log(data);
            this.toDoList.innerHTML=''
            let dataHtml =''
            for(i=0;i<data.length;i++){
                dataHtml += '<div class="task">'
                dataHtml += '<div class="content">'
                dataHtml += '<div class="id" style="display: none">'+data[i].IdTask+'</div>'
                dataHtml += '<label for="task">Actividad:</label>'
                dataHtml += '<input class="text" type="text" readonly="readonly" value="'+data[i].Tasks+'">'
                dataHtml += '<label for="responsable">Responsable:</label>'
                dataHtml += '<input class="text" type="text" readonly="readonly" value="'+data[i].Responsable+'">'
                dataHtml += '<label for="registrationDate">Fecha de registro:</label>'
                dataHtml += '<input class="text" type="date" readonly="readonly" value="'+data[i].DateRegister+'">'
                dataHtml += '<label for="finalDate">Fecha de cumplimiento:</label>'
                dataHtml += '<input class="text" type="date" readonly="readonly" value="'+data[i].DateCompliance+'">'
                dataHtml += '<label for="status">Estado:</label>'
                dataHtml += '<div class="select">'+data[i].Status+'</div>'
                dataHtml += '<div class="actions">'
                dataHtml += '<button class="edit">EDITAR</button>'
                dataHtml += '<button class="delate">ELIMINAR</button>'
                dataHtml += '</div>'
                dataHtml += '</div>'
                dataHtml += '</div>'
                this.toDoList.innerHTML = dataHtml;
            }
        }
        catch(error){
            alert("Ha ocurrido un error al mostrar las tarea, vuelva a intentarlo")
            console.log(error)
        }
    }

    this.oneTask = async function(idTask){
        try{
            const methodSend = "GET";
            requerestUrl = url + idTask;
            const response = await fetch(requerestUrl,{method: methodSend})
            const data = await response.json();
            console.log(data);
        }
        catch(error){
            console.log(error)
        }
    }
}
