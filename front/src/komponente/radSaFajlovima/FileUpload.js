import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [accessRights, setAccessRights] = useState('readonly');
  const [searchParams, setSearchParams] = useState({
    tip: '',
    naziv: ''
  });
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem('user')); // Pretpostavljamo da je korisnik sačuvan kao JSON string

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/fajlovi', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(response.data.fajlovi);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('prava_pristupa', accessRights);

    try {
      await axios.post('http://127.0.0.1:8000/api/fajlovi', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/fajlovi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/fajlovi/pretrazi', {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(response.data.fajlovi);
    } catch (error) {
      console.error('Error searching files:', error);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <input
          type="text"
          value={accessRights}
          onChange={(e) => setAccessRights(e.target.value)}
          placeholder="Access Rights"
          required
        />
        <button type="submit">Upload</button>
      </form>

      <h2>Search Files</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchParams.tip}
          onChange={(e) => setSearchParams({ ...searchParams, tip: e.target.value })}
          placeholder="Type"
        />
        <input
          type="text"
          value={searchParams.naziv}
          onChange={(e) => setSearchParams({ ...searchParams, naziv: e.target.value })}
          placeholder="Name"
        />
        <button type="submit">Search</button>
      </form>

      <h2>Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.naziv} - {file.tip} - {file.velicina} bytes
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
