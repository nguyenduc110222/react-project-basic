
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {DeleteUser} from '../services/UserService'
import { toast} from 'react-toastify';

function ModalConfirm({show, handleClose,dataUserDelete, handleDeleteUser}) {

    const handleConfirm = async()=>{
      let res = await DeleteUser(dataUserDelete.id)
      if (res && res.statusCode === 204){
          handleDeleteUser(dataUserDelete)
          handleClose()
          toast.success("delete")
      }
      else{
        toast.error("Failed to delete user")
      }
    }
    return ( 
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>You are sure delete user:   <b>{dataUserDelete.first_name}</b></p>
            <p>With email: <b>{dataUserDelete.email}</b></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     );
}

export default ModalConfirm;