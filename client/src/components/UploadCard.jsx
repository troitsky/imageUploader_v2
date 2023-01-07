
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

  export default UploadCard;