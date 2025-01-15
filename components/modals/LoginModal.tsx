'use client';

import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import useRegisterModal from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const LoginModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);

            signIn('credentials', {
                email,
                password,
            });
            toast.success("Logged in Successfully");
            
            loginModal.onClose();
        }
        catch(error){
            console.error(error);
            toast.error("Failed to login");
        }
        finally{
            setIsLoading(false);
        }

    }, [loginModal, email, password])
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
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
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
        Don&apos;t have an account?
        <span 
            onClick={onToggle}
            className="ml-2 text-white hover:underline hover:cursor-pointer">
            Create an Account
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