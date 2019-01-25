(function()
{

//saving data in an array //inside array we will have objects

let data = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : { items: [] };

//data.items.push("new information"); 
//data.items.push("new information 2");
//console.log(data.items);
//update_local_storage()

function update_local_storage() {
    localStorage.setItem("todoList", JSON.stringify(data));
}
 
const todo = document.querySelector('#todo'); 
const completed = document.querySelector('#completed');
const item = document.querySelector('#item');
document.querySelector('#add').addEventListener("click", add_item);
item.addEventListener("keydown", function(event){
    if(event.code==="Enter"){
        //console.log(this.value); //checking to see that we grabbing input from input element 
        add_item();
    }
}); 

if(data.items) {
    for(var i=0; i<data.items.lenght; i++) {
        attach_to_dom(data.items[i]); 
    }
    todo.addEventListener("click", button_click);
    completed.addEventListener("click",button_click);
}

function button_click(event) {
    const target = event.target;
    if(target.tagName!=="BUTTON") return; 
    console.log("clicked on button");
    
    const li = target.parentNode.parentNode;
    const data_id = parseInt(li.getAttribute('data-id')); 
    if(target.className == "remove") {
        remove_item(data_id); 
        //console.log('removing item'); 
    }
    if(target.className == "complete") {
        update_item(data_id); 
        //console.log('completing item'); 
    }

update_local_storage();     
li.parentNode.removeChild(li); 
}

function remove_item(search) {
data.items = data.items.filter(function(el)
    {
        return el.id !== search;		
    });
}

function update_item(search) {
    for(var j=0; j<data.items.lenght; j++) {
        if(data.items[j].id == search) {
            data.items[j].completed =! data.items[j].completed;
            attach_to_dom(data.items[j]);
			break;
        }
    }
}

function add_item() {
    //console.log("clicked"); 
    if(!item.value) return; //if we don't have anything in our input box just return
    //console.log('entered information'); 
    let current_item = {
        id: Math.floor(Math.random()*100),
        value: item.value,
        completed: false 
    }
    data.items.push(current_item); 
    attach_to_dom(current_item); 
    item.value = ''; 
    update_local_storage(); 
}

function attach_to_dom(data) {
   const placeholder = data.completed ? completed : todo;
   placeholder.innerHTML += render(data);  
}

function render(data) {
    return (
        `<li data-id="${data.id}">${data.value}
            <div class="buttons">
                <button class="remove">&#10007;</button>
                <button class="complete">&#10004;</button>
            </div>
        </li>`

    );
}

})();