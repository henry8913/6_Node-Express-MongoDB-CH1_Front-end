
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { API_URL } from "../../../config/config";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}/posts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Row>
            {posts.map((post) => (
                <Col
                    key={post._id}
                    md={4}
                    style={{
                        marginBottom: 50,
                    }}
                >
                    <BlogItem {...post} />
                </Col>
            ))}
        </Row>
    );
};

export default BlogList;
