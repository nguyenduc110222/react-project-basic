

import Home from '../components/Home/Home.js';
import TableUsers from '../components/TableUsers.js';
import Login from '../components/Login/Login.js'


import { Routes, Route} from "react-router-dom";
import PrivateRoutes from './PrivateRoutes.js';
import PageNotFound from './PageNotFound.js';


function AppRoutes() {
    return ( 
        <>
        <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/login" element={<Login />} />
                 <Route 
                    path="/user" 
                    element={
                    <PrivateRoutes>
                        <TableUsers />
                    </PrivateRoutes>

                    }
                 />
                 { <Route path="*" element={<PageNotFound />} />}
        </Routes>
        </>
     );
}

export default AppRoutes;