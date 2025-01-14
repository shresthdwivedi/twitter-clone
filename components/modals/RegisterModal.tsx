'use client';

import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Modal from "../layout/Modal";
import Input from "../layout/Input";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);

            // add signin

            registerModal.onClose();
        }
        catch(error){
            console.error(error);
        }
        finally{
            setIsLoading(false);
        }

    }, [registerModal])

    const onToggle = useCallback(() => {
        try{
            if(isLoading){
                return null;
            }
            registerModal.onClose();
            loginModal.onOpen();
        }
        catch(error) {
            console.error(error);
        }
    }, [isLoading, registerModal, loginModal])
 
const bodyContent = (
    <div className="flex flex-col gap-4">
        <Input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
            disabled={isLoading}
        />
        <Input 
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            value={name}
            disabled={isLoading}
        />
        <Input 
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            value={username}
            disabled={isLoading}
        />
        <Input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
            disabled={isLoading}
        />
    </div>
)

const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
        Already Have an Account? 
        <span 
            onClick={onToggle}
            className="ml-2 text-white hover:underline hover:cursor-pointer">
            Sign In
        </span>
    </div>
)


    return (
        <Modal 
            isOpen={registerModal.isOpen}
            disabled={isLoading}
            onClose={registerModal.onClose}
            actionLabel='Sign Up'
            onSubmit={onSubmit}
            title='Create an Account'
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;