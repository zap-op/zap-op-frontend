import ZAP from "./zap";

/**
 * Traditional Spider ZAP scan
 * @extends ZAP
 */
class TS_ZAP extends ZAP {
    static fullName = "Traditonal Spider ZAP";
    static typeCode = "TS_ZAP";
    #event_source_address = this.service.defaults.baseURL + "/" + TS_ZAP.typeCode;
    
    max_childen = 0;
    recurse = true;
    subtree_only = false;

    constructor() {
        super();

        if (TS_ZAP._instance) {
            return TS_ZAP._instance;
        }
        TS_ZAP._instance = this;
    }

    static getIntance() {
        return new TS_ZAP();
    }

    /**
     * Config scan properties
     * @param {number} max_childen Must greater than 1
     * @param {boolean} recurse 
     * @param {boolean} subtree_only
     * @throws {TypeError} in case do not have expect type
     * @returns {Object} Object
     */
    config(max_childen = this.max_childen, recurse = this.recurse, subtree_only = this.subtree_only) {
        if (typeof max_childen !== "number") {
            throw new TypeError("max_childen should be number");
        }

        if (typeof recurse !== "boolean") {
            throw new TypeError("recurse should be boolean");
        }

        if (typeof subtree_only !== "boolean") {
            throw new TypeError("subtree_only shoul be boolean");
        }

        this.max_childen = max_childen;
        this.recurse = recurse;
        this.subtree_only = subtree_only;
    }

    /**
     * Create config object
     * @returns {Object} Object
     */
    #createConfigObject() {
        return {
            max_childen: this.max_childen,
            recurse: this.recurse,
            subtree_only: this.subtree_only
        }
    }

    /**
     * Create scan request object
     * @returns {Object} Object
     */
    #createScanRequest() {
        return {
            url: this.scan_url,
            type: this.type,
            scanConfig: this.#createConfigObject()
        }
    }

    async request() {
        return this.service.post(this.req_address, this.#createScanRequest());
    }

    async connect() {
        
    }

}

export default TS_ZAP;