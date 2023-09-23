import React from 'react';
import styles from './StarRating.module.scss'; 



const StarRating = ({rating}) => {
  // Calcula el número de estrellas llenas
 
  const starsFilled = Math.round(rating / 2);

  // Genera un array de estrellas basado en el número de estrellas llenas
  const stars = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={`${styles.star} ${index < starsFilled ? styles.filled : ''}`}
    > </div>
  ));

  return <div className={styles.rating}>{stars}</div>;
};

export default StarRating;
