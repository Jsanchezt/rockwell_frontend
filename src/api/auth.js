
export default class Auth{


    login(user,pass){
        return new Promise((resolve, reject)=>{

            let payload = {
                "grant_type":"password",
                "client_id":"9a5299da-f459-40e6-b3d8-5370edb2dfcf",
                "client_secret":"LDGDPv3WvKEzEuMRzQhvBFUUGRBTJ576mlrMT677",
                "username":user,
                "password":pass,
                "scope":"*"
            }

            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            };

            fetch('http://localhost/oauth/token', options)
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



