import React, { useEffect, useState } from "react"
import Axios from 'axios';

const API_URL = "https://cs519assignment4.azurewebsites.net/api/getsummaryreport?code=_CxUkwg30dyKZ-958tobGMti9i0wvEPFA-HIAntEGFA8AzFucrIcXw%3D%3D"

const UsingFetch = () => {
  const [users, setUsers] = useState([])

  // const fetchData = () => {
  //   fetch("https://cs519assignment4.azurewebsites.net/api/getsummaryreport?code=_CxUkwg30dyKZ-958tobGMti9i0wvEPFA-HIAntEGFA8AzFucrIcXw%3D%3D")
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setUsers(data)
  //     })
  // }

  const fetchData = () => {
    // Axios.get(API_URL).then((response)=>{console.log(response)});
    Axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
      url: API_URL
    }).then(function (response) {
      console.log(response);
      setUsers(response.data.documentResponse);
    });

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div><pre>{ JSON.stringify(users, null, 2) }</pre></div>
  )
}

export default UsingFetch