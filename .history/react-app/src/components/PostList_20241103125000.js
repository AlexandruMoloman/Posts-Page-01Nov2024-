import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  // Получение списка постов
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8080/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Добавление нового поста
  const handleAddPost = () => {
    axios
      .post('http://127.0.0.1:8080/posts', newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', content: '' });
      })
      .catch((error) => {
        console.error('Error adding post:', error);
      });
  };

  // Удаление поста
  const handleDeletePost = (postId) => {
    axios
      .delete(`http://127.0.0.1:8080/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Content"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default PostList;
