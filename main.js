const myForm= document.querySelector('#my-form')
const nameInput= document.querySelector('#name')
const emailInput= document.querySelector('#email')
const msg= document.querySelector('.msg')
const userList= document.querySelector('#users')
const list= document.querySelector('.items')

list.firstElementChild.textContent='Hello'  
list.firstElementChild.style.background='green'
list.children[1].style.background='yellow'

myForm.addEventListener('click', onSubmit)
myForm.addEventListener('mouseover', mouseOver)
myForm.addEventListener('mouseout', mouseOut)

function mouseOut(e){
    e.preventDefault()
    myForm.style.background='#cac'
}

function mouseOver(e){
    e.preventDefault()
    myForm.style.background='#ccc'
}

function onSubmit(e){
    e.preventDefault()
    myForm.style.background='#cbc'
    if(nameInput.value==='' || emailInput.value==='')
    {
        msg.classList.add('error')
        msg.innerHTML='Please fill all fields'

        setTimeout(() => msg.remove(), 3000)
    }
    else{
        console.log(`${nameInput.value} : ${emailInput.value}`)
        // localStorage.setItem(nameInput.value, emailInput.value)
        let userDetails= {
            name: nameInput.value,
            email: emailInput.value
        }
        let li = document.createElement('li')
        li.classList='item'
        li.appendChild(document.createTextNode(nameInput.value+' '))
        list.appendChild(li)
        li.appendChild(document.createTextNode(emailInput.value))
        list.appendChild(li)
        let userObj = JSON.stringify(userDetails)
        localStorage.setItem(`user details of ${nameInput.value}`, userObj)
    }
}