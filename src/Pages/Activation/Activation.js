import { Layout } from "../../Components/core/Layout";
import { useParams } from "react-router-dom";

const Activate = () => {
  const params = useParams()

  const uid = params.uid
  const token = params.token

  console.log(uid)
  console.log(token)
  return(
    <Layout>Activate succeeded!</Layout>
  )
}

export default Activate