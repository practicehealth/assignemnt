import { AuthContext } from "../context/AuthProvider";
import {useContext} from "react" 

const Dashboard = () => {
  const auth = useContext(AuthContext);
  console.log(auth)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard