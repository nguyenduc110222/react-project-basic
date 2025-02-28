
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {createUser} from '../services/UserService'
import { toast} from 'react-toastify';
function ModalAddNew({show, handleClose,HandleUpdate}) {

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleAddNew = async()=>{
       let res = await createUser(name,job)
       if (res && res.createdAt){
            HandleUpdate({
                id: res.id,
                first_name:name
            })
            handleClose()
            toast.success('New user added successfully')
       }else{
         toast.error('Failed to add new user')
       }
    }


    return ( 
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={handleAddNew}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     );
}

export default ModalAddNew;