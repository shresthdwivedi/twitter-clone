import { mutate } from 'swr';
import useCurrentUser from "./useCurrentUser";
import usePost from './usePost';
import usePosts from './usePosts';
import { useCallback, useMemo } from 'react';
import useLoginModal from './useLoginModal';
import toast from 'react-hot-toast';
import axios from 'axios';

const useLike = ({ postId, userId }: {postId?: string, userId: string}) => {
    
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);
    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likeIds || [];
        return list.includes(currentUser?.id);
    }, [fetchedPost?.likeIds, currentUser?.id])

    const toggleLike = useCallback(async() => {
        if(!currentUser){
            return loginModal.onOpen();
        }
        try {
            let request;

            if(!hasLiked) {
                request = () => axios.post('/api/like', { postId });
            } else {
                request = () => axios.delete('/api/like', { data: { postId }});
            }
            await request();

            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success(await hasLiked ? 'Post unliked!' : 'Post liked!');

        } catch(error) {
            console.error(error);
            toast.error('An error occurred');
        }
    } ,[currentUser, loginModal, hasLiked, mutateFetchedPost, mutateFetchedPosts, postId])
    
    return { hasLiked, toggleLike };
}

export default useLike;