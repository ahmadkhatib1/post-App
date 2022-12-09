import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../redux/featuer/postSlice";
import { selectAllUsers } from "../../redux/featuer/userSlice";
// random id 
const PostForm = () => {
    const users = useSelector(selectAllUsers)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setuserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
    const savePost = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()
                setTitle('')
                setContent('')
                setuserId('')
            } catch (error) {
                console.log('opp error', error);
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }
    const userOption = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    const titleChange = e => setTitle(e.target.value);
    const contentChange = e => setContent(e.target.value);
    const AuthChange = e => setuserId(Number(e.target.value));
    return (
        <section>
            <h2>Add a new post</h2>
            <form>
                <label htmlFor="postTitle">post title :</label>
                <input type="text" id="postTitle" value={title} onChange={titleChange} />
                <label htmlFor="postContent">post content :</label>
                <textarea id="postContent" cols="30" rows="10"
                    onChange={contentChange}
                    value={content}
                />
                <label htmlFor="userId">userId:</label>
                <select id="userId" onChange={AuthChange} >
                    <option value=""></option>
                    {userOption}
                </select>
                <button type="button" onClick={savePost} disabled={!canSave} > save POst</button>
            </form>
        </section>
    )
}

export default PostForm