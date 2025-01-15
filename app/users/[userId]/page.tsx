'use client';

import Header from '@/components/Header'
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { useParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

const UserView = () => {

    const params = useParams();
    const userId = params.userId;

    const { data: fetchedUser, isLoading } = useUser(userId as string);
    if(isLoading || !fetchedUser){
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }
    return (
        <div>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
        </div>
    )
}

export default UserView;    