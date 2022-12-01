const myForm= document.querySelector('#my-form')
const nameInput= document.querySelector('#name')
const emailInput= document.querySelector('#email')
const msg= document.querySelector('.msg')
const userList= document.querySelector('#users')
const list= document.querySelector('.items')

// list.firstElementChild.textContent='Hello'  
list.firstElementChild.style.background='green'
list.children[1].style.background='yellow'

myForm.addEventListener('click', onSubmit)
myForm.addEventListener('mouseover', mouseOver)
myForm.addEventListener('mouseout', mouseOut)
list.addEventListener('click', removeItem)
list.addEventListener('click', editItem)

let editPos=false

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
        if(!editPos){
            let listData=document.getElementsByTagName('li')
        // console.log(listData)
        Array.from(listData).forEach(item => {
            // console.log(item.childNodes[1].textContent)
            if(emailInput.value==item.childNodes[1].textContent)
            {
                let listItem = item.parentElement
                listItem.removeChild(item)
            }
        })
        console.log(`${nameInput.value} : ${emailInput.value}`)
        // localStorage.setItem(nameInput.value, emailInput.value)
        let userDetails= {
            name: nameInput.value,
            email: emailInput.value
        }
        let userObj = JSON.stringify(userDetails)
        localStorage.setItem(`user details of ${nameInput.value}`, userObj)
        }
        else{
            console.log('inside edit',editPos)
            editPos.childNodes[0].textContent=nameInput.value
            editPos.childNodes[1].textContent=emailInput.value
            editPos=false
        }
        let li = document.createElement('li')
        li.classList='item'
        li.appendChild(document.createTextNode(nameInput.value+' '))
        list.appendChild(li)
        li.appendChild(document.createTextNode(emailInput.value))
        list.appendChild(li)
        let delBtn = document.createElement('button')
        delBtn.classList='delete'
        delBtn.append(document.createTextNode('X'))
        li.appendChild(delBtn)
        let editBtn = document.createElement('button')
        editBtn.classList='edit'
        editBtn.append(document.createTextNode('Edit'))
        li.appendChild(editBtn)
    }
}

function removeItem(e){
    // console.log('delete clicked')
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        list.removeChild(li);
      }
    }
  }

function editItem(e){
    if(e.target.classList.contains('edit')){
        // console.log(e.target.parentElement.childNodes[1].textContent)
        nameInput.value=e.target.parentElement.childNodes[0].textContent
        emailInput.value=e.target.parentElement.childNodes[1].textContent
        editPos=e.target.parentElement
    }
}