import { Link } from "react-router-dom"
import PathConstants from '../../components/route/pathConstants'
import './adminConsole.sass'

function AdminConsole() {
  return (
    <div>     
        <ul id="admin-grid">
            <li className="admin-grid-item"><Link to={PathConstants.WeddingMenu}>WeddingMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.User}>UserMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.RSVPMenu}>RSVPMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.CeremonyMenu}>CeremonyMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.ReceptionMenu}>ReceptionMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.ParticipationMenu}>ParticipationMenu</Link></li>
            <li className="admin-grid-item"><Link to={PathConstants.PostMenu}>PostMenu</Link></li>
        </ul>
    </div>
  )
}

export default AdminConsole