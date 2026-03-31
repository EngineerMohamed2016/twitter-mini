import { toast } from "react-toastify";

export const displayError = (msg, id) => {
    if(!msg) return
    
    msg = msg.trim()[0].toUpperCase() + msg.slice(1);
    if(toast.isActive(id))
        return;
    
    toast.error(msg, {
        toastId: id,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
};