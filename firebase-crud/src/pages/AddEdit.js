import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddEdit.css';
import Fb from '../firebase';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  contact: ''
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      Fb.child(`contacts/${id}`).on('value', (snapshot) => {
        const contactData = snapshot.val();
        setState({
          name: contactData.name || '',
          email: contactData.email || '',
          contact: contactData.contact || ''
        });
      });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, contact } = state;
    if (!name || !email || !contact) {
      toast.error('Please provide value in each input field');
    } else {
      if (id) {
        Fb.child(`contacts/${id}`).update(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Contact Updated Successfully');
          }
        });
      } else {
        Fb.child('contacts').push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Contact Added Successfully');
          }
        });
      }
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const { name, email, contact } = state;

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center'
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Contact name'
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Contact email id'
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor='contact'>Contact</label>
        <input
          type='number'
          id='contact'
          name='contact'
          placeholder='Contact'
          value={contact}
          onChange={handleInputChange}
        />

        <input type='submit' value={id ? 'Update' : 'Save'} />
      </form>
    </div>
  );
};

export default AddEdit;
