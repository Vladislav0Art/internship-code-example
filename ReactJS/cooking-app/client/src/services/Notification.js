import { toast } from 'react-toastify';

const Notification = (message, type) => {
  const success = 'success', 
        error = 'error', 
        info = 'info';

  switch(type) {
    case success:
      toast.success(message);
      break;
    
    case error:
      toast.error(message);
      break;

    case info:
      toast.info(message);
      break;

    default:
      toast(message)
  }
};

export default Notification;
