import PropTypes from 'prop-types';
import './styles.css'

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='modal-header'>
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose}>
                        X
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element
};