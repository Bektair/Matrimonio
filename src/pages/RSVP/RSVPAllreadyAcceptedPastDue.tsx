interface IProps {
  id: string
}
function RSVPAllreadyAcceptedPastDue(props: IProps) {
  return (
    <div key={props.id+"-allready-accepted-past-due"}>
      <label>You allready said yes to the invitation and the RSVP has expired the deadline if you choose to cancel it is permanent</label>
    </div>
  )
}

export default RSVPAllreadyAcceptedPastDue