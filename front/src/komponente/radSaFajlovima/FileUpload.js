import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [accessRights, setAccessRights] = useState('readonly');
  const [searchParams, setSearchParams] = useState({
    tip: '',
    naziv: ''
  });
  const token = sessionStorage.getItem("token");

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
      setFilteredFiles(response.data.fajlovi);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
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
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
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
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
      console.error('Error deleting file:', error);
    }
  };

  const handleSearch = () => {
    const { tip, naziv } = searchParams;
    const filtered = files.filter(file =>
      (tip === '' || file.tip === tip) &&
      (naziv === '' || file.naziv.toLowerCase().includes(naziv.toLowerCase()))
    );
    setFilteredFiles(filtered);
  };

  return (
    <div className="file-upload-container">
      <h2>Upload File</h2>
      <form onSubmit={handleUpload} className="file-upload-form">
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
      <div className="file-search-form">
        <select
          value={searchParams.tip}
          onChange={(e) => setSearchParams({ ...searchParams, tip: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/png">PNG</option>
          <option value="application/pdf">PDF</option>
          {/* Dodajte ostale tipove po potrebi */}
        </select>
        <input
          type="text"
          value={searchParams.naziv}
          onChange={(e) => setSearchParams({ ...searchParams, naziv: e.target.value })}
          placeholder="Name"
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>

      <h2>Files</h2>
      <ul className="files-list">
        {filteredFiles.map((file) => (
          <li key={file.id} className="file-item">
            <a href={`http://127.0.0.1:8000/api/fajlovi/${file.id}/download`} target="_blank" rel="noopener noreferrer" download={file.naziv}>
              {file.naziv} - {file.tip} - {file.velicina} bytes
            </a>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
