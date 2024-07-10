// Consider moving to separate Home.js component

import { Route, Routes, Link, Navigate, useLocation, useLocation } from "react-router-dom";

export function Homepage(){
    const useLocation = useLocation()

    // Page
    return(
        <div className="home">
            <Routes>
                <Route exact path='/companies' />
                <Route exact path='/users' />
                <Route exact path='/jobs' />
                <Route exact path='/login' />
                <Route exact path='/signup' />
                <Route exact path='/profile' />
                
                {/* Param-specific */}
                <Route exact path='/companies/:id' />
                <Route exact path='/users/:id' />
                <Route exact path='/jobs/:id' />
                <Route exact path='/auth/:id' />

                <Route path='*' element={<Navigate to='/' />}/>
            </Routes>
        </div>        
    )
}

export function List(){

}

export function Item(){

}