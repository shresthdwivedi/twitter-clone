'use client';

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

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
    }, [name, username, bio, coverImage, profileImage, editModal, mutateFetchedUser])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload 
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Update Profile Image"
            />
            <ImageUpload 
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Update Cover Image"
            />
            <Input 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                type="text"
            />
            <Input 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                type="text"
            />
            <Input 
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isLoading}
                type="text"
            />
        </div>
    )

    return (
        <Modal 
            title="Edit Profile"
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            disabled={isLoading}
            actionLabel="Save"
            body={bodyContent}
        />
    )
}

export default EditModal;