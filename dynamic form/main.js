const expenseAmt = document.getElementById('expenseInput');
const desc = document.getElementById('descInput');
const category = document.getElementById('catInput');
const addBtn = document
	.getElementById('addBtn')
	.addEventListener('click', submitBtn);
const expList = document.querySelector('.expList');

expList.addEventListener('click', editClick);
expList.addEventListener('click', delClick);

let editPos = false;

function submitBtn(e) {
	e.preventDefault();
	const expense = `${expenseAmt.value}-${desc.value}-${category.value}`;
	if (editPos) {
		editPos.textContent = `${expense}-->`;
		//creating list edit btn
		let editBtn = document.createElement('button');
		editBtn.classList = 'btn edit btn-success btn-sm';
		editBtn.appendChild(document.createTextNode('Edit'));
		editPos.appendChild(editBtn);
		//creating list del btn
		let delBtn = document.createElement('button');
		delBtn.classList = 'btn delete btn-danger btn-sm';
		delBtn.appendChild(document.createTextNode('Delete'));
		editPos.appendChild(delBtn);
		editPos = false;
	} else {
		localStorage.setItem(`${expense}`, expense);
		//creating list item
		const li = document.createElement('li');
		li.appendChild(document.createTextNode(`${expense}-->`));
		expList.appendChild(li);
		//creating list edit btn
		let editBtn = document.createElement('button');
		editBtn.classList = 'btn edit btn-success btn-sm';
		editBtn.appendChild(document.createTextNode('Edit'));
		li.appendChild(editBtn);
		//creating list del btn
		let delBtn = document.createElement('button');
		delBtn.classList = 'btn delete btn-danger btn-sm';
		delBtn.appendChild(document.createTextNode('Delete'));
		li.appendChild(delBtn);
	}
	expenseAmt.value = '';
	desc.value = '';
	category.value = 'Fuel';
}
//edit function
function editClick(e) {
	if (e.target.classList.contains('edit')) {
		const listContent = e.target.parentElement.textContent.split('-');
		expenseAmt.value = listContent[0];
		desc.value = listContent[1];
		category.value = listContent[2];
		editPos = e.target.parentElement;
	}
}
// delete function
function delClick(e) {
	if (e.target.classList.contains('delete')) {
		var li = e.target.parentElement;
		expList.removeChild(li);
		localStorage.removeItem(e.target.parentElement.textContent.split('--')[0]);
	}
}
//check for page reload and then store the data
const pageAccessedByReload =
	(window.performance.navigation && window.performance.navigation.type === 1) ||
	window.performance
		.getEntriesByType('navigation')
		.map((nav) => nav.type)
		.includes('reload');
if (pageAccessedByReload) {
	const items = { ...localStorage };
	const keys = Object.keys(items);
	for (let i = keys.length - 1; i >= 0; i--) {
		const li = document.createElement('li');
		li.appendChild(document.createTextNode(`${items[keys[i]]}-->`));
		expList.appendChild(li);
		//creating list edit btn
		let editBtn = document.createElement('button');
		editBtn.classList = 'btn edit btn-success btn-sm';
		editBtn.appendChild(document.createTextNode('Edit'));
		li.appendChild(editBtn);
		//creating list del btn
		let delBtn = document.createElement('button');
		delBtn.classList = 'btn delete btn-danger btn-sm';
		delBtn.appendChild(document.createTextNode('Delete'));
		li.appendChild(delBtn);
	}
}
