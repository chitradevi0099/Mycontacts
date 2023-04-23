import React, { useState, useEffect } from "react";
import Fb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    Fb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete the contact?")) {
      Fb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("contact deleted successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSort(true);
    setSortBy(value);

    Fb.child("contacts")
      .orderByChild(value)
      .on("value", (snapshot) => {
        const sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);
    setSortBy("");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            {!sort && (
              <th style={{ textAlign: "center" }}>Action</th>
            )}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <label>Sort:</label>
      
      <select className="dropdown" name="colValue" onChange={handleChange}>
        <option > Select</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Contact</option>
        
      </select>
      <button className="btn btn-reset" onClick={handleReset}> Reset</button>
    <br/>
    </div>
  )
}

export default Home
