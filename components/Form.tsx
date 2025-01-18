'use client';

import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Avatar from "./Avatar";

interface FormProps {
    placeholder: string,
    isComment?: boolean,
    postId?: string,
}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId,
}) => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async() => {
        try {
            setIsLoading(true);

            await axios.post('/api/posts', { body })
            toast.success('Tweet created');

            setBody('');
            mutatePosts();
        } catch(error) {
            console.error(error);
            toast.error('Failed to create tweet');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts])

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                    <div className="flex flex-row gap-4">
                       <div>
                            <Avatar userId={currentUser?.id}/>
                        </div>
                        <div className="w-full">
                            <textarea
                                disabled={isLoading}
                                value={body}
                                onChange={(e) => {
                                    setBody(e.target.value)
                                }}
                                placeholder={placeholder}
                                className="w-full bg-black disabled:opacity-80 resize-none mt-3 peer ring-0 outline-none text-[20px] placeholder-neutral-500 text-white "
                            ></textarea>
                            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition"/>
                            <div className="flex flex-row justify-end mt-4">
                                <Button 
                                    disabled={isLoading || !body} 
                                    label="Tweet"
                                    onClick={handleSubmit}
                                />
                            </div>    
                        </div> 
                    </div>
                ) : (
                    <div className="py-8">
                    <h1 className="text-2xl font-bold text-white text-center mb-4">
                        Welcome to Twitter
                    </h1>
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <Button label="Sign In" onClick={loginModal.onOpen}/>
                        <Button label="Register" onClick={registerModal.onOpen} secondary/>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Form;