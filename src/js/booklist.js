import axios from 'axios';

axios.defaults.withCredentials = true;
// URL API
const apiUrl = 'http://localhost:5000/books';

async function fetchAndDisplayBooks() {
    try {
        // Ambil data dari API
        const response = await axios.get(apiUrl);
        const books = response.data.data;

        // Dapatkan elemen container untuk card
        const container = document.getElementById('cards-container');

        // Loop melalui data buku dan buat elemen card untuk masing-masing
        books.forEach(book => {
            // Buat elemen card
            const card = document.createElement('div');
            card.className = 'card';

            // Tambahkan isi card
            card.innerHTML = `
        <img src="http://localhost:5000/tmp/${book.image}" alt="${book.title}">
        <hr>
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <hr>
        <button class="details-btn" onclick="rentalBook('${book.id}')">Rental Book</button>
      `;

            // Tambahkan card ke container
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        // Tangani kesalahan jika diperlukan
    }
}

// Panggil fungsi saat halaman dimuat
window.onload = fetchAndDisplayBooks;