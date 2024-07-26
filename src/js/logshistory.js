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

        // Loop melalui data buku dan buat elemen tabel untuk masing-masing
        books.forEach((book, index) => {
            // Buat elemen baris tabel
            const row = document.createElement('tr');

            // const options = {
            //     day: '2-digit',
            //     month: '2-digit',
            //     year: 'numeric',
            //     hour: '2-digit',
            //     minute: '2-digit',
            //     second: '2-digit',
            //     hour12: false,
            // }

            // const formattedDateTime = (date) => {
            //     return date.toLocaleString('en-GB', options)
            // }

            // Tambahkan isi baris tabel
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${book.book.title}</td>
                <td>${book.rentalDate}</td>
                <td>${book.returnDate}</td>
                <td>${book.status}</td>
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
