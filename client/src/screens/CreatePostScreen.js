import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreatePostScreen = () => {
    const [postName, setPostName] = useState('');
    const [postContent, setPostContent] = useState('');
    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Post Name:', postName);
        console.log('Post Content:', postContent);

        const API = 'https://posts-api-an9e.onrender.com/post/create';
        const userJwt = Cookies.get('userJwt');

        try {
            const response = await axios.post(API, { name: postName, postContent: postContent }, {
                headers: {
                    Authorization: userJwt,
                },
            });
            console.log(response);
            console.log(response?.status);
            if (response?.status === 201) {
                console.log("navigate to another page");
                navigate('/')
            } else {
                console.log("dont");
            }

        } catch (error) {
            console.error('Error:', error);
        }
        console.log(userJwt);

    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1>Create a New Post</h1>
                <label>
                    Post Name:
                    <input
                        type="text"
                        value={postName}
                        onChange={(e) => setPostName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Post Content:
                    <input
                        type='text'
                        style={{ height: '200px' }}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
};

export default CreatePostScreen;
