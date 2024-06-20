import {Navigate} from 'react-router-dom'
function ProtectedRoute(props){
    if(localStorage.getItem('token')){
        return props.children
    }
    else{
        return <Navigate to='/login' />
    }
}

export {ProtectedRoute}