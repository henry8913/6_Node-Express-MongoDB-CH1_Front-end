
import React, { useEffect, useState } from "react";
import { Container, Image, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config/config";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import CommentForm from "../../components/comments/CommentForm";
import CommentList from "../../components/comments/CommentList";
import "./styles.css";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
          setLoading(false);
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/404");
      }
    };

    fetchPost();
  }, [params.id, navigate]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={blog.cover} fluid />
        <h1 className="blog-details-title">{blog.title}</h1>

        <div className="blog-details-container">
          <div className="blog-details-author">
            <BlogAuthor {...blog.author} />
          </div>
          <div className="blog-details-info">
            <div>{blog.createdAt}</div>
            <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
            <div style={{ marginTop: 20 }}>
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        
        {user && blog.author && user.name === blog.author.name && (
          <div className="blog-actions mt-4 mb-4 d-flex gap-3">
            <Button 
              variant="primary" 
              onClick={() => navigate(`/edit/${blog._id}`)}
              className="me-2"
            >
              Modifica Post
            </Button>
            <Button 
              variant="danger" 
              onClick={() => setShowDeleteModal(true)}
            >
              Elimina Post
            </Button>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
              <Modal.Header closeButton className="border-bottom-0">
                <Modal.Title>Conferma Eliminazione</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Sei sicuro di voler eliminare questo post? Questa azione non può essere annullata.
              </Modal.Body>
              <Modal.Footer className="border-top-0">
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Annulla
                </Button>
                <Button 
                  variant="danger" 
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");
                      const response = await fetch(`${API_URL}/posts/${blog._id}`, {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                      
                      if (response.ok) {
                        navigate("/");
                      } else {
                        const data = await response.json();
                        setError(data.error || "Errore durante l'eliminazione del post");
                        setShowErrorModal(true);
                      }
                    } catch (error) {
                      console.error("Errore:", error);
                      setError("Errore durante l'eliminazione del post");
                      setShowErrorModal(true);
                    }
                    setShowDeleteModal(false);
                  }}
                >
                  Elimina
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
              <Modal.Header closeButton className="border-bottom-0">
                <Modal.Title>Errore</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {error}
              </Modal.Body>
              <Modal.Footer className="border-top-0">
                <Button variant="primary" onClick={() => setShowErrorModal(false)}>
                  Chiudi
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        
        <div className="blog-comments-section">
          <h3>Commenti</h3>
          <CommentForm postId={params.id} onCommentAdded={(newComment) => {
            setBlog({
              ...blog,
              comments: [...(blog.comments || []), newComment]
            });
          }} />
          <CommentList 
            comments={blog.comments || []} 
            postId={params.id}
            onCommentUpdate={(commentId, updatedComment) => {
              setBlog(prevBlog => ({
                ...prevBlog,
                comments: updatedComment 
                  ? prevBlog.comments.map(c => c._id === commentId ? updatedComment : c)
                  : prevBlog.comments.filter(c => c._id !== commentId)
              }));
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Blog;
