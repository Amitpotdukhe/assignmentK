import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/Header';

export const HomeScreen = () => {
    const [initialPosts, setInitialPosts] = useState([])

    // const initialPosts = [
    //     { id: 1, title: 'Post 1', content: 'Content of Post 1' },
    //     { id: 2, title: 'Post 2', content: 'Content of Post 2' },
    //     { id: 3, title: 'Post 3', content: 'Content of Post 3' },
    //     { id: 4, title: 'amit', content: 'Content of Post 3' },
    //     { id: 5, title: 'saasf', content: 'Content of Post 3' },
    //     { id: 6, title: 'adf', content: 'Content of Post 3' },
    // ];

    useEffect(() => {
        const API = 'https://posts-api-an9e.onrender.com/post';

        const fetchData = async () => {
            try {
                const response = await axios.get(API);
                setInitialPosts(response.data.posts);
                setPosts(response.data.posts)
                console.log("initialPosts", response.data.posts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);



    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([])

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filteredItems = posts.filter(item =>
            item.name.toLowerCase().includes(value)
        );

        setInitialPosts(filteredItems);
    };
    return (
        <>
            <Header />
            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div>
                {initialPosts.map((post) => (
                    <PostCard key={post._id} title={post.name} content={post.postContent} id={post._id} />
                ))}
            </div>
        </>
    )
}
