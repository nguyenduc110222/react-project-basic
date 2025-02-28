
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import {EditUser} from '../services/UserService'
function ModalEdit({show, handleClose,dataEdit,handleEditUserUpdate}) {

      const [name, setName] = useState('');
      const [job, setJob] = useState('');

      const handleEdit = async(id) => {
        let res = await EditUser(id,name,job)
        if(res && res.updatedAt){
          handleEditUserUpdate({
            first_name:name,
            id: dataEdit.id
          })
          handleClose()
        }
      }

      useEffect(()=>{
        if(show){
          setName(dataEdit.first_name);
        }
      },[dataEdit,show])
    return ( 
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label >Job</label>
                <input 
                    type="text" 
                    className="form-control"  
                    placeholder="Job"
                    value={job}
                    onChange={(e)=>setJob(e.target.value)}
                    />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     );
}

export default ModalEdit;