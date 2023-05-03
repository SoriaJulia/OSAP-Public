import { SignIn, UserCircle } from 'phosphor-react';
import { useState } from 'react';
import LoginModal from '../LoginModal';
import Portal from '../Layout/Portal';

const LoginMenu = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <button aria-label="Ingresar" className="user-menu flex flex-col" onClick={handleClick}>
        <UserCircle weight="duotone" size={24} />
        Ingresar
      </button>

      <Portal>
        <LoginModal
          show={showModal}
          onDismiss={() => {
            setShowModal(false);
          }}
          title="Ingresá con tu usuario y contraseña"
        />
      </Portal>
    </>
  );
};

export default LoginMenu;
