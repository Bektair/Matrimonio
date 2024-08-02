interface IProps {
  id: string
  infoText: string
}
function RSVPAllreadyAcceptedPastDue(props: IProps) {
  
  return (
    <div key={props.id+"-allready-accepted-past-due"}>
      <label>{props.infoText}</label>
    </div>
  )
}

export default RSVPAllreadyAcceptedPastDue