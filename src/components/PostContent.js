import React, { useState, useEffect } from 'react';
import '../css/PostContent.css';

// Post component to display individual posts
const Post = ({ name, text, time }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const words = text.split(' ');
  const isLongPost = words.length > 20;
  const previewText = isLongPost ? words.slice(0, 20).join(' ') + '...' : text;

  // Function to toggle the modal for displaying the full post text
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Function to format the time elapsed since the post was created
  const formatTimeAgo = (timeStr) => {
    const now = new Date();
    const postTime = new Date(timeStr);
    const diff = now - postTime;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours === 1) {
      return '1 hour ago';
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return timeStr;
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <h2>{name}</h2>
        <span>{formatTimeAgo(time)}</span>
      </div>
      <p onClick={isLongPost ? toggleModal : undefined} className={isLongPost ? 'clickable' : ''}>
        {previewText}
      </p>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <p>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const PostContent = () => {
  const [filter, setFilter] = useState('all');
  const [posts, setPosts] = useState([]);

  // Function to fetch posts from the backend
  const fetchData = () => {
    fetch('http://localhost:8000/api/posts/')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up an interval to refresh data every 3 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Filter posts based on the selected filter (all or "Me")
  const filteredPosts = filter === 'me'
    ? posts.filter(post => post.author === 'Me')
    : posts;

  // Sort posts by the time they were created (most recent first)
  const sortedPosts = filteredPosts.slice().sort((a, b) => {
    const timeA = new Date(a.time_created).getTime();
    const timeB = new Date(b.time_created).getTime();
    return timeB - timeA;
  });

  return (
    <div className="content">
      <div className="header">
        <h2>Posts</h2>
        <div className="my-posts-button-container">
          {/* Buttons to filter posts by "All" or "My Posts" */}
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          &nbsp;|&nbsp;
          <button
            onClick={() => setFilter('me')}
            className={`filter-button ${filter === 'me' ? 'active' : ''}`}
          >
            My Posts
          </button>
        </div>
      </div>
      <div className="posts-list">
        {/* Map and display the sorted posts using the Post component */}
        {sortedPosts.map(post => (
          <Post key={post.id} name={post.author} text={post.content} time={post.time_created} />
        ))}
      </div>
    </div>
  );
};

export default PostContent;
