import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const PostScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [comment, setComment] = useState("")
    const [filteredComments, setFilteredComments] = useState([]);
    const { id } = useParams();

    // const [title, setTitle] = useState("")
    // const [author, setAuthor] = useState("")
    // const [postContent, setPostContent] = useState("")

    const [data, setData] = useState({})

    useEffect(() => {
        const userJwt = Cookies.get('userJwt');
        console.log(userJwt);
        const API = `https://posts-api-an9e.onrender.com/post/post/${id}`;

        const fetchData = async () => {
            try {
                const response = await axios.get(API, {
                    headers: {
                        Authorization: userJwt,
                    },
                });
                setData(response.data);
                // setAuthor(data.post._id);
                // setTitle(data.post.name);
                // setPostContent(data.post.postContent);
                // setFilteredComments(data.comments)
                console.log("in useeffect comments : ", response.data.comments);
                setFilteredComments(response.data.comments);
                console.log(data);
                console.log("initialPosts", response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        console.log("all daat :", data);
    }, []);


    // const handleSearchChange = (e) => {
    //     const value = e.target.value.toLowerCase();
    //     setSearchQuery(value);

    //     const filteredItems = commentArray.filter(comment =>
    //         comment.toLowerCase().includes(value)
    //     );

    //     setFilteredComments(filteredItems);
    // };

    const handleAddComment = async () => {
        console.log(comment);
        const API = 'https://posts-api-an9e.onrender.com/post/comment';
        const userJwt = Cookies.get('userJwt');

        try {
            const response = await axios.post(API, { comment: comment, postId: id }, {
                headers: {
                    Authorization: userJwt,
                },
            });
            console.log("new commenet : ", response?.data?.data);
            console.log(response?.status);
            if (response?.status === 201) {
                // const newObj = filteredComments
                // newObj.push(response.data.data);
                setFilteredComments([...filteredComments, response?.data])
                // console.log(filteredComments);
                console.log(response?.data);
            } else {
                console.log("dont");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="post-card">
            <h2>{data?.post?.name}</h2>
            <p>Author: {data?.authorName}</p>
            <p>{data?.post?.postContent}</p>

            <div>
                <input
                    type="text"
                    placeholder="Search comments..."
                    value={searchQuery}
                // onChange={handleSearchChange}
                />
            </div>
            <input
                type="text"
                placeholder="Add comments..."
                value={comment}
                onChange={e => { setComment(e.target.value) }}
            />
            <button onClick={handleAddComment}>Add</button>
            <ul>
                {/* {filteredComments} */}
                {filteredComments.map((comment, index) => (
                    <li key={comment?._id}>By : {comment?.userId} - {comment?.comment} </li>
                ))}
            </ul>
        </div>
    );
}

export default PostScreen
