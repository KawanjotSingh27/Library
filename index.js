const newBook=document.querySelector("#newBook");
const form=document.querySelector("#bookForm");
const dialog=document.querySelector("#showForm");
const submit=document.querySelector("#submitBtn");
const tileinput=document.querySelector("#title");
const authorinput=document.querySelector("#author");
const pagesinput=document.querySelector("#pages");
const radioButtons = document.querySelectorAll('input[name="read"]');
const books=document.querySelector("#Books");
const close=document.querySelector("svg");

const myLibrary=[["stranger","albert camus","123","yes","0"]];
displayBook();

function Book(title,author,pages,read,data){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.data=data;
    this.toggle=function(){
        if(this.read=="yes"){
            myLibrary[data][3]="no";
        }
        else if(this.read=="no"){
            myLibrary[data][3]="yes";
        }
    }
    this.remove=function(){
        myLibrary.splice(data,1);
        myLibrary.forEach((book)=>{
            if(book[4]>data){
                book[4]=book[4]-1;
            }
            
        })
    }
    this.info=function(){
        return(`${this.title} by ${this.author}, ${this.pages} pages. Read: ${this.read}`);
    }
}

function displayBook(){
    console.log(myLibrary);
    myLibrary.forEach((data)=>{
        let obj=new Book(data[0],data[1],data[2],data[3],data[4]);
        let book=obj.info();
        let display=document.createElement("div");
        let remove=document.createElement("button");
        remove.textContent="Remove";
        let toggle=document.createElement("button");
        toggle.textContent="Toggle read status";
        display.textContent=book;
        display.appendChild(toggle);
        display.appendChild(remove);
        books.appendChild(display);

        toggle.addEventListener("click",()=>{
            obj.toggle();
            while(books.firstChild) {
                books.removeChild(books.lastChild);
            }
            displayBook();
        })

        remove.addEventListener("click",()=>{
            obj.remove();
            while(books.firstChild) {
                books.removeChild(books.lastChild);
            }
            displayBook();
        })
    })
    console.log(myLibrary.length);
}

function addToBooks(title,author,pages,read){
    myLibrary.push([title,author,pages,read,myLibrary.length]);
    while(books.firstChild) {
        books.removeChild(books.lastChild);
    }
    displayBook();
}

newBook.addEventListener("click",()=>{
    dialog.showModal();
})

close.addEventListener("click",()=>{
    dialog.close();
})

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    let title=tileinput.value;
    let author=authorinput.value;
    let pages=pagesinput.value;
    let selectedValue;
    radioButtons.forEach((radio) => {
        if (radio.checked) {
            selectedValue = radio.value;
        }
    });
    addToBooks(title,author,pages,selectedValue);
    dialog.close();
})