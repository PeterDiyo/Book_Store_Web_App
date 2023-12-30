import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/books/${ id }`)
    .then((res) =>{ 
      setBooks(res.data.book);
      setLoading(false);
    })
      .catch((error) =>{
        console.log(error);
        setLoading(false);
      });
  }, []); // Add the 'id' dependency to trigger the effect when the 'id' changes

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl width-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-grey-500'>Id</span>
            <span>{books._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-grey-500'>Title</span>
            <span>{books.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-grey-500'>Author</span>
            <span>{books.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-grey-500'>Publish Year</span>
            <span>{books.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-grey-500'>Create Time</span>
            <span>{new Date(books.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-grey-500'>Last Update Time</span>
            <span>{new Date(books.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
