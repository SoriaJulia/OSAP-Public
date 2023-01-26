import { UserCircle } from 'phosphor-react';
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
      <div className="user-menu-mobile">
        <button aria-label="Ingresar" onClick={handleClick}>
          <UserCircle weight="duotone" size={32} />
        </button>
      </div>

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
