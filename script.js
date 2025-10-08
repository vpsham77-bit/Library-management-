const books = [];
const members = [];
const transactions = [];

document.getElementById("bookForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("bookName").value.trim();
  const id = document.getElementById("bookId").value.trim();

  books.push({ name, id, isBorrowed: false });
  displayBooks();
  e.target.reset();
});

document.getElementById("memberForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("memberName").value.trim();
  const id = document.getElementById("memberId").value.trim();

  members.push({ name, id });
  displayMembers();
  e.target.reset();
});

document.getElementById("borrowForm").addEventListener("submit", e => {
  e.preventDefault();
  const memberId = document.getElementById("borrowMemberId").value.trim();
  const bookId = document.getElementById("borrowBookId").value.trim();
  const action = document.getElementById("borrowAction").value;

  const member = members.find(m => m.id === memberId);
  const book = books.find(b => b.id === bookId);

  if (!member) return alert("❌ Member ID not found!");
  if (!book) return alert("❌ Book ID not found!");

  if (action === "borrow") {
    if (book.isBorrowed) return alert("⚠ Book already borrowed!");
    book.isBorrowed = true;
    transactions.push({ memberId, bookId, action: "borrowed", date: new Date().toLocaleString() });
  } else {
    if (!book.isBorrowed) return alert("⚠ Book is not borrowed!");
    book.isBorrowed = false;
    transactions.push({ memberId, bookId, action: "returned", date: new Date().toLocaleString() });
  }

  displayTransactions();
  displayBooks();
  e.target.reset();
});

function displayBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = books.map(b => <li>${b.name} (ID: ${b.id}) — ${b.isBorrowed ? "📕 Borrowed" : "📗 Available"}</li>).join("");
}

function displayMembers() {
  const list = document.getElementById("memberList");
  list.innerHTML = members.map(m => <li>${m.name} (ID: ${m.id})</li>).join("");
}

function displayTransactions() {
  const list = document.getElementById("transactionList");
  list.innerHTML = transactions.map(t => <li>${t.date} — Member ID ${t.memberId} ${t.action} Book ID ${t.bookId}</li>).join("");
}