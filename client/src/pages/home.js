import react, {useEffect} from 'react'
import Layout from '../components/Layout';

function Home(){

    async function getUserData(){
        try{
            const responseData = fetch('/api/user/get-user-info-by-id',{
                method: 'POST',
                headers: {
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            }).json()
            console.log(responseData);
        }
        catch(error){
            console.log("Something went wrong");
        }
    } 
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <Layout>
        <div>Home sweet home</div>
        </Layout>
    )
}

export {Home}