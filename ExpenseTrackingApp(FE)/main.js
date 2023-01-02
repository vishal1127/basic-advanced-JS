//Default headers
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS, PATCH",
    "Content-Type": "application/json",
  },
};
//check for page reload and then store the data
window.addEventListener("DOMContentLoaded", getAllData);
const expenseAmt = document.getElementById("expenseInput");
const description = document.getElementById("descInput");
const category = document.getElementById("catInput");
const addBtn = document
  .getElementById("addBtn")
  .addEventListener("click", submitBtn);
const expList = document.querySelector(".expList");

var editID = false;

async function submitBtn(e) {
  e.preventDefault();
  const expense = {
    amount: expenseAmt.value,
    description: description.value,
    category: category.value,
  };
  if (editID == false) {
    try {
      const res = await axios.post("http://localhost:3000/addExpense", expense);
      //   setTimeout(() => {
      getAllData();
      //   }, 100);
      //   listExpense(res.data);
    } catch (error) {
      console.log("Error during post", error);
    }
  }
  // Edited data
  else {
    console.log("insdie else", editID);
    try {
      const res = await axios.put(
        `http://localhost:3000/updateExpense/${editID}`,
        expense
        // config
      );
      setTimeout(() => {
        getAllData();
      }, 100);
    } catch (err) {
      console.log("Error during edit", err);
    }
  }
  expenseAmt.value = "";
  description.value = "";
  category.value = "Fuel";
  editID = false;
}

//listing expenses on screen
function listExpense(expense) {
  let li = `<li class='expenseItem'  id='${expense.id}'>${expense.amount} - ${expense.description} - ${expense.category}
	<button onclick=editExpense('${expense.id}') class='btn edit btn-success btn-sm'>Edit</button>
	<button onclick=deleteExpense('${expense.id}') class='btn delete btn-danger btn-sm'>Delete</button>
	</li>`;
  expList.innerHTML = expList.innerHTML + li;
}

//edit function
async function editExpense(editId) {
  editID = editId;
  try {
    const response = await axios.get(
      `http://localhost:3000/getSingleExpense/${editId}`
    );
    console.log("affet editeding ", response.data);
    expenseAmt.value = response.data.amount;
    description.value = response.data.description;
    category.value = response.data.category;
  } catch (err) {
    console.log("Error while fetching edit data:", err);
  }
}
// delete function
async function deleteExpense(deleteId) {
  try {
    let res = await axios.delete(
      `http://localhost:3000/deleteExpense/${deleteId}`
    );
    removeExpense(deleteId);
  } catch (err) {
    console.log("Error during deletion", err);
  }
}

async function getAllData() {
  expList.innerHTML = "";
  try {
    let res = await axios.get("http://localhost:3000/getAllExpenses");
    console.log("res=------->", res.data);
    for (let i = 0; i < res.data.length; i++) {
      listExpense(res.data[i]);
    }
  } catch (err) {
    console.log("Error during fetching", err);
  }
}

function removeExpense(id) {
  let li = document.getElementById(id);
  expList.removeChild(li);
}
