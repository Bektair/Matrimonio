import { useTranslation } from 'react-i18next';
import './ConfirmationModal.sass'

interface IProps {
    onConfirm: any
    onCancel: any
    actionName: string
}

function ConfirmationModal({ onConfirm, onCancel, actionName } : IProps) {
    const { t } = useTranslation();

    return (
      <div className="modalOverlay">
        <div className="modalContent">
          <h3>{t("are_you_sure_you_want_to_select") + ": "}  {actionName}</h3>
          <button onClick={onConfirm} className="modalButton">Yes</button>
          <button onClick={onCancel} className="modalButton">No</button>
        </div>
      </div>
    );
  }

export default ConfirmationModal