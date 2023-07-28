import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');
  const [editName, setEditName] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = () => {
    axios.get('http://localhost:5000/api/names')

      .then(res => setNames(res.data))
      .catch(err => console.log(err));
  };

  const handleCreate = () => {
    axios.post('http://localhost:5000/api/names', { name: newName })
      .then(() => {

        setNewName('');
        //  fetchNames();
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/names/${editId}`, { name: editName })
      .then(() => {
        setEditName('');
        setEditId('');
        fetchNames();
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/names/${id}`)
      .then(() => fetchNames())
      .catch(err => console.log(err));
  };

  return (
    <div style={{border:"2px solid black",textAlign:"center"}}>
      <h1 style={{color:"red"}}>CRUD OPERATION</h1>
      <div>
        <input type="text" value={newName}onChange={(e) => setNewName(e.target.value)} placeholder="Enter a name" style={{padding:"10px"}}/>
        <button onClick={handleCreate} style={{backgroundColor:"coral",color:"white", padding:"10px"}}>Add Name</button>  
        </div>
        <div>
        <button onClick={fetchNames} style={{backgroundColor:"black",color:"white"}}>view all users</button>  
        </div>
           <ul style={{fontSize:"30px",listStyle:"none"}}>
        {names.map((name) => (
          <li key={name._id} style={{fontFamily:"Times New Roman"}}>
            {editId === name._id ? (
              <>
                <input  type="text"value={editName}onChange={(e) => setEditName(e.target.value)}/>
      <button onClick={handleUpdate}>Save</button>
              </>
            ) : (
              <>
                {name.name}
                <button onClick={() => handleEdit(name._id, name.name)} style={{backgroundColor:"blue",color:"white"}}>Edit</button>
                <button onClick={() => handleDelete(name._id)} style={{backgroundColor:"red",color:"white"}}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
