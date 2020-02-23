//UI vars
const form = document.querySelector('#shopping-form');
const shoppingList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBnt = document.querySelector('.clear-items');
const shoppingInput = document.querySelector('#item');

//Add all eventListeners
loadEventListeners();

//Event Listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getItems);
  //Add item event
  form.addEventListener('submit', addItem);
  //Remove item
  shoppingList.addEventListener('click', removeItem);  
  //Clear list
  clearBnt.addEventListener('click', clearList);
  //Filter item
  filter.addEventListener('keyup', filterItems);
}

//Get Items from LocalStorage
function getItems() {
  let items;
  if(localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function(item) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    const key = item['name'];
    li.appendChild(document.createTextNode(key));
    const itemCounter = document.createElement('input');
    itemCounter.className = 'number-of-items';
    itemCounter.setAttribute("type", "number");
    itemCounter.setAttribute("value", item['value']);
    itemCounter.setAttribute("min", 1);
    itemCounter.setAttribute('step', 1);  
    li.appendChild(itemCounter);    
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    const submit = document.createElement('a');
    submit.className = 'submit-number secondary-content';
    submit.innerHTML = '<i class="fa fa-save"></i>';
    submit.addEventListener('click', submitNumber);
    li.appendChild(submit);
    shoppingList.appendChild(li);
  });
}

//Add item
function addItem(e) {
  if(shoppingInput.value === ''){
    alert('Add item');
  }

  //Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  //Create text node and append it to li
  li.appendChild(document.createTextNode(shoppingInput.value));
  //Create an element nuber of item
  const itemCounter = document.createElement('input');
  itemCounter.className = 'number-of-items';
  itemCounter.setAttribute("type", "number");
  itemCounter.setAttribute("value", 1);
  itemCounter.setAttribute("min", 1);
  itemCounter.setAttribute('step', 1);   
  //Append the number to li
  li.appendChild(itemCounter);  
  //Create a new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //create a new submit elemet
  const submit = document.createElement('a');
  submit.className = 'submit-number secondary-content'
   //Add icon html
  submit.innerHTML = '<i class="fa fa-save"></i>';
  //Submit changes number of items
  submit.addEventListener('click', submitNumber);
  //Append the submit to li
  li.appendChild(submit);
  //Append li to ul
  shoppingList.appendChild(li);

  //Storage in LS
  storeItemInLocalStorage(shoppingInput.value, 1);

  //Clear input
  shoppingInput.value = '';

  e.preventDefault();
}

//Store Item
function storeItemInLocalStorage(item, amount) {
  let items;
  if(localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  let entry = new Object;
  entry["name"] = item;
  entry["value"] = amount;
  items.push(entry);

  localStorage.setItem('items', JSON.stringify(items));
}

//Remove Item
function removeItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from LS
function removeItemFromLocalStorage(shoppingItem) {
  let items;
  if(localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function(item, index) {
    if(shoppingItem.textContent === item.name) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

//Submit changes number of item
function submitNumber(e) {
  const key = e.target.parentElement.parentElement.childNodes[0].textContent;
  const value = e.target.parentElement.parentElement.childNodes[1].value;
  let items;
  if(localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.find(item => item['name'] === key)['value'] = value;

  localStorage.setItem('items', JSON.stringify(items));
}

//Clear list
function clearList(e) {
  while(shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild);
  }

  //clear from LS
  clearListFromLocalStorage();
}

//Clear from LS
function clearListFromLocalStorage() {
  localStorage.clear();
}

//Filter items
function filterItems(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(item) {
      const position = item.firstChild.textContent;
      if(position.toLowerCase().indexOf(text) != -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  )
}