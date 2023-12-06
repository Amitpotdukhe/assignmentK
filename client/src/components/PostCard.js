import React from 'react';
import { Link } from 'react-router-dom';


const PostCard = ({ title, content, id }) => {
    return (
        <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px',
                borderRadius: '8px',
                width: '300px',
                display: 'inline-block',
                verticalAlign: 'top'
            }}>
                <h3>{title}</h3>
                <p>{content}</p>
                <p style={{ textDecoration: 'underline' }}>View full post-></p>
            </div>
        </Link>
    );
};

export default PostCard;
