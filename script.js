// For time and date
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const dateAndTime = document.querySelector('.date-input');

date.innerHTML = new Date().toDateString();
time.innerHTML = new Date().toLocaleTimeString();
dateAndTime.innerHTML = `${date.innerHTML}, ${time.innerHTML}`;

const addBooks = document.querySelector('.form');
const contact = document.querySelector('.contact');
const bookListing = document.getElementById('bookList');

const listPage = document.querySelector('.list-page');
const addPage = document.querySelector('.add-page');
const contactPage = document.querySelector('.contact-page');

class AwesomeBookManager {
  constructor() {
    this.awesomeBooks = [];
    this.init();
  }

  init() {
    this.loadBooksFromLocalStorage();
    document
      .getElementById('add-btn')
      .addEventListener('click', this.addBook.bind(this));
    window.addEventListener('load', this.loadBooksFromLocalStorage.bind(this));
  }

  // Function to add a book
  addBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    const authorName = document.getElementById('authorName').value;
    const errorMessage = document.querySelector('.feedback');

    if (bookTitle.trim() === '' || authorName.trim() === '') {
      errorMessage.textContent = '❌ Add both "Title" & "Author"!';
      return;
    }

    const book = { title: bookTitle, author: authorName };
    this.awesomeBooks.push(book);

    document.getElementById('bookTitle').value = '';
    document.getElementById('authorName').value = '';
    this.updateBookList();
    this.saveBooksToLocalStorage(); // Save the updated book list to local storage
  }

  // Function to remove a book
  removeBook(index) {
    this.awesomeBooks = this.awesomeBooks.filter((_, i) => i !== index);
    this.updateBookList();
    this.saveBooksToLocalStorage(); // Save the updated book list to local storage
  }

  // Function to update the book list on the page
  updateBookList() {
    const bookListing = document.getElementById('bookList');
    bookListing.innerHTML = '';

    if (this.awesomeBooks.length > 0) {
      bookListing.classList.add('list-border'); // Add the border class if there are books
    } else {
      bookListing.classList.remove('list-border'); // Remove the border class if there are no books
    }

    this.awesomeBooks.forEach((book, i) => {
      const listBookItem = document.createElement('li');
      listBookItem.classList.add('lists');
      listBookItem.textContent = `Title: ${book.title}, Author: ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-btn');
      removeButton.id = `remove-button-${i}`;
      removeButton.addEventListener('click', () => {
        this.removeBook(i);
      });

      listBookItem.appendChild(removeButton);
      bookListing.appendChild(listBookItem);
    });
  }

  // Function to save the book list to local storage
  saveBooksToLocalStorage() {
    localStorage.setItem('awesomeBooks', JSON.stringify(this.awesomeBooks));
  }

  // Load the books from local storage
  loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('awesomeBooks');
    if (storedBooks) {
      this.awesomeBooks = JSON.parse(storedBooks);
      this.updateBookList();
    }
  }
}

function initializeBookManager() {
  const bookDirector = new AwesomeBookManager();
  return bookDirector; // Return the instance with the id requirement
}

const bookDirectorWithId = initializeBookManager();
bookDirectorWithId.updateBookList();

document.addEventListener('DOMContentLoaded', initializeBookManager);

window.addEventListener('load', () => {
  const data = JSON.parse(localStorage.getItem('bookData'));
  if (data) {
    this.titleName.value = data.titleName;
    this.nameOfAuthor.value = data.nameOfAuthor;
  }
});

addBooks.style.display = 'none';
contact.style.display = 'none';
listPage.classList.add('active');

// Navigation Pages Section

// To display books
listPage.addEventListener('click', (e) => {
  e.preventDefault();
  bookListing.style.display = 'block';
  addBooks.style.display = 'none';
  contact.style.display = 'none';
  listPage.classList.add('active');
  addPage.classList.remove('active');
  contactPage.classList.remove('active');
});

// To Display Add Books

addPage.addEventListener('click', (e) => {
  e.preventDefault();
  addBooks.style.display = 'block';
  bookListing.style.display = 'none';
  contact.style.display = 'none';
  addPage.classList.add('active');
  listPage.classList.remove('active');
  contactPage.classList.remove('active');
});

// To display Contact

contactPage.addEventListener('click', (e) => {
  e.preventDefault();
  contact.style.display = 'block';
  bookListing.style.display = 'none';
  addBooks.style.display = 'none';
  contactPage.classList.add('active');
  listPage.classList.remove('active');
  addPage.classList.remove('active');
});
