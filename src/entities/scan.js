import api from "../services/api";

class Scan {
    _service = api;
    url = "";
    static reqAddress = "/scan";

    getService() {
        return this._service;
    }

    changeService(api) {
        this._service = api;
    }
}

export default Scan;