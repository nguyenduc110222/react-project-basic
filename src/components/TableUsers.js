import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import {fetchAllUser} from '../services/UserService'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import ModalConfirm from './ModalConfirm';
import  _  from 'lodash'
import { debounce } from 'lodash'
import './TableUser.scss'
import { CSVLink } from "react-csv";
import Papa from 'papaparse';
import { toast} from 'react-toastify';

function TableUsers() {

    const [listUsers,setListUsers] = useState([])
    const [getPage, setGetPage] = useState(1)

    const [showAddNew, setShowAddNew] = useState(false)

    const [showEdit,setShowEdit] = useState(false)
    const [dataEdit, setDataEdit] = useState({})

    const [showDelete, setShowDelete] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [keyword, setKeyword] = useState('')

    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("ID")

    const [dataExport, setDataExport] = useState([])
    useEffect(()=>{
        getUsers(1);
    },[])

    const getUsers = async(page)=>{
            let res = await fetchAllUser(page);
            if(res && res.data){
                setListUsers(res.data)
                setGetPage(res.total_pages)
            }
    }
    
    const handlePageClick =  (e) =>{
        setGetPage(e.selected + 1)
        getUsers(e.selected + 1)
  
    }

    const handleClose = () => {
      setShowAddNew(false)
      setShowEdit(false)
      setShowDelete(false)
    }

    const handleAddNew = () => {
      setShowAddNew(true)
    }

    const handleEditUser = (user) => {
      setShowEdit(true)
      setDataEdit(user)
    }

    const handleDelete =(user)=>{
      setShowDelete(true)
      setDataUserDelete(user)
    }

    const HandleUpdate = (user)=>{
      const dataUser = ([user,...listUsers])
      setListUsers(dataUser)
    }

    const handleEditUserUpdate = (user) => {
      let cloneListUser = _.cloneDeep(listUsers)
      let index = listUsers.findIndex(data => data.id === user.id)
      cloneListUser[index].first_name = user.first_name
      setListUsers(cloneListUser)
    }


    const handleDeleteUser =(user)=>{
      let cloneListUser = _.cloneDeep(listUsers)
      cloneListUser = listUsers.filter(data => data.id !== user.id)
      setListUsers(cloneListUser)
    }

    const handleSearch = debounce((e)=>{
      let searchResults = e.target.value
      if(searchResults){
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = cloneListUser.filter(data =>data.email.includes(searchResults))
        setListUsers(cloneListUser)
      }else{
        getUsers(1)
      }
    },500)

    const handleSort =(sortBy,sortField)=>{
          setSortBy(sortBy)
          setSortField(sortField)
          let cloneListUser = _.cloneDeep(listUsers)
          cloneListUser=_.orderBy(cloneListUser, [sortField], [sortBy]);
          setListUsers(cloneListUser)
    }

    const handleCsv=(e,done)=>{
        let csvData =[]
        if(listUsers.length >0){
          csvData.push(["ID","Email","First name","Last name"])
          listUsers.forEach(data=>{
            let resultExport =[]
            resultExport[0]= data.id
            resultExport[1]= data.email
            resultExport[2]= data.first_name
            resultExport[3]= data.last_name
            csvData.push(resultExport)
          })
          setDataExport(csvData)
          done();
        }
    }

    const handleImport=(e)=>{
      if ( e.target && e.target.files[0]){
        let file = e.target.files[0]
        if(file.type !== "text/csv"){
          toast.error("Only text/csv files are supported")
        }
        Papa.parse(file, {
          complete: function(results) {
            let resultImport = results.data;
            if(resultImport.length >0){
              if(resultImport[0] && resultImport[0].length === 5){
                if(resultImport[0][0] !== "Id" || 
                    resultImport[0][1] !== "email" || 
                    resultImport[0][2] !== "first_name" || 
                    resultImport[0][3] !== "lastName"
                  ){
                    toast.error("Header wrong format")
                  }else{
                       let resultData =[]
                    resultImport.forEach((index,data) =>{
                     if(index > 0){
                        let dataImport = {}
                        dataImport.email = data[0]
                        dataImport.first_name = data[1]
                        dataImport.last_name = data[2]
                        resultData.push(dataImport)
                     }
                    })

                    setListUsers(resultData)
                  }
              }else{
                toast.error("Wrong format csv")
              }
            }else{
              toast.error("No data found in CSV file")
            }
          console.log("Finished:", results.data);
        } 
      })
      }
      
      
    }

   
    return ( 
        <Container>
          <ModalAddNew 
              show={showAddNew}
              handleClose={handleClose}
              HandleUpdate={HandleUpdate}
          />
          <ModalEdit
              show ={showEdit}
              handleClose={handleClose}
              dataEdit={dataEdit}
              handleEditUserUpdate={handleEditUserUpdate}
          />
          <ModalConfirm
            show ={showDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUser={handleDeleteUser}
          />
          <div className="d-sm-flex justify-content-between my-3">
            <span className="mx-3">Manage User:</span>
            <div className="mx-3 d-flex mt-sm-0 mt-2">
                <button className="btn btn-success mx-3" onClick={()=>handleAddNew()}>
                  <i className="fa-solid fa-plus"></i> Add New
                </button>
                <CSVLink
                      data={dataExport}
                      asyncOnClick={true}
                      onClick={handleCsv}
                      filename={"user.csv"}
                      className="btn btn-primary"
                >
                  <i className="fa-solid fa-file-export"></i> Export
                </CSVLink>
                <label className="btn btn-warning  mx-3" htmlFor='test'> 
                <i className="fa-solid fa-file-import"></i> Import
                </label>
                <input 
                  type="file" 
                  id="test" 
                  hidden
                  onChange={(e)=>handleImport(e)}
                  />
            </div>
          </div>
          <div className="col-12 col-sm-4 mt-6 my-3 mx-3 ">
            <input 
              className=" form-control" 
              placeholder="Search by email..."
              onChange={(e)=>handleSearch(e)}
            />
          </div>
          <div className="mx-3 custom-table">
            <Table striped bordered hover>
            <thead>
              <tr className="text-center ">
                <th>
                  <div className="content">
                  <span>ID</span>
                  <div className="sort-btn">
                    <i 
                      className="fa-solid fa-down-long"
                      onClick={()=>handleSort("desc","id")}
                      ></i>
                    <i 
                      className="fa-solid fa-up-long"
                      onClick={()=>handleSort("asc","id")}
                      ></i>
                  </div>
                  </div>
                </th>
                <th>Avartar</th>
                <th>Email</th>
                <th>
                  <div className="content">
                  <span>First_name</span>
                  <div className="sort-btn">
                    <i 
                      className="fa-solid fa-down-long"
                      onClick={()=>handleSort("desc","first_name")}
                      ></i>
                    <i 
                      className="fa-solid fa-up-long"
                      onClick={()=>handleSort("asc","first_name")}
                      ></i>
                  </div>
                  </div>
                  </th>
                <th>Last Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { listUsers && listUsers.length >0 && 
                  listUsers.map((data,index)=>{
                      return(
                          <tr key ={index}>
                          <td className="text-center">{data.id}</td>
                          <td className="text-center"><img  className="rounded-circle " src={data.avatar} alt="img"/></td>
                          <td className="text-center">{data.email}</td>
                          <td className="text-center">{data.first_name}</td>
                          <td className="text-center">{data.last_name}</td>
                          <td className="text-center">
                            <button className="btn btn-warning mx-3" onClick={()=>handleEditUser(data)}>
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-danger mt-sm-0 mt-3" onClick={()=>handleDelete(data)}>
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      )
                  })
              }
             
            </tbody>
          </Table>
          </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakclassName={'break-me'}
          pageCount={getPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerclassName={'pagination'}
          subContainerclassName={'pages pagination'}
          activeclassName={'active'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
      /> 
        </div>
        </Container>
     );
}

export default TableUsers
