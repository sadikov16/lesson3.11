let elList = document.querySelector("#list")
let elForm = document.querySelector("#form")
let elDeleteBtn = document.querySelectorAll("#deleteBtn")

let todosArr = [
]

elForm.addEventListener("submit", evt => {
    evt.preventDefault()
    let {todo} = evt.target.elements
    
    let newObject = {
        id: todosArr.length + 1,
        todo: todo.value.trim(),
        isColplete: false
    };
    todosArr.push(newObject)
    renderingFunc(todosArr, elList);
    todo.value = null
})


function renderingFunc(array,element){
    element.innerHTML = null;
    for(let i = 0; i < array.length; i++){
        let newLi = document.createElement("li");
        let newCheckbox = document.createElement("input");
        let newP = document.createElement("p");
        let newBtn = document.createElement("button");
        
        if (array[i].isColplete){
            newCheckbox.setAttribute("checked", "false")
        }
        
        newLi.setAttribute("class", "flex gap-16");
        newCheckbox.setAttribute("type", "checkbox");
        newBtn.setAttribute("class", "bg-red-100");
        newCheckbox.dataset.todoId = array[i].id;
        newBtn.dataset.todoId = array[i].id;
        
        newBtn.addEventListener("click", evt => {
            let btnId = evt.target.dataset.todoId;
            let founIndex = todosArr.findIndex(item => item.id == btnId)
            todosArr.splice(founIndex, 1)
            renderingFunc(todosArr, elList)
        })
        
        newCheckbox.addEventListener("click", (evt) => {
            let btnId = evt.target.dataset.todoId;
            let foundTodo = todosArr.find((item) => item.id == btnId);
            foundTodo.isComplate = !foundTodo.isComplate;
            renderingFunc(todosArr, elList);
          });

        newP.textContent = (array[i].todo);
        newBtn.textContent = "Delete"
        
        newLi.append(newCheckbox)
        newLi.append(newP)
        newLi.append(newBtn)
        
        element.append(newLi)
    }
}