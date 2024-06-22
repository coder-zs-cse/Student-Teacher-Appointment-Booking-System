import react, {useEffect} from 'react'
import Layout from '../components/Layout';

function Home(){

    async function getUserData(){
        try{
            const response = await fetch('/api/user/get-user-info-by-id',{
                method: 'POST',
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            })
            const responseData = await response.json()
            // console.log(responseData);
        }
        catch(error){
            localStorage.clear()
            console.log("Something went wrong");
        }
    } 
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <Layout>
        <div>Home sweiet home</div>
        </Layout>
    )
}

export {Home}