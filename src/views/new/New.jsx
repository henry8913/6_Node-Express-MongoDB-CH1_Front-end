import React, { useState, useEffect } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import { API_URL } from "../../config/config";
import { useNavigate, useParams } from "react-router-dom";
import htmlToDraft from 'html-to-draftjs';
import { ContentState } from 'draft-js';

const NewBlogPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [coverFile, setCoverFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [authorName, setAuthorName] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [existingPostId, setExistingPostId] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (params.id) {
        try {
          const response = await fetch(`${API_URL}/posts/${params.id}`);
          const post = await response.json();
          setTitle(post.title);
          setCategory(post.category);
          setAuthorName(post.author.name);
          setExistingPostId(post._id);
          setIsEditing(true);

          // Convert HTML content to EditorState
          const contentBlock = htmlToDraft(post.content);
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          navigate('/404');
        }
      }
    };
    fetchPost();
  }, [params.id, navigate]);

  const uploadImage = async (file, type) => {
    const formData = new FormData();
    formData.append('image', file);

    const endpoint = type === 'cover' 
      ? `${API_URL}/posts/cover` 
      : `${API_URL}/authors/avatar`;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Per pubblicare un nuovo post devi prima effettuare il login');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }

      let coverUrl = '';
      let avatarUrl = '';

      if (coverFile) {
        coverUrl = await uploadImage(coverFile, 'cover');
      }
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile, 'avatar');
      }

      const postData = {
        category,
        title,
        cover: coverUrl || (isEditing ? undefined : ''),
        readTime: {
          value: 5,
          unit: "minute"
        },
        author: {
          name: authorName,
          avatar: avatarUrl || (isEditing ? undefined : '')
        },
        content
      };

      if (!isEditing) {
        const response = await fetch(`${API_URL}/posts`);
        const posts = await response.json();
        const maxId = Math.max(...posts.map(post => post._id), 0);
        postData._id = maxId + 1;
        postData.createdAt = new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }

      const newId = Math.floor(Math.random() * 100000);

      const newPost = {
        _id: newId,
        category,
        title,
        cover: coverUrl,
        readTime: {
          value: 5,
          unit: "minute"
        },
        author: {
          name: authorName,
          avatar: avatarUrl
        },
        content,
        createdAt: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      };

      const url = isEditing ? `${API_URL}/posts/${existingPostId}` : `${API_URL}/posts`;
      const method = isEditing ? 'PUT' : 'POST';

      const postResponse = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (postResponse.ok) {
        navigate('/');
      } else {
        alert('Errore durante la pubblicazione del post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Errore durante la pubblicazione del post');
    }
  };

  return (
    <Container className="new-blog-container">
      <h2 className="text-center mb-4">Crea Nuovo Post</h2>
      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control 
            size="lg" 
            placeholder="Titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control 
            size="lg" 
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Testing</option>
            <option>DevOps</option>
            <option>Database</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Immagine di Copertina</Form.Label>
          <Form.Control 
            type="file"
            onChange={(e) => setCoverFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Nome Autore</Form.Label>
          <Form.Control 
            size="lg" 
            placeholder="Nome Autore"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-avatar" className="mt-3">
          <Form.Label>Avatar Autore</Form.Label>
          <Form.Control 
            type="file"
            name="image"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button 
            type="reset" 
            size="lg" 
            variant="outline-dark"
            onClick={() => {
              setTitle("");
              setCategory("Frontend");
              setCoverFile(null);
              setAvatarFile(null);
              setEditorState(EditorState.createEmpty());
              setAuthorName("");
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Pubblica
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;