const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");
const list = document.querySelector(".items");
const submitBtn = document.querySelector(".btn");
let listData = document.getElementsByTagName("li");
let allData;
// list.firstElementChild.textContent='Hello'
list.firstElementChild.style.background = "green";
list.children[1].style.background = "yellow";

submitBtn.addEventListener("click", onSubmit);
myForm.addEventListener("mouseover", mouseOver);
myForm.addEventListener("mouseout", mouseOut);
// list.addEventListener("click", removeItem);
// list.addEventListener("click", editItem);
window.addEventListener("DOMContentLoaded", showUsers);

function mouseOut(e) {
  e.preventDefault();
  myForm.style.background = "#cac";
}

function mouseOver(e) {
  e.preventDefault();
  myForm.style.background = "#ccc";
}
let editId = false;

function onSubmit(e) {
  e.preventDefault();
  let userExist = false;
  myForm.style.background = "#cbc";
  if (nameInput.value === "" || emailInput.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please fill all fields";

    setTimeout(() => msg.remove(), 3000);
  }
  //SENDING DATA THROUGH POST
  else {
    let userDetails = {
      name: nameInput.value,
      email: emailInput.value,
    };
    if (!editId) {
      //SENDING POST REQUEST TO CRUD CRUD API
      // Array.from(listData).forEach((item) => {
      //   if (emailInput.value == item.childNodes[1].textContent) {
      //     userExist = true;
      //     msg.classList.add("error");
      //     msg.innerHTML = "This user already has an appointment";
      //     setTimeout(() => msg.remove(), 3000);
      //   }
      // });
      if (userExist == false) {
        axios
          .post("http://localhost:8080/postUser", userDetails)
          .then(() => {
            showUsers();
          })
          .catch((err) => console.log(err));
      }
    } else {
      axios
        .put(`http://localhost:8080/updateUser/${editId}`, userDetails)
        .then(() => {
          showUsers();
        })
        .catch((err) => console.log(err));
    }
  }
  editId = false;
  userExist = false;
}

function showUsers() {
  list.innerHTML = "";
  axios
    .get("http://localhost:8080/getUsers")
    .then((res) => {
      allData = res.data;
      addToList(allData);
    })
    .catch((err) => console.log(err));
}

function addToList(data) {
  Array.from(data).forEach((item) => {
    console.log("item", item.name);
    let li = document.createElement("li");
    li.innerHTML = `<li class='item'  id='${item.id}'>${item.name} - ${item.email}
    <button onclick=removeItem('${item.id}') class='delete'>Delete</button>
    <button onclick=editItem('${item.id}') class='edit'>Edit</button>
				</li>`;
    list.appendChild(li);
  });
}

function editItem(id) {
  axios
    .get(`http://localhost:8080/getEditUser/${id}`)
    .then((user) => {
      console.log("user------>edit", user.data);
      nameInput.value = user.data.name;
      emailInput.value = user.data.email;
      editId = user.data.id;
    })
    .catch((err) => console.log(err));
}

function removeItem(id) {
  console.log("delete clicked", id);
  if (confirm("Are You Sure?")) {
    axios
      .delete(`http://localhost:8080/deleteUser/${id}`)
      .then(() => {
        console.log("inside deleteeeee");
        showUsers();
      })
      .catch((err) => console.log(`Error on delete:${err}`));
  }
}
