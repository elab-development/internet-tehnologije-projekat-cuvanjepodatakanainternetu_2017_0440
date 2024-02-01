import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
// dodat kod za implementaciju onedrive ali ne radi, omogucicemo ovo za seminarski rad 
const OneDriveFiles = () => {
  const [files, setFiles] = useState(null);

  const tenantId = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';  
  const clientId = '6c05d14a-ac2a-4a12-8894-5ad33b12a953';  
  const clientSecret = 'V1k8Q~GtTQtVwQgAVv2x55iZWujX_JbPTCm~_cAL';  
  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const getAuthToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', 'https://graph.microsoft.com/.default');

    try {
      const response = await axios.post(tokenEndpoint, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
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
          const response = await axios.get('https://graph.microsoft.com/v1.0/me/drive/root/children', {
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