interface IProps {
  id: string
}
function RSVPExpiredInvite(props : IProps) {
  return (
    <div key={props.id+"-declined-past-due"}>
      <label>You failed to answer the invite within the deadline</label>
    </div>
  )
}

export default RSVPExpiredInvite