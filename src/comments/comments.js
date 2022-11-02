import {useState, useEffect} from "react";
import { getComments as getCommentsApi, 
    createComment as createCommentApi, 
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi} from "../Api";
import Comment from "./comment";
import CommentForm from "./commentForm";
import axios from 'axios';

function Comments (props) {

    const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("id_usuario"));

    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter((backendComment) =>
    backendComment.parentId === null);



    
    const getReplies = commentId => {
        return backendComments.filter(backendComment => 
            backendComment.parentId === commentId).sort(
                (a,b) => new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
    };

    const addComment = (text, parentId) => {
        console.log('addComment', text, parentId);
        /*createCommentApi(text, parentId).then(comment =>{
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });*/

        const dataEnviar = {
            body: text,
            parentId: parentId,
            userId: localStorage.getItem("id_usuario"),
            tienda: props.tienda,
            producto: props.id
            //createdAt: new Date().toISOString()
        };
        console.log(dataEnviar);
        
        axios.post('http://localhost/proyectoTiendas/nuevoComentario.php',dataEnviar).then(response => console.log(response));
    };

    const deleteComment = (commentId) => {
        if(window.confirm("Seguro quieres borrar el comentario?")){
            deleteCommentApi(commentId).then(() => {
                const updateBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updateBackendComments);
            });
        }
    };

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updateBackendComments = backendComments.map(backendComment => {
                if(backendComment.id === commentId) {
                    return { ...backendComment, body: text};
                }
                return backendComment
            });
                setBackendComments(updateBackendComments);
                setActiveComment(null);
        });
    };

    useEffect(() => {

        axios.get("http://localhost/proyectoTiendas/comentarios.php?id="+props.id+"&tienda="+props.tienda)
        .then(response=>{
          console.log(response.data);
          setBackendComments(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(backendComments);
        
        
    }, []);
   return (
    <div className = "comments">
        <h3 className = "comments-title">Comentarios</h3>
        <div className="comment-form-title">Escribe un comentario</div>
        <CommentForm submitLabel="Comentar" handleSubmit={addComment}/>
        <div className = "comments-container">
{rootComments.map((rootComment) => (
    
    <Comment 
    key={rootComment.id} 
    comment={rootComment} 
    replies = {getReplies(rootComment.id)}
    currentUserId = {currentUserId}
    deleteComment = {deleteComment}
    updateComment = {updateComment}
    activeComment = {activeComment}
    setActiveComment = {setActiveComment}
    addComment = {addComment}
    />
)
)}
        </div>
    </div>
   )
};

export default Comments;