//Book library array
let myLibrary = [];
let cardsContainer = document.querySelector(".cards-container");
let addBookButton = document.querySelector(".add-book-button");
let displayFormButton = document.querySelector(".displayFormButton");
let formElement = document.querySelector(".book-form");

class Book {
  constructor(title, pages, author, read) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.read = read;
    this.info = function () {
      this.read === true
        ? (this.readStatus = "Finished")
        : (this.readStatus = "Not read yet");
      return `${this.readStatus}`;
    };
  }

  addToLibrary() {
    myLibrary.push(this);
  }

  createBookCard(index) {
    let cardElement = `<div class="card" style="width: 18rem;" data-index="${index}"><div class="card-body"><h5 class="card-title">${
      this.title
    }</h5><p class="card-text">Author: ${this.author}<br>Pages: ${
      this.pages
    }<br><p class='status'>${this.info()}</p></p><button class="btn btn-danger deleteBook">Delete Book</button><button class='btn btn-secondary changeStatus'>Change read status</button></div></div>`;
    cardsContainer.innerHTML += cardElement;
  }
}

//Event listener to select delete button from card
document.addEventListener("click", function (e) {
  const target = e.target.closest(".deleteBook");

  if (target) {
    let card = target.parentElement.parentElement;
    let index = card.dataset.index;
    deleteBookArray(index);
    card.remove();
  }
});

//Event listener to select change read status from card
document.addEventListener("click", function (e) {
  const target = e.target.closest(".changeStatus");

  if (target) {
    let card = target.parentElement.parentElement;
    let index = card.dataset.index;
    if (myLibrary.at(index).read) {
      myLibrary.at(index).read = false;
    } else {
      myLibrary.at(index).read = true;
    }
    bookStatus = card.querySelector(".status");
    bookStatus.innerHTML = myLibrary.at(index).info();
  }
});

//Create the card for every book in the library array
function displayBooks() {
  myLibrary.forEach((book, index) => book.createBookCard(index));
}

function displayLastBook() {
  myLibrary.at(-1).createBookCard(myLibrary.length - 1);
}

//Create a book with the button and push it to the library
addBookButton.addEventListener("click", function (e) {
  e.preventDefault();
  let form = e.target.parentElement;
  let book = new Book(
    form.title.value,
    form.pages.value,
    form.author.value,
    form.read.checked
  );
  book.addToLibrary();
  displayLastBook();
  formElement.style.display = "none";
  clearFormValues();
});

//Clear the add book form values
function clearFormValues() {
  formElement.title.value = "";
  formElement.author.value = "";
  formElement.pages.value = "";
  formElement.read.checked = false;
}

//Display the add book form
displayFormButton.addEventListener("click", function () {
  formElement.style.display = "block";
});

//Delete book function

//Delete book from array
function deleteBookArray(index) {
  myLibrary.splice(index, 1);
}
