import React from 'react';

function DownloadSourceCode() {
  const githubRepoUrl = 'https://github.com/RoyalFighter/Intern-React-Basic.git';

  const handleShowSourceCodeClick = () => {
    window.open(githubRepoUrl, '_blank');
  };

  const handleDownloadClick = () => {
    const anchor = document.createElement('a');
    anchor.href = './Intern-React-Basic-main.zip';
    anchor.download = 'Intern-React-Basic-main.zip';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShowSourceCodeClick}>
        Show Source Code
      </button>
      <span style={{ marginRight: '10px' }}></span>
      <button className="btn btn-success " onClick={handleDownloadClick}>
        Download Source Code
      </button>
    </div>
  );
}

export default DownloadSourceCode;
