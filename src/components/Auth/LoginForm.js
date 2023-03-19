import React, { useState, useContext } from 'react';
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';
import './LoginForm.scss';
import AlertMessage from 'components/Common/AlertMessage';

function LoginForm() {
   // Context
   const { loginUser } = useContext(AuthContext);

   // Router
   const navigate = useNavigate();

   const [loginForm, setLoginForm] = useState({
      username: '',
      password: '',
   });

   const [alert, setAlert] = useState(null);

   const { username, password } = loginForm;

   const onChangeLoginForm = (e) =>
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

   const [passShow, setPassShow] = useState(false);
   const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passShow
      setPassShow(!passShow);
   };

   const login = async (e) => {
      e.preventDefault();
      if (!username || !password) {
         setAlert({
            type: 'danger',
            message: 'Tên đăng nhập hoặc mật khẩu không được để trống',
         });
         setTimeout(() => setAlert(null), 3000);
         return;
      }
      const loginData = await loginUser(loginForm);

      if (loginData.success) {
         navigate('/boards');
      } else {
         setAlert({
            type: 'danger',
            message: 'Tài khoản hoặc mật khẩu không chính xác',
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
         const loginData = await loginUser(loginForm);

         if (loginData.success) {
            navigate('/boards');
         } else {
            setAlert({
               type: 'danger',
               message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
            setTimeout(() => setAlert(null), 3000);
         }
      }
   };

   return (
      <Form className='login-form' onKeyDown={saveContentAfterPressEnter}>
         <AlertMessage info={alert} />
         <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
               type='text'
               placeholder='Nhập tên đăng nhập'
               name='username'
               required
               value={username}
               onChange={onChangeLoginForm}
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
                  onChange={onChangeLoginForm}
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

         <Button variant='success' type='submit' onClick={login}>
            Đăng nhập
         </Button>
         <p className='register-link'>
            Bạn chưa có tài khoản?
            <Link to='/register' className='register-page'>
               Đăng ký
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

export default LoginForm;
