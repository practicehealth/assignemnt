
interface SnackbarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

function SnackbarMenu({ isOpen, onClose, onLogout }: SnackbarMenuProps) {
  const snackbarClass = isOpen
    ? 'translate-y-0'
    : 'translate-y-full';

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between transform ${snackbarClass} transition-transform duration-300 ease-in-out`}>
      <button onClick={onLogout} className="text-white">Logout</button>
      <button onClick={onClose} className="text-white ml-2">Close</button>
    </div>
  );
}

export default SnackbarMenu;
