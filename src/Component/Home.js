// Home.js
import React from 'react';

const Home = ({ isAuthenticated }) => {
  return (
    <div>
      <h2>Welcome to my app!</h2>
      {isAuthenticated ? (
        <p>Logged in! You can see the content.</p>
      ) : (
        <p>Please log in to view the content.</p>
      )}
    </div>
  );
};

export default Home;
