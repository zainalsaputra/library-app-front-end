import axios from 'axios';

axios.defaults.withCredentials = true;

async function registerUser(name, email, address, phone, password) {
    const url = 'http://localhost:5000/auth/register';

    const data = {
        name: name,
        email: email,
        address: address,
        phone: phone,
        password: password
    };

    try {
        const response = await axios.post(url, data);
        console.log('Registrasi berhasil:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registrasi gagal:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}

document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        await registerUser(name, email, address, phone, password);
        Swal.fire({
            icon: 'success',
            title: 'Registrasi berhasil!',
            text: 'Anda akan dialihkan ke halaman sign-in.',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'pages-sign-in.html';
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Registrasi gagal',
            text: error.message
        });
    }
});
