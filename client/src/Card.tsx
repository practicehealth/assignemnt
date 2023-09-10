import React from 'react';
import PropTypes from 'prop-types';
import './TopLeve.css'

const Card = ({ title, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Card;
