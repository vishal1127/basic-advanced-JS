const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const list = document.querySelector('.items');
const submitBtn = document.querySelector('.btn');
let listData = document.getElementsByTagName('li');
let allData;
// list.firstElementChild.textContent='Hello'
list.firstElementChild.style.background = 'green';
list.children[1].style.background = 'yellow';

submitBtn.addEventListener('click', onSubmit);
myForm.addEventListener('mouseover', mouseOver);
myForm.addEventListener('mouseout', mouseOut);
list.addEventListener('click', removeItem);
list.addEventListener('click', editItem);
window.addEventListener('DOMContentLoaded', showUsers);
let editPos = false;

function mouseOut(e) {
	e.preventDefault();
	myForm.style.background = '#cac';
}

function mouseOver(e) {
	e.preventDefault();
	myForm.style.background = '#ccc';
}

function onSubmit(e) {
	e.preventDefault();
	let userExist = false;
	myForm.style.background = '#cbc';
	if (nameInput.value === '' || emailInput.value === '') {
		msg.classList.add('error');
		msg.innerHTML = 'Please fill all fields';

		setTimeout(() => msg.remove(), 3000);
	}
	//SENDING DATA THROUGH POST
	else {
		if (!editPos) {
			//SENDING POST REQUEST TO CRUD CRUD API
			Array.from(listData).forEach((item) => {
				if (emailInput.value == item.childNodes[1].textContent) {
					userExist = true;
					msg.classList.add('error');
					msg.innerHTML = 'This user already has an appointment';
					setTimeout(() => msg.remove(), 3000);
				}
			});
			if (userExist == false) {
				let userDetails = {
					name: nameInput.value,
					email: emailInput.value,
				};
				axios
					.post(
						' https://crudcrud.com/api/fb24a18a988e461ea9651a842e064a33/appointmentData',
						userDetails
					)
					.then(() => {
						addItem();
					})
					.catch((err) => console.log(err));
			}
		} else {
			console.log('inside edit', editPos.childNodes[1].textContent);
			let element = editPos;
			let editId;
			allData.forEach((item) => {
				if (editPos.childNodes[1].textContent == item.email) editId = item._id;
			});
			let updatedDetails = {
				name: nameInput.value,
				email: emailInput.value,
			};
			axios
				.put(
					`https://crudcrud.com/api/fb24a18a988e461ea9651a842e064a33/appointmentData/${editId}`,
					updatedDetails
				)
				.then(() => {
					element.childNodes[0].textContent = `${nameInput.value} `;
					element.childNodes[1].textContent = emailInput.value;
				})
				.catch((err) => console.log(`Error on edit:${err}`));
		}
	}
	editPos = false;
	userExist = false;
	// else{
	//     if(!editPos){
	//         let listData=document.getElementsByTagName('li')
	//     // console.log(listData)
	//     Array.from(listData).forEach(item => {
	//         // console.log(item.childNodes[1].textContent)
	//         if(emailInput.value==item.childNodes[1].textContent)
	//         {
	//             let listItem = item.parentElement
	//             listItem.removeChild(item)
	//         }
	//     })
	//     console.log(`${nameInput.value} : ${emailInput.value}`)
	//     // localStorage.setItem(nameInput.value, emailInput.value)
	//     let userDetails= {
	//         name: nameInput.value,
	//         email: emailInput.value
	//     }
	//     let userObj = JSON.stringify(userDetails)
	//     localStorage.setItem(`user details of ${nameInput.value}`, userObj)
	//     }
	//     else{
	//         console.log('inside edit',editPos)
	//         editPos.childNodes[0].textContent=nameInput.value
	//         editPos.childNodes[1].textContent=emailInput.value
	//         editPos=false
	//     }
	//     let li = document.createElement('li')
	//     li.classList='item'
	//     li.appendChild(document.createTextNode(nameInput.value+' '))
	//     list.appendChild(li)
	//     li.appendChild(document.createTextNode(emailInput.value))
	//     list.appendChild(li)
	//     let delBtn = document.createElement('button')
	//     delBtn.classList='delete'
	//     delBtn.append(document.createTextNode('X'))
	//     li.appendChild(delBtn)
	//     let editBtn = document.createElement('button')
	//     editBtn.classList='edit'
	//     editBtn.append(document.createTextNode('Edit'))
	//     li.appendChild(editBtn)
	// }
}
function addItem() {
	Array.from(listData).forEach((item) => {
		if (emailInput.value == item.childNodes[1].textContent) {
			let listItem = item.parentElement;
			listItem.removeChild(item);
		}
	});
	console.log(`${nameInput.value} : ${emailInput.value}`);
	let userDetails = {
		name: nameInput.value,
		email: emailInput.value,
	};
	let userObj = JSON.stringify(userDetails);
	localStorage.setItem(`user details of ${nameInput.value}`, userObj);
	let li = document.createElement('li');
	li.classList = 'item';
	li.appendChild(document.createTextNode(nameInput.value + ' '));
	list.appendChild(li);
	li.appendChild(document.createTextNode(emailInput.value));
	list.appendChild(li);
	let delBtn = document.createElement('button');
	delBtn.classList = 'delete';
	delBtn.append(document.createTextNode('X'));
	li.appendChild(delBtn);
	let editBtn = document.createElement('button');
	editBtn.classList = 'edit';
	editBtn.append(document.createTextNode('Edit'));
	li.appendChild(editBtn);
}
function showUsers() {
	axios
		.get(
			' https://crudcrud.com/api/fb24a18a988e461ea9651a842e064a33/appointmentData'
		)
		.then((res) => {
			console.log(res);
			allData = res.data;
			Array.from(allData).forEach((item) => {
				console.log('item', item.name);
				let li = document.createElement('li');
				li.classList = 'item';
				li.appendChild(document.createTextNode(item.name + ' '));
				list.appendChild(li);
				li.appendChild(document.createTextNode(item.email));
				list.appendChild(li);
				let delBtn = document.createElement('button');
				delBtn.classList = 'delete';
				delBtn.append(document.createTextNode('X'));
				li.appendChild(delBtn);
				let editBtn = document.createElement('button');
				editBtn.classList = 'edit';
				editBtn.append(document.createTextNode('Edit'));
				li.appendChild(editBtn);
			});
		})
		.catch((err) => console.log(err));
}

function editItem(e) {
	if (e.target.classList.contains('edit')) {
		// console.log(e.target.parentElement.childNodes[1].textContent)
		nameInput.value = e.target.parentElement.childNodes[0].textContent;
		emailInput.value = e.target.parentElement.childNodes[1].textContent;
		editPos = e.target.parentElement;
	}
}
function removeItem(e) {
	console.log(
		'delete clicked',
		e.target.parentElement.childNodes[1].textContent
	);
	let emailId = e.target.parentElement.childNodes[1].textContent;
	let deleteId;
	allData.forEach((item) => {
		console.log('-------->', item);
		if (emailId == item.email) deleteId = item._id;
	});
	if (e.target.classList.contains('delete')) {
		if (confirm('Are You Sure?')) {
			axios
				.delete(
					`https://crudcrud.com/api/fb24a18a988e461ea9651a842e064a33/appointmentData/${deleteId}`
				)
				.then(() => {
					var li = e.target.parentElement;
					list.removeChild(li);
				})
				.catch((err) => console.log(`Error on delete:${err}`));
		}
	}
}
