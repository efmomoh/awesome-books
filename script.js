// Array to store the list of awesomeBooks
const awesomeBooks = [];

// Function to add a book
function addBook() {
  const bookTitle = document.getElementById("bookTitle").value;
  const authorName = document.getElementById("authorName").value;
  const errorMessage = document.querySelector(".feedback");

  if (bookTitle.trim() === "" || authorName.trim() === "") {
    errorMessage.textContent = '❌ Add both "Title" & "Author"!';
    return;
  }

  const book = { title: bookTitle, author: authorName };
  awesomeBooks.push(book);

  document.getElementById("bookTitle").value = "";
  document.getElementById("authorName").value = "";
  /* eslint-disable */
  updateBookList();
  /* eslint-enable */
}

// Function to remove a book
function removeBook(index) {
  awesomeBooks.splice(index, 1);
  /* eslint-disable */
  updateBookList();
  /* eslint-enable */
}

// Function to update the book list on the page
function updateBookList() {
  const bookListing = document.getElementById("bookList");
  bookListing.innerHTML = "";

  for (let i = 0; i < awesomeBooks.length; i += 1) {
    const book = awesomeBooks[i];
    const listBookItem = document.createElement("li");
    listBookItem.classList.add("lists");
    listBookItem.textContent = `Title: ${book.title}, Author: ${book.author}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", () => {
      removeBook(i);
    });

    listBookItem.appendChild(removeButton);
    bookListing.appendChild(listBookItem);
  }
}

// Add event listeners to buttons
document.getElementById("add-btn").addEventListener("click", addBook);

// Local storage / save user data locally
const locateLocalBooks = document.querySelector(".form");
const titleName = document.querySelector(".bookHeading");
const nameOfAuthor = document.querySelector(".orator");

// collect form data

// function getBookData() {
//   const bookData = {
//     titleName: titleName.value,
//     nameOfAuthor: nameOfAuthor.value,
//   };
//   return bookData;
// }

// Add an event listener to the local form storage area

locateLocalBooks.addEventListener("change", () => {
  const bookData = getBookData();
  localStorage.setItem("bookData", JSON.stringify(bookData));
});

// Add an eevnt listener to the page/window to save input data when user loads the page

window.addEventListener("load", () => {
  const data = JSON.parse(localStorage.getItem("bookData"));
  if (data) {
    titleName.value = data.titleName;
    nameOfAuthor.value = data.nameOfAuthor;
  }
});
