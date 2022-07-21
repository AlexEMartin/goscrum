import Swal from 'sweetalert2'

const swal = () => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Credenciales inválidas!',
      })

export default swal;