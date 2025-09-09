import { useState } from 'react';
import { auth } from '../../proxy/Auth/Auth';
import { Modal } from '../Modal/Modal';
import './Form.css';

const Form = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async () => {
        const response = await auth(user, password);

        if(!response.ok){
            setShowModal(true);
            return;
        }

        console.log('datos correctos');
    };

  return (
      <div className='formularioInicio'>
        <div className='titulo'>
          <h2>Inicie Sesión</h2>
        </div>
        <div className='infoUsuario'>
          <input type='text' placeholder='Ingresa tu usuario' value={user} onChange={(e) => setUser(e.target.value)} />
          <input type='password' placeholder='Ingresa tu contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='iniciarSesion'>
          <a href='#'>¿Olvidó contraseña?</a>
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>

        {showModal && (
            <Modal
            mensaje="Usuario o contraseña incorrectos"
            onClose={() => setShowModal(false)}
            />
        )}
      </div>
  );
};

export default Form;