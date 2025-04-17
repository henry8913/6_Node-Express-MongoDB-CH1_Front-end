
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { API_URL } from "../../../config/config";
import BlogItem from "../blog-item/BlogItem";

const BlogList = ({ searchQuery, searchType }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let url = `${API_URL}/posts`;
                if (searchQuery) {
                    if (searchType === 'title') {
                        url += `?title=${searchQuery}`;
                    } else if (searchType === 'author') {
                        url += `?author=${searchQuery}`;
                    }
                }
                const response = await fetch(url);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [searchQuery, searchType]);

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
