let tasks=[];
const addTask=()=>{
    const taskInput=document.getElementById('taskInput');
    const text=taskInput.ariaValueMax.trim();
    if (text){
        tasks.push({text:text,completed:false});
        updateTasksList();
    }
};

const updateTasksList=()=>{
    const taskList=document.getElementById("taskList");
    taskList.innerHTML="";
    
    tasks.forEach((task)=>{
        const listItem=document.createElement("li");

        listItem.innerHTML=`
        <div className="taskItem">
            <div className="task">
                <input type="text" className="checkbox" />
                <p>Finsh this project</p>
            </div>
            <div class="icons">
                <img src="./images/edit.png">
                <img src="./images/delete.png">
            </div>
        </div>
        `;
        
        taskList.append(listItem);
    })
}

const button=document.getElementById("newTask");
button.addEventListener("click",function(e){
    e.preventDefault()
    addTask()
});