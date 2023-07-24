localStorage.clear();   //clearing the Local Storage

var button=document.getElementById("button");
button.addEventListener('click', addItemToList);

//KEY COUNTER
var key=0;

function addItemToList(e)
{
    var amount=document.getElementById("amount").value;
    var selected=document.getElementById("selection").value;
    var detail=document.getElementById("detail").value;

    var li=document.createElement("li");
    li.setAttribute("id",key);
    var TextNode=document.createTextNode(amount+" "+selected+" "+detail+" ");
    li.appendChild(TextNode);

    //NEW DELETE BUTTON
    var newButton=document.createElement('button');
    newButton.setAttribute("class","btn btn-danger btn-sm float-right delete");
    newButton.appendChild(document.createTextNode('Delete'));

    //NEW EDIT BUTTON
    var editButton=document.createElement('button');
    editButton.setAttribute("class","btn btn-danger btn-sm float-right edit");
    editButton.appendChild(document.createTextNode('Edit'));

    var list=document.getElementById("items");
    li.appendChild(newButton);
    li.appendChild(editButton);
    list.appendChild(li);

    //ADDING TO LOCAL STORAGE
    var obj={
        amount: amount,
        selected: selected,
        detail: detail
    };
    localStorage.setItem(key++,JSON.stringify(obj));
}

//DELETE BUTTON
var itemList=document.getElementById("items");
itemList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;
          itemList.removeChild(li);
          localStorage.removeItem(`${li.id}`);
        }
    }
});

//EDIT BUTTON
itemList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('edit'))
    {
        var li = e.target.parentElement;
        itemList.removeChild(li);
        var obj=JSON.parse(localStorage.getItem(`${li.id}`));
        document.getElementById("amount").value=obj.amount;
        document.getElementById("selection").value=obj.selected;
        document.getElementById("detail").value=obj.detail;
        localStorage.removeItem(`${li.id}`);
    }
});