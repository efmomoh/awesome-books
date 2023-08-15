// Array to store the list of awesomeBooks
let awesomeBooks = [];

// Function to add a book
function addBook() {
  const bookTitle = document.getElementById('bookTitle').value;
  const authorName = document.getElementById('authorName').value;
  const errorMessage = document.querySelector('.feedback');

  if (bookTitle.trim() === '' || authorName.trim() === '') {
    errorMessage.textContent = '❌ Add both "Title" & "Author"!';
    return;
  }

  const book = { title: bookTitle, author: authorName };
  awesomeBooks.push(book);

  document.getElementById('bookTitle').value = '';
  document.getElementById('authorName').value = '';

  updateBookList();
  saveBooksToLocalStorage(); // Save the updated book list to local storage
}

// Function to remove a book
function removeBook(index) {
  awesomeBooks = awesomeBooks.filter((_, i) => i !== index);
  updateBookList();
  saveBooksToLocalStorage(); // Save the updated book list to local storage
}

// Function to update the book list on the page
function updateBookList() {
  const bookListing = document.getElementById('bookList');
  bookListing.innerHTML = '';

  awesomeBooks.forEach((book, i) => {
    const listBookItem = document.createElement('li');
    listBookItem.classList.add('lists');
    listBookItem.textContent = `Title: ${book.title}, Author: ${book.author}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', () => {
      removeBook(i);
    });

    listBookItem.appendChild(removeButton);
    bookListing.appendChild(listBookItem);
  });
}

// Function to save the book list to local storage
function saveBooksToLocalStorage() {
  localStorage.setItem('awesomeBooks', JSON.stringify(awesomeBooks));
}

// Load the books from local storage
function loadBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem('awesomeBooks');
  if (storedBooks) {
    awesomeBooks = JSON.parse(storedBooks);
    updateBookList();
  }
}

// Add event listeners to buttons
document.getElementById('add-btn').addEventListener('click', addBook);

// Load stored books when the page loads
window.addEventListener('load', () => {
  loadBooksFromLocalStorage();
});