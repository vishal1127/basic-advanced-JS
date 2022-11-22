document.title='New title'
console.log(document)
// console.log(document.all)

const header= document.getElementById('main-header')
header.style.borderBottom='solid 3px #000'

const listTitle= document.getElementsByClassName('title')
listTitle[0].style.fontWeight='bold'
listTitle[0].style.color='green'

const items= document.getElementsByClassName('list-group-item')
items[2].style.backgroundColor="green"

for(let i=0; i<items.length; i++)
{
    items[i].style.fontWeight='bold'
}