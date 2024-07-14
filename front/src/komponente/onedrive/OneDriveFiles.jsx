import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OneDriveFiles = () => {
  const [files, setFiles] = useState(null);

  const getAuthToken = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/onedrive/token');
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const token = await getAuthToken();
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/onedrive/files', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFiles(response.data.value);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      }
    };

    fetchFiles();
  }, []);

  if (!files) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Files from OneDrive</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file['@microsoft.graph.downloadUrl']} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background:
      'linear-gradient(135deg, #e2dadb 25%, #dae2df 25%, #dae2df 50%, #a2a7a5 50%, #a2a7a5 75%, #6d696a 75%)',
  },
};

export default OneDriveFiles;
