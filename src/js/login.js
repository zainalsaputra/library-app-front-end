// Import axios (if using a module system; otherwise, ensure axios is included in your HTML file)
import axios from 'axios';

axios.defaults.withCredentials = true;

// Function to perform login
const login = async (email, password) => {
    try {
        // Replace URL with your login API endpoint
        const response = await axios.post('http://localhost:5000/auth/login', {
            email: email,
            password: password,
        });

        // Handle successful login
        console.log('Login successful:', response.data);

        // Store token or any required data
        // localStorage.setItem('authToken', response.data.token);

        // Show success notification using SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Login berhasil!',
            text: 'Anda akan dialihkan ke dashboard.',
            timer: 2000, // Notifikasi akan hilang setelah 2 detik
            showConfirmButton: false
        }).then(() => {
            // Redirect to dashboard
            window.location.href = '/index.html'; // Replace with the path to your dashboard
        });

    } catch (error) {
        // Handle errors
        console.error('Login failed:', error.response ? error.response.data : error.message);

        // Show error notification using SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Login gagal',
            text: error.response ? error.response.data.message : error.message
        });
    }
};

// Add event listener to the login form
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get values from form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Call the login function
    await login(email, password);
});
