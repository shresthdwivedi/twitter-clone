'use client';

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";

const EditModal = () => {
    
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [ profileImage, setProfileImage ] = useState('');
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ coverImage, setCoverImage ] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
        setCoverImage(currentUser?.coverImage);
    }, [currentUser?.profileImage, currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.coverImage])

    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = useCallback( async() => {
        try{
            setIsLoading(true);

            await axios.patch('/api/edit', {
                name, 
                username,
                bio,
                coverImage,
                profileImage, 
            })
            mutateFetchedUser();
            toast.success('Profile updated successfully');
            editModal.onClose();
        }
        catch(error){
            toast.error('Failed to update profile');
        }finally {
            setIsLoading(false);
        }
    }, [name, username, bio, coverImage, profileImage])

    return (
        <Modal 
            title="Edit Profile"
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            disabled={isLoading}
            actionLabel="Save"
        />
    )
}

export default EditModal;