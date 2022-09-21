import api from "../services/api";

class Scan {
    _service = api;
    url = "";
    static reqAddress = "/scan";

    constructor() {
    }

    getService() {
        return this._service;
    }

    changeService(api) {
        this._service = api;
    }
}

export default Scan;