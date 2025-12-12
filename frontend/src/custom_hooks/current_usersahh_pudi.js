import { useEffect } from "react"
import axios from "axios"
import { serverurl } from "../pages/configs/serverurl"


const getCurrentUser = () => {
    useEffect(() => {
        let dispatch = useDispatch();
        let userData = useSelector((state) => state.user);
        const fetchUser = async () => {
            try{
                let result = await axios.get(`${serverurl}/api/user/current-user`,{
                    withCredentials: true
                })
                dispatch(setUserData(result.data));
            }
            catch (err) {
                console.log(`current user fetch la error iruku, bcoz ${err.response?.data || err.message}`);
            }
        }
        fetchUser();    
    }, [userData]);
}


export default getCurrentUser
