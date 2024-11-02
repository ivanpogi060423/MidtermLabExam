import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function BookEdit() {

    let { id } = useParams();

 

    const [loading, setLoading] = useState(true)
    const [InputErrorList, setInputErrorList] = useState({})
    const [book, setBook] = useState({})

    useEffect(() => {

        axios.get(`http://localhost:8000/api/books/${id}/edit`).then(res=> {
            console.log(res)
            setBook(res.data.book);
            setLoading(false)
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
 
    }, [id])

    const handleInput = (e) => {
        e.persist();
        setBook({...book, [e.target.name]: e.target.value });

    }

    const updateBook = (e) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            title : book.title,
            author : book.author,
            published_year : book.published_year,
            genre : book.genre,
            description : book.description,
        }

        axios.put(`http://localhost:8000/api/books/${id}/update`, data)
            .then(res => {

                alert(res.data.message);
                setLoading(false);
            })
            .catch(function (error) {
                
                if(error.response){

                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors)
                        setLoading(false);

                        }
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
    
    if(Object.keys(book).length === 0){
        return (
            <div className="container">
                <h4>No Book ID Found</h4>
            </div>
        )
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Book Info 
                                    <Link to="/books" className="btn btn-danger float-end">Back</Link>
                                </h4>
                            </div>
                        <div className="card-body">
                            <form onSubmit={updateBook}>
                            <div className="mb-3">
                                <label>Book Title</label>
                                <input type="text" name="title" value={book.title} onChange={handleInput} className="form-control" />
                                <span className="text-danger">{InputErrorList.title}</span>
                            </div>
                            <div className="mb-3">
                                <label>Book Author</label>
                                <input type="text" name="author" value={book.author} onChange={handleInput} className="form-control" />
                                <span className="text-danger">{InputErrorList.author}</span>
                            </div>
                            <div className="mb-3">
                                <label>Year of Publication</label>
                                <input type="text" name="published_year" value={book.published_year} onChange={handleInput} className="form-control" />
                                <span className="text-danger">{InputErrorList.published_year}</span>
                            </div>
                            <div className="mb-3">
                                <label>Genre</label>
                                <input type="text" name="genre" value={book.genre} onChange={handleInput} className="form-control" />
                                <span className="text-danger">{InputErrorList.description}</span>
                            </div>
                            <div className="mb-3">
                                <label>Book Description</label>
                                <input type="text" name="description" value={book.description} onChange={handleInput} className="form-control" />
                                <span className="text-danger">{InputErrorList.description}</span>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Update Book</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default BookEdit;