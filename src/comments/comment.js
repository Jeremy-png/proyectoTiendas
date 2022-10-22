import CommentForm from "./commentForm";
import React,{useState} from "react";


const Comment = 
({
    comment, 
    replies, 
    currentUserId, 
    deleteComment,
    updateComment, 
    activeComment, 
    addComment, 
    setActiveComment, 
    parentId = null,
}) => {
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const canDelete = currentUserId === comment.userId && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const [like, setlike] = useState(0);
    const [dislike, setdislike] = useState(0);

    const [likeactive, setlikeactive] = useState(false);
    const [dislikeactive, setdislikeactive] = useState(false);

    function likef(){
        if(likeactive){
            setlikeactive(false)
            setlike(like-1)
        }else {
            setlikeactive(true)
            setlike(like+1)
            if(dislikeactive){
                setdislikeactive(false)
                setlike(like+1)
                setdislike(dislike-1)
            }
        }
    };

    function dislikef(){
        if(dislikeactive){
            setdislikeactive(false)
            setdislike(dislike-1)
        }else {
            setdislikeactive(true)
            setdislike(dislike+1)
            if(likeactive){
                setdislikeactive(false)
                setdislike(dislike+1)
                setlike(like-1)
            }
        }
    };
const isReplying =
        activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === comment.id;
    const isEditing =
        activeComment &&
        activeComment.type === "editing" &&
        activeComment.id === comment.id;
        const replyId = parentId ? parentId : comment.id;
    return (
        <div className ="comment">

            <div className = "comment-right-part">
                <div className="comment-content">
                    <div className = "comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing && <div className = "comment-text">{comment.body}</div>}
                {isEditing && (
                    <CommentForm
                    submitLabel = "Update"
                    hasCancelButton
                    initialText = {comment.body}
                    handleSubmit = {(text => updateComment(text, comment.id))}
                    handleCancel = {() => setActiveComment(null)}
                    />
                )}
                <div className = "comment-actions">
                
                
                   
                   {canReply && <div className = "comment-action" onClick = {() => 
                   setActiveComment({ id: comment.id, type: "replying"})}>Reply</div>}
                    {canEdit && <div className = "comment-action" onClick = {() => 
                   setActiveComment({ id: comment.id, type: "editing"})}>Edit</div>}
                    {canDelete && <div className = "comment-action" onClick={() => deleteComment(comment.id)}>Delete</div>}

                    <div className="comment-action" onClick={likef}>Like {like}</div>
                <div className = "comment-action" onClick={dislikef}>Dislike {dislike}</div>
                </div>
                {isReplying && (
                    <CommentForm 
                    submitLabel="Reply" 
                    handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className = "replies">
                        {replies.map((reply) => (
                            <Comment 
                            comment={reply} 
                            key={reply.id} 
                            replies = {[]}
                            currentUserId = {currentUserId}
                            deleteComment = {deleteComment}
                            updateComment = {updateComment}
                            addComment = {addComment}
                            activeComment = {activeComment}
                            setActiveComment = {setActiveComment}
                            parentId = {comment.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;