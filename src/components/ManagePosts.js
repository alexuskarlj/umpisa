import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ManagePosts.css';

const ManagePosts = () => {
  // State to manage posts
  const [posts, setPosts] = useState([]);

  // State for the form fields
  const [formData, setFormData] = useState({
    id: '',
    author: 'Me', // Default author as "Me"
    content: '',
    timestamp: '',
  });

  // Function to fetch posts from the backend
  const fetchPosts = () => {
    axios
      .get('http://localhost:8000/api/posts/')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  // Use useEffect to fetch data initially and then set up a polling mechanism
  useEffect(() => {
    // Fetch posts initially
    fetchPosts();

    // Set up a polling mechanism to fetch data every 10 seconds (10,000 milliseconds)
    const intervalId = setInterval(() => {
      fetchPosts();
    }, 10000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle form submission for adding or updating a post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update an existing post
      axios
        .put(`http://localhost:8000/api/posts/${formData.id}/`, formData)
        .then(() => {
          const updatedPosts = posts.map((post) =>
            post.id === formData.id ? formData : post
          );
          setPosts(updatedPosts);
          setFormData({ id: '', author: 'Me', content: '', timestamp: '' });
          fetchPosts();
        })
        .catch((error) => {
          console.error('Error updating post:', error);
        });
    } else {
      // Add a new post
      axios
        .post('http://localhost:8000/api/posts/', formData)
        .then((response) => {
          const newPost = response.data;
          setPosts([...posts, newPost]);
          setFormData({ id: '', author: 'Me', content: '', timestamp: '' });
          fetchPosts();
        })
        .catch((error) => {
          console.error('Error adding post:', error);
        });
    }
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to delete a post
  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:8000/api/posts/${postId}/delete/`)
      .then(() => {
        // Handle successful deletion here (e.g., update the component's state)
        fetchPosts();
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div id="manage-posts-container">
      <h2>Manage Posts</h2>

      {/* Form for adding/updating a post */}
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        <label>
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className={formData.id ? 'update-button' : 'add-button'}
        >
          {formData.id ? 'Update Post' : 'Add Post'}
        </button>
      </form>

      {/* Table to display the list of posts */}
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts
            .filter((post) => post.author === 'Me') // Filter posts by author "Me"
            .map((post) => (
              <tr key={post.id}>
                <td>{post.content}</td>
                <td>
                  <button
                    onClick={() => setFormData(post)} // Populate form fields for editing
                    className="update-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)} // Delete a post
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePosts;
