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

async function submitBtn(e) {
	e.preventDefault();
	const expense = {
		amount: expenseAmt.value,
		desc: desc.value,
		category: category.value,
	};
	if (editID == false) {
		try {
			const res = await axios.post(
				'https://crudcrud.com/api/7c7a6be60d044571b596d4729a2d4eed/expenseData',
				expense
			);
			listExpense(res.data);
		} catch (error) {
			console.log('Error during post', error);
		}
		// .then((res) => {
		// 	listExpense(res.data);
		// })
		// .catch((err) => console.log('Error during post', err));
	}
	// Edited data
	else {
		try {
			const res = await axios.put(
				`https://crudcrud.com/api/7c7a6be60d044571b596d4729a2d4eed/expenseData/${editID}`,
				expense
				// config
			);
			let li = document.getElementById(editID);
			li.outerHTML = `<li class='expenseItem'  id='${expense._id}'>${expense.amount} - ${expense.desc} - ${expense.category}
				<button onclick=editExpense('${expense._id}') class='btn edit btn-success btn-sm'>Edit</button>
				<button onclick=deleteExpense('${expense._id}') class='btn delete btn-danger btn-sm'>Delete</button>
				</li>`;
			editID = false;
		} catch (err) {
			console.log('Error during edit', err);
		}
		// .then(() => {
		// 	let li = document.getElementById(editID);
		// 	li.outerHTML = `<li class='expenseItem'  id='${expense._id}'>${expense.amount} - ${expense.desc} - ${expense.category}
		// 	<button onclick=editExpense('${expense._id}') class='btn edit btn-success btn-sm'>Edit</button>
		// 	<button onclick=deleteExpense('${expense._id}') class='btn delete btn-danger btn-sm'>Delete</button>
		// 	</li>`;
		// 	editID = false;
		// })
		// .catch((err) => console.log('Error during edit', err));
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
	try {
		const data = await axios.get(
			`https://crudcrud.com/api/7c7a6be60d044571b596d4729a2d4eed/expenseData/${editId}`
		);
		expenseAmt.value = data.data.amount;
		desc.value = data.data.desc;
		category.value = data.data.category;
	} catch (err) {
		console.log('Error while fetching edit data:', err);
	}
	// const data = await new Promise((resolve, reject) => {
	// 	axios
	// 		.get(
	// 			`https://crudcrud.com/api/7c7a6be60d044571b596d4729a2d4eed/expenseData/${editId}`
	// 		)
	// 		.then((res) => {
	// 			resolve(res.data);
	// 		})
	// 		.catch((err) => console.log('Error while fetching edit data:', err));
	// });
}
// delete function
async function deleteExpense(deleteId) {
	try {
		let res = await axios.delete(
			`https://crudcrud.com/api/7c7a6be60d044571b596d4729a2d4eed/expenseData/${deleteId}`
		);
		removeExpense(deleteId);
	} catch (err) {
		console.log('Error during deletion', err);
	}
	// .then(() => {
	// 	removeExpense(deleteId);
	// })
	// .catch((err) => console.log('Error during deletion', err));
}

async function getAllData() {
	try {
		let res = await axios.get(
			'https://crudcrud.com/api/7c7a6be60d044571b596d4729a2d4eed/expenseData'
		);
		for (let i = 0; i < res.data.length; i++) {
			listExpense(res.data[i]);
		}
	} catch (err) {
		console.log('Error during fetching', err);
	}
	// .then((res) => {
	// 	for (let i = 0; i < res.data.length; i++) {
	// 		listExpense(res.data[i]);
	// 	}
	// });
}

function removeExpense(id) {
	let li = document.getElementById(id);
	expList.removeChild(li);
}
