import React from "react";
import './modal.css'

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? 'modal active':'modal'} onClick={() => setActive(false)}>
           <div className={active ? "modal__context active":'modal__context'} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal