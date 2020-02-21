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
    li.appendChild(document.createTextNode(item));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
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
  //Create a new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  shoppingList.appendChild(li);

  //Storage in LS
  storeItemInLocalStorage(shoppingInput.value);

  //Clear input
  shoppingInput.value = '';

  e.preventDefault();
}

//Store Item
function storeItemInLocalStorage(item) {
  let items;
  if(localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.push(item);

  localStorage.setItem('items', JSON.stringify(items));
}

//Remove Item
function removeItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

//Clear list
function clearList(e) {
  while(shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild);
  }
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