import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import ShowBooks from './pages/ShowBooks';
import EditBooks from './pages/EditBooks';
import DeleteBook from './pages/DeleteBook';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/books/create' element={ <CreateBooks />} />
      <Route path='/books/details/:id' element={ <ShowBooks />} />
      <Route path='/books/edit/:id' element={ <EditBooks />} />
      <Route path='/books/delete/:id' element={ <DeleteBook />} />
    </Routes>
  );
};

export default App;