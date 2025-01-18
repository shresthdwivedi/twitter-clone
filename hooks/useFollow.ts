import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    }, [currentUser?.followingIds, userId])

    const toggleFollow = useCallback(async() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        try{
            let request;

            if(!isFollowing) {
                request = () => axios.post('/api/follow', { userId })
            } else {
                request = () => axios.delete('/api/follow', { data: { userId }})
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success(isFollowing ? 'Unfollowed user' : 'Followed user');

        } catch(error) {
            console.error(error);
            toast.error('Failed to unfollow user');
        }
    }, [currentUser, loginModal, isFollowing, mutateCurrentUser, mutateFetchedUser, userId])

    return { isFollowing, toggleFollow };
}

export default useFollow;