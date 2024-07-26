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
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }

        // Loop melalui data buku dan buat elemen tabel untuk masing-masing
        books.forEach((book, index) => {
            // Buat elemen baris tabel
            const row = document.createElement('tr');

            const formattedRentalDate = new Date(book.rentalDate).toLocaleString('en-GB', options);

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${book.book.title}</td>
                <td>${formattedRentalDate}</td>
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
