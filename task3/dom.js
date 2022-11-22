document.title='New title'
console.log(document)
// console.log(document.all)

const header= document.getElementById('main-header')
header.style.borderBottom='solid 3px #000'

const listTitle= document.getElementsByClassName('title')
listTitle[0].style.fontWeight='bold'
listTitle[0].style.color='green'

// const items= document.getElementsByClassName('list-group-item')
// items[2].style.backgroundColor="green"

// for(let i=0; i<items.length; i++)
// {
//     items[i].style.fontWeight='bold'
// }

// const items= document.getElementsByTagName('li')
// items[2].style.backgroundColor="green"

// for(let i=0; i<items.length; i++)
// {
//     items[i].style.fontWeight='bold'
// }

// const secondItem= document.querySelector('.list-group-item:nth-child(2)')
// secondItem.style.backgroundColor='green'

// const thirdItem= document.querySelector('.list-group-item:nth-child(3)')
// thirdItem.style.color='white'

// const secondItem= document.querySelectorAll('.list-group-item')
// secondItem[1].style.backgroundColor='green'

// const odd=document.querySelectorAll('li:nth-child(odd)')

// for(let i=0; i<odd.length; i++)
// {
//     odd[i].style.backgroundColor='green'
// }

const itemList= document.querySelector('#items')
itemList.parentElement.style.color='green'

console.log(itemList.firstChild)
itemList.firstElementChild.style.color='blue'

console.log(itemList.lastChild)
itemList.lastElementChild.style.color='black'

const nextSib= document.querySelector('.title')

console.log(nextSib.nextSibling)
nextSib.nextElementSibling.style.backgroundColor='grey'

const prevSib= document.querySelector('.form-inline')
console.log(prevSib.previousSibling)
prevSib.previousElementSibling.style.backgroundColor="orange"

var newDiv= document.createElement('div')
newDiv.className='new-class'
newDiv.setAttribute('title', 'hello')

var newDivText=document.createTextNode('Hello World')
newDiv.appendChild(newDivText)
var container=document.querySelector('header .container')
var h1=document.querySelector('header h1')
container.insertBefore(newDiv, h1)

var firstItem= document.querySelector('#items')
helloworldlielement='<li>Hello there!</li>'
firstItem.appendChild(helloworldlielement)

console.log(newDiv)