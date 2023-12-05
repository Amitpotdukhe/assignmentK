import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CreatePostScreen = () => {
    const [postName, setPostName] = useState('');
    const [postContent, setPostContent] = useState('');

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
            <h1>Create a New Post</h1>
            <form onSubmit={handleFormSubmit}>
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
                    <textarea
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
