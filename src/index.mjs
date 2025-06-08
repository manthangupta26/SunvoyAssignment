import axios from "axios";

const response = await axios.post(
    "https://challenge.sunvoy.com/api/users",
    {},{
        headers:{
            Cookie:"user_preferences=eyJ0aGVtZSI6ImxpZ2h0IiwibGFuZ3VhZ2UiOiJlbiIsInRpbWV6b25lIjoiVVRDIiwibm90aWZpY2F0aW9ucyI6dHJ1ZX0%3D; feature_flags=eyJuZXdEYXNoYm9hcmQiOnRydWUsImJldGFGZWF0dXJlcyI6ZmFsc2UsImFkdmFuY2VkU2V0dGluZ3MiOnRydWUsImV4cGVyaW1lbnRhbFVJIjpmYWxzZX0%3D; tracking_consent=accepted; JSESSIONID=00e03bfe-c13d-41b1-8e09-2fb5e60f4679; _csrf_token=a9708d8c8af45d79b303c51875aad9981c8b7f340673f775fe65a6f3d45d5b12; analytics_id=analytics_fbe96a0c6925beb3e9ad5b2abcb1764e; session_fingerprint=ce6a0892344676afab3121745decf920a6e1102766c0ad7c6abc5eeb7967eaef; device_id=device_14f8b49b1547adabdc038fc2"
        }
    }
)
console.log(response.data)