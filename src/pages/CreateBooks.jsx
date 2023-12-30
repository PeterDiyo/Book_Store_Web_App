import React, { useState } from 'react';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    console.log('State values:', title, author, publishYear);
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/books`, data)
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
      <h1 className='text-3xl my-4 text-gray-800 font-semibold'>Create Book</h1>
      {loading ? <Spinner /> : ''}

      <div className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md'>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>Title</label>
            <input
              type='text'
              value={ title }
              onChange={ (e) => setTitle(e.target.value) }
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>Author</label>
            <input
              type='text'
              value={author}
              onChange={ (e) => setAuthor(e.target.value) }
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-600 text-sm font-semibold mb-2'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={ (e) => setPublishYear(e.target.value) }
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='flex justify-end'>
            <button
              className='px-6 py-2 bg-sky-800 text-white rounded-md hover:bg-blue-600 focus:outline-none'
              type='button'
              onClick={handleSaveBook}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBooks;