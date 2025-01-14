'use client';

import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "../layout/Modal";
import Input from "../layout/Input";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);

            // add signin

            loginModal.onClose();
        }
        catch(error){
            console.error(error);
        }
        finally{
            setIsLoading(false);
        }

    }, [loginModal])
    const onToggle = useCallback(() => {
        try{
            if(isLoading){
                return null;
            }
            loginModal.onClose();
            registerModal.onOpen();
        }
        catch(error) {
            console.error(error);
        }
    }, [isLoading, registerModal, loginModal])
 
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                type={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                disabled={isLoading}
            />
            <Input 
                type={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
                disabled={isLoading}
            />
        </div>
    )

const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
        Don't have an account?
        <span 
            onClick={onToggle}
            className="ml-2 text-white hover:underline hover:cursor-pointer">
            Sign Up
        </span>
    </div>
)

    return (
        <Modal 
            isOpen={loginModal.isOpen}
            disabled={isLoading}
            onClose={loginModal.onClose}
            actionLabel='Sign In'
            onSubmit={onSubmit}
            title='Sign In'
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;