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

const secondItem= document.querySelectorAll('.list-group-item')
secondItem[1].style.backgroundColor='green'

const odd=document.querySelectorAll('li:nth-child(odd)')

for(let i=0; i<odd.length; i++)
{
    odd[i].style.backgroundColor='green'
}