
import '../App.css'

function Loading() {
  return (
   <div className="loading-container">
      <div className="loader-wrapper">
        <div className="spinner"></div>
        <p className="loading-text">Loading Please wait...</p>
      </div>
    </div>
  )
}

export default Loading