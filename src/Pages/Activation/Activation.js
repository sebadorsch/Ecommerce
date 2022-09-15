import { Layout } from "../../Components/core/Layout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { activate } from "../../redux/actions/auth";
import { Navigate } from "react-router-dom";

import {TailSpin} from 'react-loader-spinner'

const Activate = ({
  activate, loading
}) => {
  const params = useParams()
  const [activated, setActivated] = useState(false)

  const activateAccount = () => {
    const uid = params.uid
    const token = params.token
    activate(uid, token)
    setActivated(true)
  }

  if(activated && !loading){
    return <Navigate to={'/'}/>
  }

  return(
    <Layout>
      <div className='max-w-7x1 sm:px-6 lg:px-8 py-14'>
        <div className="max-w-3x1 text-center">
          {loading
            ?
            <button
              className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <TailSpin
                type="Oval"
                color="#fff"
                width={20}
                height={20}
              />
            </button>
            :
            <button
              onClick={activateAccount}
              className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Activate Account
            </button>
          }
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  activate
}) (Activate)