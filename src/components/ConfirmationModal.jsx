import React from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({
  open,
  title,
  description,
  confirmCb,
  cancelCb,
}) => {
  const [t] = useTranslation();

  return (
    <div className={'modal '.concat(open ? 'modal-open' : '')}>
      <div className="modal-box">
        <h2 className="text-center text-xl font-bold mb-2 pb-2 border-b border-gray-500">{t(title)}</h2>
        {description && <div className="whitespace-pre-line text-center text-lg mb-9 mt-4">{t(description)}</div>}
        <div className="modal-action">
          <button
            type="button"
            className="btn btn-outline"
            onClick={cancelCb}
          >
            {t('confirmationModal.cancel')}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={confirmCb}
          >
            {t('confirmationModal.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  open: propTypes.bool.isRequired,
  title: propTypes.string,
  description: propTypes.string,
  confirmCb: propTypes.func.isRequired,
  cancelCb: propTypes.func.isRequired,

};

ConfirmationModal.defaultProps = {
  title: 'common.areYouSure',
  description: null,
};

export default ConfirmationModal;
