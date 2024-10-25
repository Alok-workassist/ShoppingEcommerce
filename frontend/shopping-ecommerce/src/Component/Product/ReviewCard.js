import React from 'react'
import Profile from '../../assests/Profile.png'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: 'rgba(20,20,20,0.4)',
        activeColor: 'tomato',
        value: review ? review.rating : 0,
        size: window.innerWidth < 600 ? 10 : 25,
        isHalf: true,
    };

  return (
    <div className='reviewCard'>
        <img src={Profile} alt='User'/>
        <p>{review.name}</p>

        <ReactStars  {...options}/>
        <span className='reviewCardComment'>{review.comment}</span>

      
    </div>
  )
}

export default ReviewCard
