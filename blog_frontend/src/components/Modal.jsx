import { useEffect } from 'react';
import ReactDOM from 'react-dom';

function Modal({ onClose, children }) {
  useEffect(() => {

    document.body.classList.add('overflow-hidden');

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const modalRoot = document.querySelector('.modal-container');
  if (!modalRoot) {
    console.error("'.modal-container' not found in DOM.");
    return null;
  }

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-300 bg-opacity-80 z-40 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full"
      >
        <div className="flex flex-col space-y-4">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
