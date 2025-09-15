import './ModalPassword.css'
import { useState } from 'react';

type PropiedadesModal = {
    onClose: () => void;
    onSendSuccess: () => void;
};

export const ModalPassword = ({ onClose, onSendSuccess }: PropiedadesModal) => {
    const [emailValidate, setEmailValidate] = useState(true);
    const [email, setEmail] = useState('');

    const blockSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    const emailValidation = (email:string): void => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const esValido = regexEmail.test(email);
        setEmailValidate(esValido);
        if (esValido) {
            onSendSuccess();
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1>Recuperar contraseña</h1>
                <div className='email-reset-password'>
                    <input type="email" placeholder="Ingresa tu correo"  value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={blockSpace} />
                    {!emailValidate && (
                        <label>Correo no válido</label>
                    )}
                </div>
                <div className='button-reset-password'>
                    <button onClick={() => emailValidation(email)}>Enviar</button>
                    <button className="close-button" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};