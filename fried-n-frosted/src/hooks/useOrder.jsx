import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import { useQuery } from "@tanstack/react-query";

const useOrder = () => {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('access-token')
    const { refetch ,data: order = []} = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/order?email=${user?.email}`, {
              headers:{
                authorization: `Bearer ${token}`
              }
            })
            return res.json();

          },
    })
  return [order, refetch]
}

export default useOrder
