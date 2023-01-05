import './App.css'
import { useState } from 'react';
import axiosInstance from './utils/axios';
import UploadCard from './components/UploadCard';
import UploadSuccessCard from './components/UploadSuccessCard';
import Uploading from './components/Uploading';

function App() {
  const [uploaded, setUploaded] = useState(false) 
  const [uploading, setUploading] = useState(false) 
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImagePath, setUploadedImagePath] = useState(null)
  const [uploadProgress, setProgress] = useState(null)

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  
    if ( e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleSubmit(data) {
    const formData = new FormData();
    formData.append('image', data);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setUploading(true);
        setProgress(Math.round((100 * data.loaded) / data.total))
      },
    }

    axiosInstance.post('/uploadImage', formData, config)
    .then(data => {
      setUploading(false);
      setUploaded(true);
      const url = new URL(data.data.path, data.config.baseURL).href
      setUploadedImagePath(url)
    })
    .catch(error => {
      console.log(error);
    });

  }
  
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("transferring files")
      const data = e.dataTransfer.files[0]
      handleSubmit(data)
    }
  }

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files) {
      console.log("uploading files")
      const data = e.target.files[0]
      handleSubmit(data)
    }
  }
  
  return (
    <div className="App">
      {uploading && <Uploading uploadProgress={uploadProgress} />}
      {uploaded ? 
        <UploadSuccessCard uploadedImagePath={uploadedImagePath} /> : 
        <UploadCard 
          dragActive={dragActive} 
          handleDrag={handleDrag} 
          handleDrop={handleDrop} 
          handleChange={handleChange}
        />}
    </div>
  )
}

export default App
