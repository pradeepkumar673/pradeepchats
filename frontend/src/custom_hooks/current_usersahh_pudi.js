import { useEffect } from "react"
import axios from "axios"
import { serverurl } from "../pages/configs/serverurl"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"


const useGetCurrentUser = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);  
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverurl}/api/user/current`, {  
                    withCredentials: true
                })
                dispatch(setUserData(result.data));
            }
            catch (err) {
                console.log(`current user fetch la error iruku, bcoz ${err.response?.data || err.message}`);
            }
        }
        fetchUser();    
    }, [userData, dispatch]);  
}

export default useGetCurrentUser