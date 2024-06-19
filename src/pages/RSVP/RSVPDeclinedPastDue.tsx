interface IProps {
  id: string
}
function RSVPDeclinedPastDue(props : IProps) {
  return (
    <div  key={props.id+"-declined-past-due"}>
      <label>You allready said no to the invitation and the RSVP deadline has expired</label>
    </div>
  )
}

export default RSVPDeclinedPastDue