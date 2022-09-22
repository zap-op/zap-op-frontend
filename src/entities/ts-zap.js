import SCAN_TYPE from "../utils/scan-type";
import Scan from "./scan";
import ZAP from "./zap";

/**
 * Traditional Spider ZAP scan
 * @extends ZAP
 */
class TS_ZAP extends ZAP {
    static fullName = "Traditonal Spider ZAP";
    static typeCode = SCAN_TYPE.ZAP.SPIDER;
    #event_source_address = this._service.defaults.baseURL + Scan.reqAddress + "/" + TS_ZAP.typeCode;
    #event_source = undefined;

    maxChildren = 1;
    recurse = true;
    contextName = "";
    subtreeOnly = false;

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
     * @param {number} maxChildren Must positive numbers | '0' is unlimited
     * @param {boolean} recurse 
     * @param {string} contextName
     * @param {boolean} subtreeOnly
     * @throws {TypeError}
     * @returns {Object} Object
     */
    config(maxChildren = this.maxChildren, recurse = this.recurse, contextName = this.contextName, subtreeOnly = this.subtreeOnly) {
        if (typeof maxChildren !== "number") {
            throw new TypeError("maxChildren should be number");
        }

        if (typeof recurse !== "boolean") {
            throw new TypeError("recurse should be boolean");
        }

        if (typeof contextName !== "string") {
            throw new TypeError("contextName should be string");
        }

        if (typeof subtreeOnly !== "boolean") {
            throw new TypeError("subtreeOnly shoul be boolean");
        }

        this.maxChildren = maxChildren;
        this.recurse = recurse;
        this.contextName = contextName;
        this.subtreeOnly = subtreeOnly;
    }

    /**
     * Create config object
     * @returns {Object} Object
     */
    #createConfigObject() {
        return {
            maxChildren: this.maxChildren,
            recurse: this.recurse,
            contextName: this.contextName,
            subtreeOnly: this.subtreeOnly
        }
    }

    /**
     * Create scan request object
     * @returns {Object} Object
     */
    #createScanRequestObject() {
        return {
            url: this.url,
            type: TS_ZAP.typeCode,
            scanConfig: this.#createConfigObject()
        }
    }

    /**
     * Request scan
     * @throws {ReferenceError} 
     * @returns {Promise} POST AxiosResponse
     */
    request() {
        if (!this.url) {
            throw ReferenceError("url is not defined")
        }
        return this._service.post(Scan.reqAddress, this.#createScanRequestObject());
    }

    /**
     * Connect Server-Send Events
     */
    connect() {
        if (this.#event_source) {
            this.#event_source.close();
        }
        this.#event_source = new EventSource(this.#event_source_address, {
            withCredentials: true
        });
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