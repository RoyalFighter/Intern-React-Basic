import React, { useReducer, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useDarkMode from './CustomHooks/useChangeMode';

//this perform following action
const ReducerDemo = (state, action) => {
  switch (action.type) {
    case 'fetch-data':
      return { ...state, loading: true, showButton: true };
    case 'fetch-success':
      return { ...state, loading: false, data: action.payload, showForm: true };
    case 'add-post':
      return { ...state, data: [action.payload, ...state.data] };
    case 'update-post':
      const updatedData = state.data.map((post) =>
        post.id === action.payload.id ? { ...post, title: action.payload.title, body: action.payload.body } : post
      );
      return { ...state, data: updatedData };
    case 'delete-post':
      const updatedDataAfterDelete = state.data.filter((post) => post.id !== action.payload);
      return { ...state, data: updatedDataAfterDelete };
    default:
      return state;
  }
};

function UseReducerDemo() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const initialState = {
    data: [],
    loading: false,
    showButton: true,
    showForm: false, // New state to control the visibility of the form
  };

  const [state, dispatch] = useReducer(ReducerDemo, initialState);
  const [countdown, setCountdown] = useState(4);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log('Data fetched:', data);
        dispatch({ type: 'fetch-success', payload: data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (state.loading && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }

    if (state.loading && countdown === 0) {
      fetchData();
    }
  }, [state.loading, countdown]);

  const handleAddUpdatePost = () => {
    const postIdToUpdate = newPost.id;
    
  // Check if either title or body is empty
  if (!newPost.title.trim() || !newPost.body.trim()) {
    toast.error('Both title and body are required.'); // Show error toast
    return; // Prevent further execution
  }

    if (postIdToUpdate) {
      // If postIdToUpdate exists, it means it's an update
      dispatch({
        type: 'update-post',
        payload: { id: postIdToUpdate, title: newPost.title, body: newPost.body },
      });
    } else {
      // If postIdToUpdate is null, it means it's an add
      const newPostWithId = { ...newPost, id: state.data.length + 1 };

      dispatch({ type: 'add-post', payload: newPostWithId });
    }

    // Reset the newPost state after adding or updating
    setNewPost({ title: '', body: '' });
  };

  const handleEdit = (postId) => {
    const postToEdit = state.data.find((post) => post.id === postId);
    setNewPost({ ...postToEdit });
  };

  const handleDelete = async (postId) => {
    try {
      dispatch({ type: 'delete-post', payload: postId });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='container mt-5'>
      {state.showButton && (
        <button className='btn btn-primary' onClick={() => dispatch({ type: 'fetch-data' })}>
          {state.loading ? 'Fetching Data' : 'Fetch Data'}
        </button>
      )}
      {state.loading && <p>Fetching data in {countdown} seconds...</p>}
      {state.loading && <img src="/loader.gif" alt="Loading..." />}

      {/* Display the form only after fetching data */}
      {state.showForm && (
        <div>
          <input
            type='text'
            className='form-control mt-2'
            placeholder='Title'
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <input
            type='text'
            className='form-control mt-2'
            placeholder='Body'
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <button className='btn btn-success mt-2' onClick={handleAddUpdatePost}>
            {newPost.id ? 'Update Post' : 'Add Post'}
          </button>
        </div>
      )}

      <div className={`container mt-3 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <ul className={`list-group  ${isDarkMode ? 'dark-mode' : 'light-mode'} `}>
          {state.data.map((post) => (
            <li key={post.id} className='list-group-item '>
              {post.title}
              <button className='btn btn-warning ml-2' onClick={() => handleEdit(post.id)}>
                Edit
              </button>
              <button className='btn btn-danger ml-2' onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UseReducerDemo;
