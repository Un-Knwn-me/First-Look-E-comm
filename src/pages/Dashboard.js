import React from 'react'
import Base from '../components/Base'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <Base>
        <div className='flex justify-center align-center'>
            <Button className="flex items-center border-blue-500 text-blue-500 gap-3" onClick={()=> navigate('/product-management')} variant="outlined" size="sm">
               Go to Products
            </Button>
        </div>
    </Base>
  )
}

export default Dashboard