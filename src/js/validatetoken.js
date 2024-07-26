const validateRoute = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        Swal.fire({
            title: 'Unauthorized!',
            text: 'You are not authorized to view this page. Please login first.',
            icon: 'warning',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = '/pages-sign-in.html';
        });
    }
}

validateRoute();