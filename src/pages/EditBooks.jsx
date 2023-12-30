import React, { useState, useEffect } from 'react';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  console.log('Book ID:', id);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)

    .then((res) => {
  const { author, publishYear, title } = res.data;
  setAuthor(author || ''); // Use an empty string if 'author' is undefined
  setPublishYear(publishYear || ''); // Use an empty string if 'publishYear' is undefined
  setTitle(title || ''); // Use an empty string if 'title' is undefined
  setLoading(false);
})

    
    
    .catch((error) => {
      alert('An error happened. please check console');
      console.log(error);
    })
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };
  

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4 text-gray-800 font-semibold'>Edit Book</h1>
      {loading ? <Spinner /> : ''}

      <div className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='flex justify-end'>
            <button
              className='px-6 py-2 bg-sky-800 text-white rounded-md hover:bg-blue-600 focus:outline-none'
              type='button'
              onClick={handleEditBook}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;