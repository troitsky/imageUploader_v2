export default function Uploading({uploadProgress}) {

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
