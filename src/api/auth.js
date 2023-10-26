import config from "@/config/index";
export default class Auth{


    login(user,pass){
        return new Promise((resolve, reject)=>{

            let payload = {
                "grant_type":"password",
                "client_id":"2",
                "client_secret":"3qoUPz4fIRANnRVMNPFVsy3TmuT8coRcsVgrflnK",
                "username":user,
                "password":pass,
                "scope":"*"
            }

            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            };

            fetch(config.URL_AUTH+'token', options)
                .then(response => response.json())
                .then(response => {
                    if (response.error){
                        reject(response)
                    }
                    resolve(response)
                })
                .catch(err => reject(err));

        })
    }

    refresh_token(refresh_token){
        return new Promise((resolve, reject)=>{

            let payload = {
                "grant_type":"refresh_token",
                "client_id":"2",
                "client_secret":"3qoUPz4fIRANnRVMNPFVsy3TmuT8coRcsVgrflnK",
                "refresh_token":refresh_token,
                "scope":"*"
            }

            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            };

            fetch(config.URL_AUTH+'token', options)
                .then(response => response.json())
                .then(response => {
                    if (response.error){
                        reject(response)
                    }
                    resolve(response)
                })
                .catch(err => reject(err));

        })
    }
}



