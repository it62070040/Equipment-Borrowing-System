import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import EquipmentUser from './pages/Equipments/user/Equipments';
import BorrowHis from './pages/BorrowHistory/BorrowHis';
import SignIn from './pages/SignIn/SignIn';
import EquipmentInfo from './pages/Equipments/user/EquipmentInfo';

import EquipmentAdmin from './pages/Equipments/Admin/Equipments';

function App() {

    return(
        <div className="App">
            <Router>
            <Navbar />            
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/equipments-user' element={<EquipmentUser/>} />
                    <Route path='/equipments' element={<EquipmentAdmin/>} />
                    <Route path='/equipmentInfo/:id' element={<EquipmentInfo/>} />
                    <Route path='/borrow-history' element={<BorrowHis/>} />
                    <Route path='/sign-in' element={<SignIn/>} />
                </Routes>
            </Router>
            {/* <Equipments/> */}
        </div>

    )

    
}

export default App;