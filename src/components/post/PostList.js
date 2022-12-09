import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts, getPostStatus, getPostError, fetchPosts } from "../../redux/featuer/postSlice"
import PostExcerpt from "../post/PostExcerpt";

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostStatus);
    const postsEror = useSelector(getPostError);
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [dispatch, postsStatus])
    let content;
    if (postsStatus === 'loading') {
        content = <p>'loading ... '</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
        content = <p>{postsEror}</p>
    }
    return (
        <main>
            {content}
        </main>
    )
}

export default PostList