class Node{
    constructor(data, next=null){
        this.data=data
        this.next=next
    }
}

class LinkedList{
    constructor(){
        this.head=null
        this.size=0
    }
    
    insertFirst(data){
        this.head=new Node(data, this.head)
        this.size++
    }

    insertLast(data){
        let node= new Node(data)
        let current

        // if ll is empty, make head
        if(!this.head)
            this.head=node
        else{
            current=this.head
            while(current.next){
                current=current.next
            }
            current.next = node
        }
        this.size++
    }

    insertAt(data, index){
        // index out of range
        if(index>0 && index > this.size)
            return
        
        let node=new Node(data)
        let current=this.head
        let previous
        let count=0
        while(count<index)
        {
            previous=current
            current=current.next
            count++
        }
        node.next=current
        previous.next=node
        this.size++

    }

    reverseList(head)
    {
        // iteratively
        // let current=this.head
        // let previous,temp
        // while(current.next)
        // {
        //     temp=current.next
        //     current.next=previous
        //     previous=current
        //     current=temp
        // }
        // current.next=previous
        // this.head=current

        //recursively
        console.log('head', head)
        if(head==null||head.next==null)
            return head
        let newHead=this.reverseList(head.next)
        let headNext=head.next
        headNext.next=head
        head.next=null
        return newHead
    }

    getAt(index)
    {
        if(index==0)
            console.log(this.head)
        
        let count=0
        let current=this.head
        while(count<index)
        {
            current=current.next
            count++
        }
        console.log(`Value at index ${index} is ${current.data}`)
    }

    removeAt(index)
    {
        let current= this.head
        if(index==0)
            this.head= current.next
        let count=0
        let previous
        while(count<index)
        {
            previous=current
            current=current.next
            count++
        }
        previous.next=current.next
        this.size--
    }

    clearList()
    {
        this.head=null
        this.size=0
    }
    
    printListData()
    {
        let current = this.head
        while(current)
        {
            console.log(current.data)
            current=current.next
        }
    }
}

let ll = new LinkedList()
ll.insertFirst(100)
ll.insertFirst(200)
ll.insertLast(300)
ll.insertAt(400,3)
// ll.printListData()
// ll.getAt(3)
// ll.removeAt(2)
ll.reverseList(ll.head)
ll.printListData()