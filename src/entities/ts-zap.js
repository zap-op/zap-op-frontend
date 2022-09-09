import ZAP from "./zap";

/**
 * Traditional Spider ZAP scan
 * @extends ZAP
 */
class TS_ZAP extends ZAP {
    static fullName = "Traditonal Spider ZAP";
    static typeCode = "TS_ZAP";
    #event_source_address = this.service.defaults.baseURL + this.req_address + "/" + TS_ZAP.typeCode;
    #event_source = undefined;

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
     * @throws {TypeError}
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
    #createScanRequestObject() {
        return {
            url: this.scan_url,
            type: TS_ZAP.typeCode,
            scanConfig: this.#createConfigObject()
        }
    }

    /**
     * Request scan
     * @throws {ReferenceError} 
     * @returns {Promise} POST AxiosResponse
     */
    async request() {
        if (!this.scan_url) {
            throw ReferenceError("scan_url is not defined")
        }
        return this.service.post(this.req_address, this.#createScanRequestObject());
    }

    /**
     * Connect Server-Send Events
     */
    connect() {
        if (this.#event_source) {
            this.#event_source.close();
        }
        this.#event_source = new EventSource(this.#event_source_address);
    }
    
    /**
     * Get Event Source connected to server
     * @throws {ReferenceError}
     * @returns {EventSource} EventSource object
     */
    connectionSource() {
        if (!this.#event_source) {
            throw ReferenceError("event_source is not connected yet")
        }
        return this.#event_source;
    }

    /**
     * Disconnect Server-Send Events
     */
    disconnect() {
        if (this.#event_source) {
            this.#event_source.close();
        }
    }
}

export default TS_ZAP;