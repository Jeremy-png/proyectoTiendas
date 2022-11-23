import CommentForm from "./commentForm";
import React,{useState} from "react";
import axios from 'axios';


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


    const [rankingCreado, setRankingCreado] = React.useState();

    function likef(){
        const dataEnviar = {
            userID: localStorage.getItem("id_usuario"),
            itemID: comment.id,
            rating: 1
          };

          axios.post('http://localhost/proyectoTiendas/likeComment.php', dataEnviar)
          .then((response)=> {
              console.log(response)
              if(response.data != 1){
                alert("Error: Solo puede valorar el comentario una vez");
              }
          })
          .catch((response)=> {
              console.log(response);
              alert("Error: Solo puede valorar el comentario una vez");
          });

          axios.get("http://localhost/proyectoTiendas/getLikes.php?id_comment="+comment.id+"&like=1")
          .then(response=>{
            console.log(response.data);
            setlike(response.data.likes);
            
            
          }).catch(error=>{
            console.log(error);
          });
    };

    function dislikef(){
        const dataEnviar = {
            userID: localStorage.getItem("id_usuario"),
            itemID: comment.id,
            rating: 0
          };

          axios.post('http://localhost/proyectoTiendas/likeComment.php', dataEnviar)
          .then((response)=> {
              console.log(response)
              if(response.data != 1){
                alert("Error: Solo puede valorar el comentario una vez");
              }
          })
          .catch((response)=> {
              console.log(response);
              alert("Error: Solo puede valorar el comentario una vez");
          });

          axios.get("http://localhost/proyectoTiendas/getLikes.php?id_comment="+comment.id+"&like=0")
          .then(response=>{
            console.log(response.data);
            setdislike(response.data.likes);
           
            
          }).catch(error=>{
            console.log(error);
          });
    };


React.useEffect(() => {


    axios.get("http://localhost/proyectoTiendas/getLikes.php?id_comment="+comment.id+"&like=1")
      .then(response=>{
        console.log(response.data);
        setlike(response.data.likes);
        
      }).catch(error=>{
        console.log(error);
      });


      axios.get("http://localhost/proyectoTiendas/getLikes.php?id_comment="+comment.id+"&like=0")
      .then(response=>{
        console.log(response.data);
        setdislike(response.data.likes);
        
      }).catch(error=>{
        console.log(error);
      });

    
      //console.log("Tienda: "+tienda.id);

    }, []);

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