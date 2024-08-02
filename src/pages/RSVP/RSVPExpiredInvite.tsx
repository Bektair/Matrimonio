interface IProps {
  id: string
  infoText: string
}
function RSVPExpiredInvite(props : IProps) {
  return (
    <div key={props.id+"-declined-past-due"}>
      <label>{props.infoText}</label>
    </div>
  )
}

export default RSVPExpiredInvite