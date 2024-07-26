import axios from 'axios';

axios.defaults.withCredentials = true;
// URL API
const apiUrl = 'http://localhost:5000/books';

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

            // Tambahkan isi baris tabel
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="http://localhost:5000/tmp/${book.image}" width="50px" alt="${book.title}" ></td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.description}</td>
                <td>${book.stock}</td>
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

// Fungsi untuk menangani klik pada tombol 'Rental Book'
function rentalBook(bookId) {
    alert(`Rental book with ID: ${bookId}`);
    // Ganti dengan aksi yang sesuai, misalnya membuka halaman rental atau memproses peminjaman
}

// Panggil fungsi saat halaman dimuat
window.onload = fetchAndDisplayBooks;
