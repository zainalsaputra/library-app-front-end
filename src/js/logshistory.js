import axios from 'axios';

axios.defaults.withCredentials = true;
// URL API
const apiUrl = 'http://localhost:5000/books/rental/logs';

async function fetchAndDisplayBooks() {
    try {
        // Ambil data dari API
        const response = await axios.get(apiUrl);
        const books = response.data.data;

        // Dapatkan elemen tbody untuk tabel
        const tableBody = document.getElementById('table-body');

        // Hapus baris tabel yang ada jika ada
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
            const formattedReturnDate = book.returnDate ? new Date(book.returnDate).toLocaleString('en-GB', options) : 'N/A';

            // Tambahkan isi baris tabel
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${book.book.title}</td>
                <td>${formattedRentalDate}</td>
                <td>${formattedReturnDate}</td>
                <td>${book.status ? 'active' : 'returned'}</td >
        `;

            // <td><button class="details-btn" onclick="rentalBook('${book.id}')">Rental Book</button></td>
            // Tambahkan baris ke tbody
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        // Tangani kesalahan jika diperlukan
    }
}

// Panggil fungsi saat halaman dimuat
window.onload = fetchAndDisplayBooks;
