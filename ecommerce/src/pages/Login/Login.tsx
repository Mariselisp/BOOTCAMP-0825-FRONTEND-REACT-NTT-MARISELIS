import { useState } from 'react';
import { auth } from '../../proxy/Auth/Auth';
import { Modal } from '../../components/Modal/Modal';
import './Login.css';
import { ModalPassword } from '../../components/ModalPassword/ModalPassword';
import { ModalSendEmail } from '../../components/ModalSendEmail/ModalSendEmail';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [modalState, setModalState] = useState<'none' | 'password' | 'emailSent'>('none');
    const [showModal, setShowModal] = useState<{
      visible: boolean;
      message: string;
    }>({
      visible: false,
      message: '',
    });    
    
    const handleResetPassword = async () =>{
      setModalState('password');
    }

    const blockSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
    };
    
    const handleLogin = async () => {
        const response = await auth(user, password);

        if(!response.ok){
          if(response.status == 400){
            const mensaje = "Nombre de usuario o contraseña incorrecta";
            setShowModal({visible:true, message:mensaje});
          }
          else {
            const mensaje = "Algo salió mal, inténtelo más tarde";
            setShowModal({visible:true, message:mensaje});
          }
          return;
        }
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/Home');
    };

  return(
      <div className='formularioInicio'>
        <div className='titulo'>
          <h2>Inicie Sesión</h2>
        </div>
        <div className='infoUsuario'>
          <input type='text' placeholder='Ingresa tu usuario' value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={blockSpace} />
          <input type='password' placeholder='Ingresa tu contraseña' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={blockSpace} />
        </div>
        <div className='iniciarSesion'>
          <a onClick={(e) => {e.preventDefault(); handleResetPassword(); }}>¿Olvidó contraseña?</a>
          <button onClick={ handleLogin }>Iniciar sesión</button>
        </div>

        {modalState === 'password' && (
          <ModalPassword
            onClose={() => setModalState('none')}
            onSendSuccess={() => setModalState('emailSent')}
          />
        )}

        {modalState === 'emailSent' && (
          <ModalSendEmail onClose={() => setModalState('none')} />
        )}

        {showModal.visible && (
            <Modal mensaje={showModal.message} onClose={() => setShowModal({visible: false, message: ''})} />
        )}
      </div>
  );
};

export default Login;