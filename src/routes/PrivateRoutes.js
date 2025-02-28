
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';


import Alert from 'react-bootstrap/Alert';
function PrivateRoutes({children}) {

  const {user} = useContext(UserContext)
  console.log("hehe")

  if(user && !user.auth){
    return (

       <Container>
            <Alert variant="danger" >
            <Alert.Heading>Oh no you have not logged in</Alert.Heading>
            <p>
            You need to login to be able to access this path
            </p>
          </Alert>
       </Container>
    )
  }

    return ( 
        <>
        {children}
        </>
     );
}

export default PrivateRoutes;