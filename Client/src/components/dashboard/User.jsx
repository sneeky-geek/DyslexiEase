import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Random");
  };

  return (
    <div>
      <button onClick={handleClick}>Random</button>
    </div>
  );
};

export default User;
