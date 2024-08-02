interface IProps {
  id: string
  infoText: string
}
function RSVPDeclinedPastDue(props : IProps) {
  return (
    <div  key={props.id+"-declined-past-due"}>
      <label>{props.infoText}</label>
    </div>
  )
}

export default RSVPDeclinedPastDue