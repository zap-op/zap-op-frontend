// REACT IMPORT
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// REDUX IMPORT
// import { Provider } from 'react-redux'
// import store from './store/store';
// CONFIG IMPORT
// COMPONENT IMPORT
import NavBar from './components/nav-bar';
import Home from './pages/home';
import SignUp from './pages/sign-up';
// STYLE IMPORT
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <NavBar />
        <div id='body'>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
            <Routes>
                <Route path='/signup' element={<SignUp/>}/>
            </Routes>
        </div>
    </Router>
    // <Provider store={store()}>
    //     <NavBar />
    //     <SearchBar/>
    //     <AdminTable />
    // </Provider>
);