//Book library array
let myLibrary = []
let cardsContainer = document.querySelector(".cards-container")
let addBookButton = document.querySelector(".add-book-button")
let displayFormButton = document.querySelector(".displayFormButton")
let formElement = document.querySelector(".book-form")


//Book constructor
function Book(title, author, pages, read) {
  this.title = title
  this.pages = pages
  this.author = author
  this.read = read
  this.info = function () {
    if (this.read) {
      this.readStatus = 'Finished'
    } else {
      this.readStatus = 'Not read yet'
    }
    return `${this.readStatus}`
  }
}

//Create a book and add it to the library
function addBookToLibrary(title, author, pages, read) {
  const myBook = new Book(title, author, pages, read)
  myLibrary.push(myBook)
}

//Create the HTML for a Book card
function createBookCard(book, index) {
  let cardElement = `<div class="card" style="width: 18rem;" data-index="${index}"><div class="card-body"><h5 class="card-title">${book.title}</h5><p class="card-text">Author: ${book.author}<br>Pages: ${book.pages}<br><p class='status'>${book.info()}</p></p><button class="btn btn-danger deleteBook">Delete Book</button><button class='btn btn-secondary changeStatus'>Change read status</button></div></div>`
  cardsContainer.innerHTML += cardElement
}

//Event listener to select delete button from card
document.addEventListener("click", function (e) {
  const target = e.target.closest(".deleteBook");

  if (target) {
    let card = target.parentElement.parentElement
    let index = card.dataset.index
    deleteBookArray(index)
    card.remove()
  }
});

//Event listener to select change read status from card
document.addEventListener("click", function (e) {
  const target = e.target.closest(".changeStatus");

  if (target) {
    let card = target.parentElement.parentElement
    let index = card.dataset.index
    if (myLibrary.at(index).read) {
      myLibrary.at(index).read = false
    } else {
      myLibrary.at(index).read = true
    }
    bookStatus = card.querySelector(".status")
    bookStatus.innerHTML = myLibrary.at(index).info()
  }
});

//Create the card for every book in the library array
function displayBooks() {
  myLibrary.forEach(book => createBookCard(book))
}

function displayLastBook() {
  createBookCard(myLibrary.at(-1), myLibrary.length - 1)
}

//Create a book with the button and push it to the library
addBookButton.addEventListener('click', function (e) {
  let form = e.target.parentElement
  let title = form.title.value
  let author = form.author.value
  let pages = form.pages.value
  let read = form.read.checked
  addBookToLibrary(title, author, pages, read)
  displayLastBook()
  formElement.style.display = 'none'
  clearFormValues()
})

//Clear the add book form values
function clearFormValues() {
  formElement.title.value = ''
  formElement.author.value = ''
  formElement.pages.value = ''
  formElement.read.checked = false
}

//Display the add book form
displayFormButton.addEventListener('click', function () {
  formElement.style.display = 'block'
})

//Delete book function


//Delete book from array
function deleteBookArray(index) {
  myLibrary.splice(index, 1)
}

//Dummy book content
// const book1 = new Book('Dangerous friendships', 'Choderlos De Laclos', 384, false)
// myLibrary.push(book1)
// const book2 = new Book('The Odissey', 'Homer', 384, false)
// myLibrary.push(book2)
// const book3 = new Book('The Illiad', 'Homer', 700, false)
// myLibrary.push(book3)
// const book4 = new Book('The knight in rusty armor', 'Robert Fisher', 74, true)
// myLibrary.push(book4)

// displayBooks();
