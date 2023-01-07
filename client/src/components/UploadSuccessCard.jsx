import { useState } from 'react';

export default function UploadSuccessCard({uploadedImagePath}) {
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