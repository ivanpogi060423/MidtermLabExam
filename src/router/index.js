import {Routes, Route} from 'react-router-dom'
import BookList from '../pages/Book';
import BookCreate from '../components/BookForm';
import BookEdit from '../pages/BookEdit';
import BookDetail from '../components/BookDetail';







function MyRouter(){
    return (
        <Routes>
            <Route path="/books" element={<BookList />} />
            <Route path="books/create" element={<BookCreate />} />
            <Route path="books/:id/edit" element={<BookEdit />} />
            <Route path="books/:id" element={<BookDetail />} />

        </Routes>
    )
}

export default MyRouter;