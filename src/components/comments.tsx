import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { jwtDecode } from 'jwt-decode';

interface Rating {
  ratingId: number;
  userName: string;
  userId: number;
  rate: number;
  comment: string;
  createdTime: string;
}

interface RateDto {
  productId: number;
  rate: number;
  comment: string;
}

// StarRating component
const StarRating = ({ value, onChange }: { value: number; onChange: (rate: number) => void }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          style={{ cursor: 'pointer', color: star <= value ? '#ff9900' : '#ddd' }}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5em',
    marginBottom: '10px',
  },
  error: {
    color: '#ff4d4d',
    textAlign: 'center',
    margin: '10px 0',
  },
  commentsList: {
    listStyle: 'none',
    padding: '0',
    margin: '20px 0',
  },
  commentItem: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #ddd',
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#555',
  },
  commentRate: {
    display: 'flex',
    color: '#ff9900',
    fontWeight: 'bold',
    marginLeft: '8px',
  },
  commentText: {
    margin: '8px 0',
    fontSize: '0.95em',
    color: '#333',
  },
  commentDate: {
    color: '#888',
    fontSize: '0.85em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1em',
    color: '#555',
  },
  formInput: {
    padding: '8px',
    fontSize: '1em',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  formTextarea: {
    padding: '8px',
    fontSize: '1em',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    color: '#ff4d4d',
    cursor: 'pointer',
    fontSize: '0.9em',
    border: 'none',
    background: 'none',
    textAlign: 'right',
    padding: '0',
    marginTop: '8px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  editButton: {
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '0.9em',
    border: 'none',
    background: 'none',
    textAlign: 'right',
    padding: '0',
    marginTop: '8px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const Comments = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [newRate, setNewRate] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [hasCommented, setHasCommented] = useState<boolean>(false);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [commentToEdit, setCommentToEdit] = useState<Rating | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ratings/${id}`);
        setRatings(response.data);

        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          setUserId(decodedToken.id);

          const userComment = response.data.find((rating: Rating) => rating.userId === decodedToken.id);
          if (userComment) {
            setHasCommented(userComment.comment !== '');
            setHasRated(true);
          }
        }
      } catch (error) {
        setError('Failed to load ratings.');
      }
    };
    fetchRatings();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const rateDto: RateDto = {
        productId: parseInt(id ?? '', 10),
        rate: newRate,
        comment: newComment,
      };

      const token = localStorage.getItem('token');
      if (!token) {
        setError("You need to log in to submit a rating.");
        return;
      }

      if (isEditing && commentToEdit) {
        await axios.put(`http://localhost:8080/ratings/update/${commentToEdit.ratingId}`, rateDto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:8080/ratings/add-or-update', rateDto, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setNewRate(0);
      setNewComment('');
      setIsEditing(false);

      const response = await axios.get(`http://localhost:8080/ratings/${id}`);
      setRatings(response.data);
      setHasRated(true);
      if (newComment !== '') setHasCommented(true);
    } catch (error) {
      setError('Failed to add/update rating.');
    }
  };

  const handleDelete = async (ratingId: number, userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to log in to delete a comment.');
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      const loggedInUserId = decodedToken.id;
  
      if (loggedInUserId !== userId) {
        setError('You can only delete your own comments.');
        return;
      }
  
      await axios.delete(`http://localhost:8080/ratings/delete/${ratingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setRatings(ratings.filter((rating) => rating.ratingId !== ratingId));
      setHasRated(false);
      setHasCommented(false);
    } catch (error) {
      setError('Failed to delete comment.');
    }
  };

  const handleEdit = (rating: Rating) => {
    setIsEditing(true);
    setCommentToEdit(rating);
    setNewRate(rating.rate);
    setNewComment(rating.comment);
  };

  const renderStars = (rate: number) => {
    return (
      <span className={classes.commentRate}>
        {Array(rate).fill('★').map((star, index) => (
          <span key={index} style={{ color: '#ff9900' }}>{star}</span>
        ))}
        {Array(5 - rate).fill('★').map((star, index) => (
          <span key={index} style={{ color: '#ddd' }}>{star}</span>
        ))}
      </span>
    );
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Komentarze</h3>
      {error && <div className={classes.error}>{error}</div>}

      <ul className={classes.commentsList}>
        {ratings.map((rating) => (
          <li key={rating.ratingId} className={classes.commentItem}>
            <strong className={classes.commentUser}>{rating.userName}:</strong>
            {renderStars(rating.rate)}
            <p className={classes.commentText}>{rating.comment}</p>
            <small className={classes.commentDate}>{new Date(rating.createdTime).toLocaleDateString()}</small>

            {rating.userId === userId && !isEditing && (
              <button
                className={classes.editButton}
                onClick={() => handleEdit(rating)}
              >
                Edit
              </button>
            )}

            {rating.userId === userId && (
              <button
                className={classes.deleteButton}
                onClick={() => handleDelete(rating.ratingId, rating.userId)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {(!hasRated || (hasRated && !hasCommented)) || isEditing ? (
        <>
          <h4 className={classes.title}>{isEditing ? 'Edit Your Rating' : 'Add Your Rating'}</h4>
          <form className={classes.form} onSubmit={handleSubmit}>
            <label className={classes.formLabel}>
              Rate:
              <StarRating value={newRate} onChange={setNewRate} />
            </label>
            <label className={classes.formLabel}>
              Comment:
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={classes.formTextarea}
              />
            </label>
            <button type="submit" className={classes.submitButton}>{isEditing ? 'Update' : 'Submit'}</button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default Comments;
