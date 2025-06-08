import axios from "axios"
import * as qs from "qs";
import * as cheerio from "cheerio";
import * as tough from "tough-cookie";

const baseURL = "https://challenge.sunvoy.com";
const cookie = new tough.CookieJar();


async function getCookie()
{
    try{ 

        const login = axios.create({ baseURL });
        
        let getLoginHtmlData
        let getLoginMainData
        
        const getLoginData = await login.get('/login')
        getLoginMainData = getLoginData.data 
        getLoginHtmlData = cheerio.load(getLoginMainData)

        const nonceData = getLoginHtmlData('input[name="nonce"]').val();

        const bodyData = qs.stringify({
            nonce: nonceData,
            username: 'demo@example.org',
            password: 'test'
        })

        const postLoginData = await login.post('/login',bodyData,{
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            maxRedirects: 0, 
            validateStatus: status => status < 400
        })
        

        const setCookieHeaders = postLoginData.headers['set-cookie'] || [];
        for (let cookieString of setCookieHeaders) {
          await cookie.setCookie(cookieString, baseURL);
        }

        console.log(cookie)
    }
    
    catch(error){
        console.log("Errors Logging in : ", error)
        return null;
    }
}


async function userDetail(cookieJar: tough.CookieJar){
    try
    {
        const cookieHeader = await cookieJar.getCookieString(baseURL);
        const response = await axios.post(
            "https://challenge.sunvoy.com/api/users",
            {},
            {
                headers:{
                    cookie: cookieHeader
                }
            })

            console.log("API data is : ", response.data)
            return response.data
    }
    catch(error){
        console.error("Errors fetching Users: ", error)
        return null;
    }
}

async function authUserDetail(){
    let authenticatedUserDetails 
    let htmlData
    let value
    try{
        const authToken = await axios.get(
            "https://challenge.sunvoy.com/settings/tokens",{
            headers:{
                cookie:"user_preferences=eyJ0aGVtZS6ImxpZ2h0IiwibGFuZ3VhZ2UiOiJlbiIsInRpbWV6b25lIjoiVVRDIiwibm90aWZpY2F0aW9ucyI6dHJ1ZX0%3D; feature_flags=eyJuZXdEYXNoYm9hcmQiOnRydWUsImJldGFGZWF0dXJlcyI6ZmFsc2UsImFkdmFuY2VkU2V0dGluZ3MiOnRydWUsImV4cGVyaW1lbnRhbFVJIjpmYWxzZX0%3D; tracking_consent=accepted; JSESSIONID=00e03bfe-c13d-41b1-8e09-2fb5e60f4679; _csrf_token=a9708d8c8af45d79b303c51875aad9981c8b7f340673f775fe65a6f3d45d5b12; analytics_id=analytics_fbe96a0c6925beb3e9ad5b2abcb1764e; session_fingerprint=ce6a0892344676afab3121745decf920a6e1102766c0ad7c6abc5eeb7967eaef; device_id=device_14f8b49b1547adabdc038fc2"
            }
        }
        )
        console.log("Auth token data is : ", authToken.data)
        htmlData = authToken.data;
        value = cheerio.load(htmlData);

        const apiuser = value('#apiuser').val();
        const language = value('#language').val();
        const openId = value('#openId').val();
        const operateId = value('#operateId').val();
        const userId = value('#userId').val();

        const bodyData = {
            //access_token:authToken.data.access_token,
            access_token: "b592ccadc0a70f1f8c73355d78ee2e4db1ef85f28498d1bdb61ed86a3f812a9e",
            apiuser: apiuser,
            language: language,
            openId: openId,
            operateId: operateId,
            //timestamp:Math.floor(Date.now() / 1000),
            timestamp: 1749386980,
            userId: userId,      
            checkcode: "35FCDDC3D80737E7E59D5AB794BAD80B811CA71E"
          };

        const dataString = qs.stringify(bodyData); 

        const authUser = await axios.post(
            "https://api.challenge.sunvoy.com/api/settings",
               dataString,
               {
                headers:{
                    "content-type":"application/x-www-form-urlencoded"
                }
               }
        )
        authenticatedUserDetails = authUser.data
        console.log("Auth User data", authenticatedUserDetails)
        
    }
    catch(err){
        console.log(err)
    }
}


(async () => {
    await getCookie(); 
    await userDetail(cookie); 
    //await authUserDetailFromCookie(cookie); 
})();