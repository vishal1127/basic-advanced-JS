//Default headers
const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, PATCH',
		'Content-Type': 'application/json',
	},
};
//check for page reload and then store the data
window.addEventListener('DOMContentLoaded', getAllData);
const expenseAmt = document.getElementById('expenseInput');
const desc = document.getElementById('descInput');
const category = document.getElementById('catInput');
const addBtn = document
	.getElementById('addBtn')
	.addEventListener('click', submitBtn);
const expList = document.querySelector('.expList');

var editID = false;

function submitBtn(e) {
	e.preventDefault();
	const expense = {
		amount: expenseAmt.value,
		desc: desc.value,
		category: category.value,
	};
	if (editID == false) {
		axios
			.post(
				'https://crudcrud.com/api/3044d172d5f84ffcab4456fd621a7f61/expenseData',
				expense
			)
			.then((res) => {
				listExpense(res.data);
			})
			.catch((err) => console.log('Error during post', err));
	}
	// Edited data
	else {
		axios
			.put(
				`https://crudcrud.com/api/3044d172d5f84ffcab4456fd621a7f61/expenseData/${editID}`,
				expense
				// config
			)
			.then(() => {
				let li = document.getElementById(editID);
				li.outerHTML = `<li class='expenseItem'  id='${expense._id}'>${expense.amount} - ${expense.desc} - ${expense.category}
				<button onclick=editExpense('${expense._id}') class='btn edit btn-success btn-sm'>Edit</button>
				<button onclick=deleteExpense('${expense._id}') class='btn delete btn-danger btn-sm'>Delete</button>
				</li>`;
				editID = false;
			})
			.catch((err) => console.log('Error during edit', err));
	}
	expenseAmt.value = '';
	desc.value = '';
	category.value = 'Fuel';
}
//listing expenses on screen
function listExpense(expense) {
	let li = `<li class='expenseItem'  id='${expense._id}'>${expense.amount} - ${expense.desc} - ${expense.category}
	<button onclick=editExpense('${expense._id}') class='btn edit btn-success btn-sm'>Edit</button>
	<button onclick=deleteExpense('${expense._id}') class='btn delete btn-danger btn-sm'>Delete</button>
	</li>`;
	expList.innerHTML = expList.innerHTML + li;
}
//edit function
async function editExpense(editId) {
	editID = editId;
	const data = await new Promise((resolve, reject) => {
		axios
			.get(
				`https://crudcrud.com/api/3044d172d5f84ffcab4456fd621a7f61/expenseData/${editId}`
			)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => console.log('Error while fetching edit data:', err));
	});
	expenseAmt.value = data.amount;
	desc.value = data.desc;
	category.value = data.category;
}
// delete function
function deleteExpense(deleteId) {
	axios
		.delete(
			`https://crudcrud.com/api/3044d172d5f84ffcab4456fd621a7f61/expenseData/${deleteId}`
		)
		.then(() => {
			removeExpense(deleteId);
		})
		.catch((err) => console.log('Error during deletion', err));
}

function getAllData() {
	axios
		.get(
			'https://crudcrud.com/api/3044d172d5f84ffcab4456fd621a7f61/expenseData'
		)
		.then((res) => {
			for (let i = 0; i < res.data.length; i++) {
				listExpense(res.data[i]);
			}
		});
}

function removeExpense(id) {
	let li = document.getElementById(id);
	expList.removeChild(li);
}
