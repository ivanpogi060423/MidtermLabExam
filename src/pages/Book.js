import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Book(){

    const [loading, setLoading] = useState([true]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/books')
            .then(res => {
                if (res.data.books) {
                    setBooks(res.data.books);
                } else {
                    setBooks([]); 
                }
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setBooks([]); 
                }
                setLoading(false);
            });
    }, []);

    
    const deleteBook = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://localhost:8000/api/books/${id}/delete`)
            .then(res => {

                alert(res.data.message);
                thisClicked.closest("tr").remove();
            })
            .catch(function (error) {
                
                if(error.response){

                        if(error.response.status === 404){
                            alert(error.response.data.message)
                            setLoading(false);
                            }
                        if(error.response.status === 500){
                            alert(error.response.data.errors)
                            setLoading(false);
                        
                        }
                    }
            });
    }

    if(loading){
        return (
            <div>
                Please wait...
            </div>
        )
    }
    
    var booksDetails = "";
    booksDetails = books.map( (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                    <Link to={`/books/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteBook(e, item.id)} className="btn btn-danger">Delete</button>
                </td>
                <td>
                <Link to={`/books/${item.id}`} className="btn btn-success">View</Link>
                </td>
            </tr>
        )
    });

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Book List
                                <Link to="/books/create" className="btn btn-primary float-end">Add Book</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Book Title</th>
                                        <th>Book Author</th>
                                        <th>Edit</th>
                                        <th>Deletes</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booksDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book;