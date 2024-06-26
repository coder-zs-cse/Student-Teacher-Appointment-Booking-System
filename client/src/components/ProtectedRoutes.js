import {Navigate, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { useEffect } from 'react'
function ProtectedRoute(props){

    const {user} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function getUser(){
        try{
            
            const responseData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/get-user-info-by-id`,{
                method: 'POST',
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            })
            const data = await responseData.json()
            if(data.success){
                // console.log(data.data);
                 dispatch(setUser(data.data))
            }else{
                navigate('/login')
            }
        }catch(error){
            navigate('/login')
        }
    }
    useEffect(()=>{
        if(!user){
            getUser()
        }
    },[user])




    if(localStorage.getItem('token')){
        return props.children
    }
    else{
        return <Navigate to='/login' />
    }
}

export {ProtectedRoute}