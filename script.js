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
      errorMessage.textContent = '⚠️ Add both "Title" & "Author"!';
      return;
    }

    const book = { title: bookTitle, author: authorName };
    this.awesomeBooks.push(book);

    document.getElementById('bookTitle').value = '';
    document.getElementById('authorName').value = '';
    /* eslint-disable */
    this.updateBookList();
    this.saveBooksToLocalStorage(); // Save the updated book list to local storage
    /* eslint-disable */
  }

  // Function to remove a book
  removeBook(index) {
    this.awesomeBooks = this.awesomeBooks.filter((_, i) => i !== index);
    /* eslint-disable */
    this.updateBookList();
    this.saveBooksToLocalStorage(); // Save the updated book list to local storage
    /* eslint-disable */
  }

  // Function to update the book list on the page
  updateBookList() {
    const bookListing = document.getElementById("bookList");
    bookListing.innerHTML = "";

    if (this.awesomeBooks.length > 0) {
      bookListing.classList.add("list-border"); // Add the border class if there are books
    } else {
      bookListing.classList.remove("list-border"); // Remove the border class if there are no books
    }

    this.awesomeBooks.forEach((book, i) => {
      const listBookItem = document.createElement("li");
      listBookItem.classList.add("lists");
      listBookItem.textContent = `Title: ${book.title}, Author: ${book.author}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
      removeButton.addEventListener("click", () => {
        this.removeBook(i);
      });

      listBookItem.appendChild(removeButton);
      bookListing.appendChild(listBookItem);
    });
  }

  // Function to save the book list to local storage
  saveBooksToLocalStorage() {
    localStorage.setItem("awesomeBooks", JSON.stringify(this.awesomeBooks));
  }

  // Load the books from local storage
  loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem("awesomeBooks");
    if (storedBooks) {
      this.awesomeBooks = JSON.parse(storedBooks);
      this.updateBookList();
    }
  }
}
const bookDirector = new AwesomeBookManager();
