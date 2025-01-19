'use client';

import usePost from "@/hooks/usePost";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Header from "../Header";
import PostItem from "./PostItem";
import Form from "../Form";
import CommentFeed from "./CommentFeed";

const PostView = () => {

    const { postId } = useParams<{ postId: string }>();

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if(isLoading || !fetchedPost) {
        return (
            <div className="h-screen w-full items-center justify-center flex">
                <ClipLoader size={80} color="lightblue"/>
            </div>
        )
    }

    return (
        <div >
            <Header label="Tweet" showBackArrow/>
            <PostItem data={fetchedPost}/>
            <Form postId={postId as string} isComment placeholder="Reply..."/>
            <CommentFeed comments={fetchedPost?.comments} />
        </div>
    )
}

export default PostView;