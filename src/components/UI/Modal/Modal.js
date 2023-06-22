import classes from './Modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import './modal.css'

const Backdrop = props =>{
    return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = props =>{
    return <div className={props.styleOfTheModal}> 
        <div className={props.content}>{props.children}</div>
    </div>
}
// `${classes.props.styleOfTheModal}`
const portalElement = document.getElementById('overlays');

export default function Modal(props) {
  return (
    <React.Fragment>
      
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)}
        {ReactDOM.createPortal(<ModalOverlay styleOfTheModal={props.styleOfTheModal} content={props.modalContent}><div style={{position:"absolute",right:"20px", top:"20px"}}>
              <CloseIcon fontSize="large" onClick={props.onClose}/>
            </div>{props.children}</ModalOverlay>,portalElement)}
    </React.Fragment>
  )
}
