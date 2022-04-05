import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Equipments from './pages/Equipments/Equipments';
import BorrowHis from './pages/BorrowHistory/BorrowHis'

function App() {

    return(
        <div className="App">
            <Router>
            <Navbar />            
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/equipments' element={<Equipments/>} />
                    <Route path='/borrow-history' element={<BorrowHis/>} />
                </Routes>
            </Router>

        </div>

    )

    
}

export default App;