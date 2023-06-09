import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Fb from '../firebase';
import './Search.css';

const Search = () => {
  const [data, setData] = useState({});
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get('name');
  console.log('search', search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    Fb.child('contacts')
      .orderByChild('name')
      .equalTo(search)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  return (
    <>
      <div style={{ marginTop: '100px' }}>
       <h2> Search Results</h2>
        {Object.keys(data).length === 0 && (
          <h2>No Contact Found</h2>
        )}
        {Object.keys(data).length > 0 && (
          <table className='styled-table'>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>No</th>
                <th style={{ textAlign: 'center' }}>Name</th>
                <th style={{ textAlign: 'center' }}>Email</th>
                <th style={{ textAlign: 'center' }}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
         <Link to="/">
            <button className="btn btn-edit">Go Back</button>
        </Link>
      </div>
    </>
  );
};

export default Search;
