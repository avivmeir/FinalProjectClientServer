import * as React from "react";
import jwt from 'jwt-decode' // import dependency

function RouteParam(props) {
      const token = window.location.pathname.replace('/param/','');
      console.log(`token ${token}`)
      try{
      const user = jwt(token); // decode your token here
      localStorage.setItem('token', token);
      console.log(`succeed : ${JSON.stringify(user)}`)
      }
      catch (err) {
          console.log(`fail ${err}`)
      }

    return (
        <div>
            
        </div>
    );
}

export default RouteParam;