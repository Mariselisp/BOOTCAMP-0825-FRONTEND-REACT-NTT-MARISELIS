import { useState } from 'react';
import { auth } from '../../proxy/Auth/Auth';
import { Modal } from '../Modal/Modal';
import './Form.css';
import { ModalPassword } from '../ModalPassword/ModalPassword';

const Form = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    
    const [showModal, setShowModal] = useState<{
      visible: boolean;
      message: string;
    }>({
      visible: false,
      message: '',
    });    

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
        console.log('datos correctos');
    };

    const [showModalPassword, setModalPassword] = useState(false); //HOOK
    const handleResetPassword = async () =>{
      setModalPassword(true);
    }

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

        {showModalPassword && (
          <ModalPassword onClose={() => setModalPassword(false)}/>
        )}

        {showModal.visible && (
            <Modal mensaje={showModal.message} onClose={() => setShowModal({visible: false, message: ''})} />
        )}
      </div>
  );
};

export default Form;