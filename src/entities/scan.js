import api from "../services/api";

class Scan {
    service = api;
    scan_url = "";
    req_address = "/scan";
    
    constructor() {
    }

    // getService() {
    //     return this.#service;
    // }

    // changeService(api) {
    //     this.#service = api;
    // }

    // getReqAddress() {
    //     return this.#req_address;
    // }
}

export default Scan;