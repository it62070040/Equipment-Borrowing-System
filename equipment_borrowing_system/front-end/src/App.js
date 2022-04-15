import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import EquipmentUser from './pages/Equipments/Users/Equipments';
import BorrowHis from './pages/BorrowHistory/BorrowHis';



import EquipmentInfo from './pages/Equipments/Users/EquipmentInfo';

import EquipmentAdmin from './pages/Equipments/Admin/Equipments';
import EquipmentsEdit from './pages/Equipments/Admin/EquipmentsEdit';
import EquipmentsCreate from './pages/Equipments/Admin/EquipmentsCreate';

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

                    {/* link equipment detail */}
                    <Route path='/equipment-edit/:id' element={<EquipmentsEdit/>} />
                    <Route path='/equipment-create' element={<EquipmentsCreate/>} />


                </Routes>
            </Router>
        </div>

    )

    
}

export default App;