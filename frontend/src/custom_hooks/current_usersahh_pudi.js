import { useEffect } from "react"
import axios from "axios"
import { serverurl } from "../pages/configs/serverurl"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"
import { useRef } from "react"

const useGetCurrentUser = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);  
    const hasFetched = useRef(false);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverurl}/api/user/current`, {  
                    withCredentials: true
                })
                dispatch(setUserData(result.data.user));
            }
            catch (err) {
                if (err.response?.status !== 400 && err.response?.status !== 401) {
                    console.log(`Error:`, err.response?.data?.message || err.message);
                }
            }
        }
        if (userData === null) {
            fetchUser();
        }
    }, [dispatch, userData]);  
}

export default useGetCurrentUser