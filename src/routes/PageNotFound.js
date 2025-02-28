

import { Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function PageNotFound() {
    return ( 
        <>
        <Container>
            <Alert variant="info" >
            <Alert.Heading>404 Page Not Found !!!</Alert.Heading>
          </Alert>
        </Container>
        </>
     );
}

export default PageNotFound;