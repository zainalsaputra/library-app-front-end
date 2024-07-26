const logout = async () => {
    try {
        // Kirim permintaan logout ke API
        await fetch('http://localhost:5000/auth/logout', {
            method: 'DELETE',
            // credentials: 'include' // Sertakan kredensial jika diperlukan
        });

        // Hapus token dari localStorage atau sessionStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');

        // Redirect ke halaman login
        window.location.href = '/pages-sign-in.html'; // Ganti dengan URL halaman login atau beranda

    } catch (error) {
        console.error('Logout failed:', error);
        // Tangani error jika diperlukan
    }
};

// Event listener untuk tombol logout
document.getElementById('logout').addEventListener('click', logout);
