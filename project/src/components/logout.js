import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import './logout.css';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Your session will be expired!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, Stay Logged In!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.REACT_APP_APILINKS}/logout`, {}, { withCredentials: true })
          .then((res) => {
            if (res.status === 200) {
              Cookies.remove('token');
              swalWithBootstrapButtons.fire({
                title: "Logged Out!",
                text: "Your session has expired.",
                icon: "error"
              }).then(() => {
                navigate('/');
                window.location.reload();
              });
            }
          })
          .catch((err) => {
            console.error('Logout error:', err);
          });
      } else {
        swalWithBootstrapButtons.fire({
          title: "Back to login",
          text: "You are still logged in.",
          icon: "success"
        }).then(() => {
          navigate('/');
        });
      }
    });
  };

  useEffect(() => {
    handleLogout();
  }, []);
}
