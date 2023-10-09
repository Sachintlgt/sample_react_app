import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import ERROR_ICON from '../../../../assets/images/error-icn.svg'
import Modal from "react-bootstrap/Modal";
import { constants, selectStyle } from "../../../../common/constants";
import { usePrevious, setImagePath } from '../../../../common/custom';
import moment from 'moment'
import _ from 'lodash';
import { getStateTax, createSubscritpionPlan, getSubscritpionPlan, updateSubscritpionPlan, planApplyCoupon } from '../../../../duck/profile/profile.action';
import { validateInputs } from '../../../../common/validation';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getUserDetails, setUserDetails } from '../../../../storage/user';
import { getMenuCount,deleteAllDummyData } from "../../../../duck/profile/profile.action";
import Swal from 'sweetalert2'

export const DeleteDummyDataModel = props => {

  const {deleteDummyDataButtonShow  }  = props

  const dispatch = useDispatch();

  const [deleteDummyDataButtonReason,setdeleteDummyDataButtonReason]  =useState(false)
  const [errorMessage,seterrorMessage]  = useState('')
  
  useEffect(() => {
    if(errorMessage!==''){
     // console.log(errorMessage)
    }
    if(deleteDummyDataButtonReason){
      seterrorMessage(false)
    }
  },[errorMessage,deleteDummyDataButtonReason]);

    
  const deleteDummyData=()=>{
    if(!deleteDummyDataButtonReason){
      seterrorMessage('Please choose any option to proceed .')
      return
    }
    props.loader(true)
    if(deleteDummyDataButtonReason==1){
      dispatch(deleteAllDummyData({'reason':'The placeholder data helped me with learning the tool and I feel very confident now'}))
      props.deleteDummyDataActionHandler(false)
    }else if(deleteDummyDataButtonReason==2){
      dispatch(deleteAllDummyData({'reason':'Would prefer a different way to learn (e.g. Videos, How to guides, Coachmarks etc.)'}))
      props.deleteDummyDataActionHandler(false)
    }
    setTimeout(() => window.location.reload(), 3000)
    
  }

  const handleClose=()=>{
    seterrorMessage('')
    setdeleteDummyDataButtonReason(false)
    props.onHide()
  }

    return (
        <Modal
          {...props}
          size="lg"
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          className="delete-dummy-data"
          centered

          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Delete Placeholder Data?</h4>
            <p>
              Please choose an option below, it will help us in improving the experience.  
            </p>
            <div className="form-group">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio"  onChange={()=>setdeleteDummyDataButtonReason(1)}  id="customRadioInline3" name="contactType" className="custom-control-input" value="1" />
                                    <label className="custom-control-label" htmlFor="customRadioInline3">The placeholder data helped me with learning the tool and I feel very confident now</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" onChange={()=>setdeleteDummyDataButtonReason(2)}  id="customRadioInline4" name="contactType" className="custom-control-input" value="0" />
                                    <label className="custom-control-label" htmlFor="customRadioInline4">Would prefer a different way to learn (e.g. Videos, How to guides, Coachmarks etc.)</label>
                                </div>
                            </div>            
          </Modal.Body>
          <Modal.Footer>
          {errorMessage && (
  <p className="error"> {errorMessage} </p>
)}
          <button  className="btn btn-default " onClick={()=>{handleClose()}}>No</button>
          <button  className="btn btn-secondary " onClick={()=>{deleteDummyData()}}>Yes</button>
          </Modal.Footer>
        </Modal>
      );
}