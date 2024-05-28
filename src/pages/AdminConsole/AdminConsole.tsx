import { Link } from "react-router-dom"
import PathConstants from '../../components/route/pathConstants'
import './adminConsole.sass'

function AdminConsole() {
  return (
    <div>     
        <ul id="admin-grid">
            <li className="admin-grid-item"><Link to={PathConstants.WeddingMenu}>WeddingMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.User}>UserMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.RSVP}>RSVP</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.Schedule}>Scedule</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.Posts}>Posts</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.Profile}>Profile</Link></li>
        </ul>
    </div>
  )
}

export default AdminConsole