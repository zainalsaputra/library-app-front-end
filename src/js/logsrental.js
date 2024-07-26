import axios from 'axios';

// axios.defaults.withCredentials = true;
// URL API
const apiUrl = 'http://localhost:5000/books';

// Fungsi untuk mengembalikan buku
async function returnBook(bookId) {
    try {
        const response = await axios.put(`${apiUrl}/return/${bookId}`);
        console.log('Book returned:', response.data);
        Swal.fire({
            title: 'Success!',
            text: 'Book returned successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Error returning book:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to return book: ' + (error.response ? error.response.data.message : error.message),
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Fungsi untuk mengambil dan menampilkan buku
async function fetchAndDisplayBooks() {
    try {
        const response = await axios.get(`${apiUrl}/rental`);
        const books = response.data.data;

        const tableBody = document.getElementById('table-body');

        tableBody.innerHTML = '';

        books.forEach((book, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${book.book.title}</td>
                <td>${book.rentalDate}</td>
                <td><button class="btn btn-primary" id="returnButton-${book.id}">Return</button></td>
            `;

            tableBody.appendChild(row);

            const returnButton = document.getElementById(`returnButton-${book.id}`);
            returnButton.addEventListener('click', () => returnBook(book.id));
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Panggil fungsi saat halaman dimuat
window.onload = fetchAndDisplayBooks;
