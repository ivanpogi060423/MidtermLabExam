import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function BookForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [InputErrorList, setInputErrorList] = useState({})
    const [book, setBook] = useState({
        title: '',
        author: '',
        published_year: '',
        genre: '',
        description: ''
    })

    const handleInput = (e) => {
        e.persist();
        setBook({...book, [e.target.name]: e.target.value });

    }

    const saveBook = (e) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            title : book.title,
            author : book.author,
            published_year : book.published_year,
            genre : book.genre,
            description : book.description,
        }

        axios.post('http://localhost:8000/api/books', data)
            .then(res => {

                alert(res.data.message);
                setLoading(false);
                navigate('/books');
            })
            .catch(function (error) {
                
                if(error.response){

                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors)
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
    

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Book 
                                    <Link to="/books" className="btn btn-danger float-end">Back</Link>
                                </h4>
                            </div>
                        <div className="card-body">
                            <form onSubmit={saveBook}>
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
                                <button type="submit" className="btn btn-primary">Save Book</button>
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

export default BookForm;