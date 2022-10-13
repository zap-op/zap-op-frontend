import api from "../services/api";
import type { AxiosInstance } from "../services/api";

class Scan {
    protected service = api;
    public url = "";
    protected readonly reqAddress = "/scan";

    protected changeService(api: AxiosInstance) {
        this.service = api;
    }
}

export default Scan;