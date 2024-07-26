import axios from 'axios';

axios.defaults.withCredentials = true;
// URL API
const apiUrl = 'http://localhost:5000/books';

// Fungsi untuk menambahkan buku baru
async function createBook(formData) {
    try {
        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Book created:', response.data);
        // Tampilkan notifikasi sukses
        Swal.fire({
            title: 'Success!',
            text: 'Book added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            // Refresh halaman setelah menutup notifikasi
            // window.location.reload();
        });
    } catch (error) {
        console.error('Error creating book:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to create book: ' + (error.response ? error.response.data.message : error.message),
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Event listener untuk form submission
document.getElementById('formAddedBook').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Dapatkan nilai dari form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    // Buat objek FormData dan tambahkan field
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('image', image);

    // Panggil fungsi untuk menambahkan buku baru
    await createBook(formData);

    // Reset form setelah submit
    document.getElementById('formAddedBook').reset();
});
