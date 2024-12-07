import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';

const List = () => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const getRoles = async ()=>{
      request.request('GET', '/api/v1/userManagement/roles').then((res)=>{
        setRoles(res.data);
        console.log(res.data);
      });
    }
    getRoles();
  }, [])
  
  return (
    <div>{
      roles.map((role)=>(
        <div key={role.roleId}>{role.rolename}</div>
      )
      )
      }</div>
  )
}

export default List