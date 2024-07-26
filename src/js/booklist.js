import axios from 'axios';

axios.defaults.withCredentials = true;

// URL API
const apiUrl = 'http://localhost:5000/books';

// Fungsi untuk merental buku
async function rentalBook(bookId) {
    try {
        const response = await axios.post(`${apiUrl}/rental/${bookId}`);
        console.log('Book rented:', response.data);
        // Tampilkan notifikasi sukses
        Swal.fire({
            title: 'Success!',
            text: 'Book rented successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Refresh halaman setelah menutup notifikasi
            window.location.reload();
        });
    } catch (error) {
        console.error('Error renting book:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to rent book: ' + (error.response ? error.response.data.message : error.message),
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Fungsi untuk mengambil data buku dan menampilkannya dalam kartu
async function fetchAndDisplayBooks() {
    try {
        // Ambil data dari API
        const response = await axios.get(apiUrl);
        const books = response.data.data;

        // Dapatkan elemen container untuk kartu
        const container = document.getElementById('cards-container');

        // Loop melalui data buku dan buat elemen kartu untuk masing-masing
        books.forEach(book => {
            // Buat elemen kartu
            const card = document.createElement('div');
            card.className = 'card';

            // Tambahkan isi kartu
            card.innerHTML = `
                <img src="http://localhost:5000/tmp/${book.image}" alt="${book.title}">
                <hr>
                <h2>${book.title}</h2>
                <p><strong>Author:</strong> ${book.author}</p>
                <p>${book.description}</p>
                <hr>
                <button class="details-btn" id="rentalButton-${book.id}">Rental Book</button>
            `;

            // Tambahkan kartu ke container
            container.appendChild(card);

            const rentalButton = document.getElementById(`rentalButton-${book.id}`);
            rentalButton.addEventListener('click', () => rentalBook(book.id));
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        // Tangani kesalahan jika diperlukan
    }
}

// Panggil fungsi saat halaman dimuat
window.onload = fetchAndDisplayBooks;
