import Swal from 'sweetalert2';

export const SuccessMsg = ({ title = 'Success', action = () => {} }) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title,
    showConfirmButton: true,
    timer: 2500,
  }).then(() => action());
};

export const ErrorMsg = ({ text = 'Something went wrong' }) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text,
    //   footer: '<a href="">Why do I have this issue?</a>',
  });
};
