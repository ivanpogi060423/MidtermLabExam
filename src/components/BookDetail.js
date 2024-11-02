import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the book details from the API
        axios.get(`http://localhost:8000/api/books/${id}`)
            .then(res => {
                setBook(res.data.book); // Adjust based on your API response
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching book details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Please wait...</div>;
    }

    if (!book) {
        return <div>No book found!</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Book Details</h1>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published Year:</strong> {book.published_year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <Link to="/books" className="btn btn-danger">Back to Book List</Link>
        </div>
    );
}

export default BookDetail;