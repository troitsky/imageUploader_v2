import './App.css'
import { useState } from 'react';
import axiosInstance from './utils/axios';


function UploadCard({dragActive, handleDrag, handleDrop, handleChange}) {
  
  return (
    
    <form className="upload_card" 
      onDragEnter={e => handleDrag(e)} 
      onDragLeave={e => handleDrag(e)} 
      onDragOver={e => handleDrag(e)}
      onDrop = {e => handleDrop(e)}
      onSubmit = {e => e.preventDefault()}
    >
      <h2 className='card_title'>Upload your image</h2>
      <p className="instruction_text">File should be Jpeg, Png,...</p>
        <input type="file" name="image" onChange={handleChange} id="image_upload_area" />
        <label id="image_upload_area_label" htmlFor="image_upload_area" className={dragActive ? 'drag_active' : ''}>
          <img className='droparea_instructions_img' src="./image.svg" alt="" />
          <p className='droparea_instructions_text'>Drag & Drop your image here</p>
        </label>
        <p className='upload_card_additonal_text'>Or</p>
        <label htmlFor="image_upload_area" className='upload_card_btn'>Choose a file</label>
    </form>
  )
}

function UploadSuccessCard({uploadedImagePath}) {
  const [infoMessage, setInfoMessage] = useState('');
  
  const copyText = () => {
    console.log('copied text')
    navigator.clipboard.writeText(uploadedImagePath)
    setInfoMessage("Copied link to clipboard")
  }

  return (
    <form className="upload_card" onSubmit={e => e.preventDefault()}>
      <h2 className='card_title'>Uploaded Successfully!</h2>
      <img src={uploadedImagePath} className="image_uploaded_area"/>
      <div className="copy_link_block">
        <span className="link_text">{uploadedImagePath}</span>
        <button className="copy_link_btn" onClick={copyText}>Copy Link</button>
      </div>
      <p className="info_text">{infoMessage}</p>
    </form>
  )
}


function Uploading({uploadProgress}) {

  return (
    <div className="overlay">
      <div className="upload_card">
        <p className="uploading_text">Uploading...</p>
        <div className="progress_bar">
          <div style={{width: `${uploadProgress}%`}} className="uploaded_bar"></div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [uploaded, setUploaded] = useState(false) 
  const [uploading, setUploading] = useState(false) 
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImagePath, setUploadedImagePath] = useState(null)
  const [uploadProgress, setProgress] = useState(null)

  function handleDrag(e) {
    console.log('drag function fired')
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
