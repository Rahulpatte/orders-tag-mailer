import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const createSubUser = async () => {
    try {
        var data = JSON.stringify({
            "username": "johnSmith",
            "email": "florentino.calil@frontads.org",
            "password": "johns_password",
            "ips": [
                "209.38.17.219"
            ],
            "region": "global",
            "include_region": true
        });

        var config = {
            method: 'post',
            url: 'https://api.sendgrid.com/v3/subusers',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${process.env.SENDGRID_API_KEY}`
            },
            data: data
        };

        const res = await axios(config)
        return res.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}


export default createSubUser