'use client';

import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
    isOpen?: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title?: string,
    body?: React.ReactElement,
    footer?: React.ReactElement,
    actionLabel: string,
    disabled?: boolean,  
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
}) => {

    const handleClose = useCallback(() => {
        if(disabled){
            return;
        }
        onClose();
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }
        onSubmit();
    }, [disabled, onSubmit])

    if(!isOpen){
        return null;
    }

    return(
        <>    
            <div className="justify-center items-center flex bg-neutral-800 bg-opacity-70 overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none focus:outline-none" >
                <div className="w-full lg:w-3/6 relative my-6 mx-auto lg:max-w-3xl h-full lg:h-auto  ">
                    <div className="h-full text-white lg:h-auto rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                        <div className="text-white flex items-center justify-between p-10 rounded-t">
                            <h3 className="text-3xl font-semibold text-white">{title}</h3>
                            <button 
                                onClick={handleClose}
                                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition">
                                <AiOutlineClose size={20}/>
                            </button>
                        </div>
                        <div className="relative p-10 flex-auto">
                            {body}
                        </div>
                        <div className="flex flex-col gap-2 p-10">
                            <Button 
                                disabled={disabled} 
                                label={actionLabel} 
                                secondary 
                                large 
                                fullWidth 
                                onClick={handleSubmit}
                            />
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;