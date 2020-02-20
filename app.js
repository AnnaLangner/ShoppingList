//UI vars
const form = document.querySelector('#shopping-form');
const shoppingList = document.querySelector('.collection');
const filterItem = document.querySelector('#filter');
const clearBnt = document.querySelector('.clear-item');
const shoppingInput = document.querySelector('#item');

//Add all eventListeners
loadEventListeners();

//Event Listeners
function loadEventListeners() {
  //Add item event
  form.addEventListener('submit', addItem);
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

  //Clear input
  shoppingInput.value = '';

  e.preventDefault();
}