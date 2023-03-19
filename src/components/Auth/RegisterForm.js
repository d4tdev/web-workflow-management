import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import AlertMessage from 'components/Common/AlertMessage';
import './RegisterForm.scss';

function RegisterForm() {
   // Context
   const { registerUser } = useContext(AuthContext);

   // Router
   const navigate = useNavigate();

   const [registerForm, setRegisterForm] = useState({
      username: '',
      password: '',
   });

   const [alert, setAlert] = useState(null);

   const { username, password, passwordConfirm } = registerForm;

   const onChangeRegisterForm = (e) =>
      setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

   const [passShow, setPassShow] = useState(false);
   const [passConfirmShow, setPassConfirmShow] = useState(false);
   const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passShow
      setPassShow(!passShow);
   };
   const togglePasswordConfirm = () => {
      // When the handler is invoked
      // inverse the boolean state of passConfirmShow
      setPassConfirmShow(!passConfirmShow);
   };

   const register = async (e) => {
      e.preventDefault();
      if (!username || !password) {
         setAlert({
            type: 'danger',
            message: 'Tên đăng nhập hoặc mật khẩu không được để trống',
         });
         setTimeout(() => setAlert(null), 3000);
         return;
      }
      if (password !== passwordConfirm) {
         setAlert({
            type: 'danger',
            message: 'Mật khẩu không trùng khớp',
         });
         setTimeout(() => setAlert(null), 3000);
         return;
      }
      if (password.length < 6) {
         setAlert({
            type: 'danger',
            message: 'Mật khẩu phải có ít nhất 6 ký tự',
         });
         setTimeout(() => setAlert(null), 3000);
         return;
      }

      const registerData = await registerUser(registerForm);

      if (registerData.success) {
         navigate('/boards');
      } else {
         setAlert({
            type: 'danger',
            message: 'Tài khoản đã tồn tại',
         });
         setTimeout(() => setAlert(null), 3000);
      }
   };

   const saveContentAfterPressEnter = async (e) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         if (!username || !password) {
            setAlert({
               type: 'danger',
               message: 'Tên đăng nhập hoặc mật khẩu không được để trống',
            });
            setTimeout(() => setAlert(null), 3000);
            return;
         }
         if (password !== passwordConfirm) {
            setAlert({
               type: 'danger',
               message: 'Mật khẩu không trùng khớp',
            });
            setTimeout(() => setAlert(null), 3000);
            return;
         }
         if (password.length < 6) {
            setAlert({
               type: 'danger',
               message: 'Mật khẩu phải có ít nhất 6 ký tự',
            });
            setTimeout(() => setAlert(null), 3000);
            return;
         }

         const registerData = await registerUser(registerForm);

         if (registerData.success) {
            navigate('/boards');
         } else {
            setAlert({
               type: 'danger',
               message: 'Tài khoản đã tồn tại',
            });
            setTimeout(() => setAlert(null), 3000);
         }
      }
   };

   return (
      <Form className='register-form' onKeyDown={saveContentAfterPressEnter}>
         <AlertMessage info={alert} />
         <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
               type='text'
               placeholder='Nhập tên đăng nhập'
               name='username'
               required
               value={username}
               onChange={onChangeRegisterForm}
            />
            <Form.Text className='text-muted'></Form.Text>
         </Form.Group>

         <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup>
               <Form.Control
                  className='password-input'
                  type={passShow ? 'text' : 'password'}
                  placeholder='Nhập mật khẩu'
                  name='password'
                  value={password}
                  required
                  onChange={onChangeRegisterForm}
               />
               <InputGroup.Text className='show_hide-password'>
                  <i
                     onClick={togglePassword}
                     className={
                        passShow ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }></i>
               </InputGroup.Text>
            </InputGroup>
         </Form.Group>
         <Form.Group
            className='mb-3'
            //  controlId='formBasicPassword's
         >
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <InputGroup>
               <Form.Control
                  className='password-input'
                  type={passConfirmShow ? 'text' : 'password'}
                  placeholder='Nhập lại mật khẩu'
                  name='passwordConfirm'
                  value={passwordConfirm}
                  required
                  onChange={onChangeRegisterForm}
               />
               <InputGroup.Text className='show_hide-password'>
                  <i
                     onClick={togglePasswordConfirm}
                     className={
                        passConfirmShow ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }></i>
               </InputGroup.Text>
            </InputGroup>
         </Form.Group>
         <Button variant='success' type='submit' onClick={register}>
            Đăng ký
         </Button>
         <p className='login-link'>
            Bạn đã có tài khoản?
            <Link to='/login' className='login-page'>
               Đăng nhập
            </Link>
         </p>
         <div className='crossbar'></div>
         <p>
            Đây là website quản lý công việc, lịch trình, dự án cá nhân của bạn.
            Giúp bạn quản lý và lưu trữ dữ liệu một cách trực quan, dễ sử dụng
            nhất
         </p>
      </Form>
   );
}

export default RegisterForm;
