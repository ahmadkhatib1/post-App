import React from 'react'
import UserAuth from '../user/userAuth'
import ReactionButtons from './ReactionsButton'
import TimeAgo from './TimeAgo'

const PostExcerpt = ({ post }) => {
    return (
        <article key={post.id} >
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className="postCredit">
                <UserAuth userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>)
}

export default PostExcerpt