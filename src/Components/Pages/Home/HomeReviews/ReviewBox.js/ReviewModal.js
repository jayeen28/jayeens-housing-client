import React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ReviewModal = ({ open, setOpen, review, name }) => {
    const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

    const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

    const style = {
        width: 400,
        bgcolor: 'white',
        boxShadow: '#00000070 0px 0px 8px',
        borderRadius: '10px',
        p: 2,
        px: 4,
        pb: 3,
    };
    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={() => { setOpen(false) }}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <div className="div" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 id="unstyled-modal-title">{name}</h2>
                        <FontAwesomeIcon icon={faTimes} onClick={() => { setOpen(false) }} style={{ padding: '10px' }} />
                    </div>
                    <p id="unstyled-modal-description">{review}</p>
                </Box>
            </StyledModal>
        </div>
    );
};

export default ReviewModal;