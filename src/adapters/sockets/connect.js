import axios from "axios";
import api from "../api";

const connect = {
    request: async (requestObject) => {
        api.post("/spider", requestObject)
        .then((res) => {
            console.log(res);
        })
    }
}

export default connect;