import { clientId, domain, redirectUri } from '../../constants/environment';
import Ceremony from './Ceremony/Ceremony'
import Reception from './Reception/Reception'

function Schedule() {

  console.log("REDIREKT" + redirectUri);
  console.log("cleintId" + clientId);
  console.log("domain" + domain);
  console.log("NODEENV" + process.env.NODE_ENV)

  return (
    <>
        <div>Schedule</div>
        <Reception></Reception>
        <Ceremony></Ceremony>
    </>
  )
}

export default Schedule