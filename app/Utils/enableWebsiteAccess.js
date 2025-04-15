import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const enableWebsiteAccess = (subUserName)=>{
    var data = JSON.stringify({
      "disabled": false 
    });
    
    var config = {
      method: 'patch',
      url: `https://api.sendgrid.com/v3/subusers/${subUserName}/website_access`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${process.env.SENDGRID_API_KEY}`
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

export default enableWebsiteAccess