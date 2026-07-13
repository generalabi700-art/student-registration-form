let input = document.getElementById("taskInput");
let list = document.getElementById("taskList");
let button=document.getElementById("addBtn");
button.addEventListener("click",function(){
let task=input.value;

if(task.trim()===""){
    return;
}
let item = document.createElement("li");
let checkBox=document.createElement("input");
checkBox.type="checkbox";
let taskText=document.createElement("span");
taskText.textContent=task;
let delBtn=document.createElement("button");
delBtn.textContent="Remove";
checkBox.addEventListener("change",function(){
    taskText.classList.toggle("completed");
});
delBtn.addEventListener("click",function(){
    item.remove();
});
item.appendChild(checkBox);
item.appendChild(taskText);
item.appendChild(delBtn);
list.appendChild(item);
input.value="";
});
