const form = document.querySelector('#shopping-form');
const shoppingList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBnt = document.querySelector('.clear-items');
const shoppingInput = document.querySelector('#item');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getItemsFromLocalStorage);
  form.addEventListener('submit', addItem);
  shoppingList.addEventListener('click', removeItem);  
  clearBnt.addEventListener('click', clearList);
  filter.addEventListener('keyup', filterItems);
}

function getItemsFromLocalStorage() {
  const items = getItems();

  items.forEach(function(item) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    const key = item.name;
    li.appendChild(document.createTextNode(key));  
    li.appendChild(createItemCounter(item.value));     
    li.appendChild(createRemoveButton());
    li.appendChild(createSaveButton());
    shoppingList.appendChild(li);
  });
}

function addItem(e) {
  const items = getItems();  
  if(shoppingInput.value === ''){
    alert('Add item');
    return;
  } else if (items.filter(item => item.name === shoppingInput.value).length > 0) {
    alert('Product already exist');
    return;
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(shoppingInput.value));
  li.appendChild(createItemCounter(1)); 
  li.appendChild(createRemoveButton());
  li.appendChild(createSaveButton());
  shoppingList.appendChild(li);

  storeItemInLocalStorage(shoppingInput.value, 1);

  //Clear input
  shoppingInput.value = '';

  e.preventDefault();
}

function createItemCounter(value) {
  const itemCounter = document.createElement('input');
  itemCounter.className = 'number-of-items';
  itemCounter.setAttribute("type", "number");
  itemCounter.setAttribute("value", value);
  itemCounter.setAttribute("min", 1);
  itemCounter.setAttribute('step', 1); 
  return itemCounter;
}

function createSaveButton() {
  const saveButton = document.createElement('a');
  saveButton.className = 'submit-number secondary-content'
  saveButton.innerHTML = '<i class="fa fa-save"></i>';
  saveButton.addEventListener('click', saveNumberOfItems);
  return saveButton;
}

function createRemoveButton() {
  const removeButton = document.createElement('a');
  removeButton.className = 'delete-item secondary-content';
  removeButton.innerHTML = '<i class="fa fa-remove"></i>';
  return removeButton;
}

function storeItemInLocalStorage(item, amount) {
  const items = getItems();
  let entry = new Object;
  entry.name = item;
  entry.value = amount;
  items.push(entry);

  localStorage.setItem('items', JSON.stringify(items));
}

function getItems() {
  let items;
  if(localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items;
}

function removeItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeItemFromLocalStorage(shoppingItem) {
  const items = getItems();

  items.forEach(function(item, index) {
    if(shoppingItem.textContent === item.name) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

function saveNumberOfItems(e) {
  const key = e.target.parentElement.parentElement.childNodes[0].textContent;
  const value = e.target.parentElement.parentElement.childNodes[1].value;
  const items = getItems();

  items.find(item => item.name === key).value = value;

  localStorage.setItem('items', JSON.stringify(items));
}

function clearList(e) {
  while(shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild);
  }

  clearListFromLocalStorage();
}

function clearListFromLocalStorage() {
  localStorage.clear();
}

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