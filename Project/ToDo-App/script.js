let tasks=[];
let savedTasks=localStorage.getItem("tasks");

if (savedTasks){
    tasks=JSON.parse(savedTasks);
}

let input = document.getElementById("taskInput");
let list = document.getElementById("taskList");
let button=document.getElementById("addBtn");
let deleteAllBtn=document.getElementById("delAllBtn");
let editBtn=document.createElement("button");
editBtn.innerHTML="✏";
let searchInput=document.getElementById("searchInput");

deleteAllBtn.addEventListener("click",function(){
    tasks=[];
    localStorage.setItem("tasks",JSON.stringify(tasks));
    renderTasks();
});

button.addEventListener("click",addTask);

function addTask(){
let task=input.value;

if(task.trim()===""){
    return;
}

tasks.push({
    task:task,
    completed:false
});

localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();

input.value="";

};

function renderTasks(){
    list.innerHTML="";
    
    let emptyMessage=document.getElementById("emptyMessage");
    if (tasks.length===0){
        emptyMessage.style.display="block";
    }
    else{
        emptyMessage.style.display="none";
    }
    let search=searchInput.value.toLowerCase();
    
    for(let i=0;i<tasks.length;i++){
        let item=document.createElement("li");
        let checkBox=document.createElement("input");
        
        checkBox.type="checkbox";
        checkBox.checked=tasks[i].completed;
        
        let taskText=document.createElement("span");
        taskText.textContent=tasks[i].task;
        
        if (tasks[i].completed){
            taskText.classList.add("completed");
        }
        let delBtn=document.createElement("button");
        delBtn.textContent="🗑️";
        
        checkBox.addEventListener("change",function(){
        tasks[i].completed=checkBox.checked;
        taskText.classList.toggle("completed");
        localStorage.setItem("tasks",JSON.stringify(tasks));
        });
        
        delBtn.addEventListener("click",function(){
            tasks.splice(i,1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            renderTasks();
        });
        editBtn.addEventListener("click",function(){
            let newTask=prompt("Edit Task",tasks[i].task);

            if(newTask!==null && newTask.trim()!==""){
                tasks[i].task=newTask;
                localStorage.setItem("tasks",JSON.stringify(tasks));
                renderTasks();
            }
        });
        
        item.appendChild(checkBox);
        item.appendChild(taskText);
        item.appendChild(editBtn);
        item.appendChild(delBtn);
        list.appendChild(item);
    
    }
    updateTaskCount();
}
 
searchInput.addEventListener("keyup",renderTasks);
input.addEventListener("keydown",function(event){
    if (event.key==="Enter"){
        addTask();
    }
});

function updateTaskCount(){
    document.getElementById("taskCount").textContent =
    "Total Tasks: " + tasks.length;

}

renderTasks();
