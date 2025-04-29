
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
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
      <div className="blog-comments-section">
          <h3>Commenti</h3>
          <CommentForm postId={params.id} onCommentAdded={(newComment) => {
            setBlog({
              ...blog,
              comments: [...(blog.comments || []), newComment]
            });
          }} />
          <CommentList comments={blog.comments || []} />
        </div>
      </Container>
    </div>
  );
};

export default Blog;
