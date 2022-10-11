import SCAN_TYPE from "../utils/scan-type";
import Scan from "./scan";
import ZAP from "./zap";

/**
 * Traditional Spider ZAP scan
 * @extends Scan
 */
class TS_ZAP extends Scan {
    private static _instance: TS_ZAP;
    public readonly fullName: string = "Traditonal Spider ZAP";
    public readonly typeCode: string = SCAN_TYPE.ZAP.SPIDER;
    private event_source_address!: string;
    private event_source!: EventSource;

    public maxChildren: number = 1;
    public recurse: boolean = true;
    public contextName: string = "";
    public subtreeOnly: boolean = false;

    constructor() {
        super();
        if (TS_ZAP._instance) {
            return TS_ZAP._instance;
        }
        this.event_source_address = this.service.defaults.baseURL + this.reqAddress + "/" + this.typeCode;
        TS_ZAP._instance = this;
    }

    static getIntance() {
        return new TS_ZAP();
    }

    /**
     * Create scan request object
     * @throws {RangeError}
     */
    private createScanRequestObject(): {
        url: string;
        type: string;
        scanConfig: {
            maxChildren: number;
            recurse: boolean;
            contextName: string;
            subtreeOnly: boolean;
        };
    } {
        if (this.maxChildren < 0) {
            throw RangeError("maxChildren is not in the set or range of allowed values")
        }
        return {
            url: this.url,
            type: this.typeCode,
            scanConfig: {
                maxChildren: this.maxChildren,
                recurse: this.recurse,
                contextName: this.contextName,
                subtreeOnly: this.subtreeOnly
            },
        }
    }

    /**
     * Request scan
     * @throws {ReferenceError} 
     */
    public request(): ReturnType<(typeof this.service.post)> {
        if (!this.url) {
            throw ReferenceError("url is not defined")
        }
        return this.service.post(this.reqAddress, this.createScanRequestObject());
    }

    /**
     * Connect Server-Send Events
     */
    public connect(scanSession: string) {
        this.disconnect();
        this.event_source = new EventSource(`${this.event_source_address}?scanSession=${scanSession}`);
    }

    /**
     * Get Event Source connected to server
     * @throws {ReferenceError}
     */
    public connectionSource() : EventSource {
        if (!this.event_source) {
            throw ReferenceError("event_source is not connected yet")
        }
        return this.event_source;
    }

    /**
     * Disconnect Server-Send Events
     */
    public disconnect() {
        if (this.event_source) {
            this.event_source.close();
        }
    }
}

export default TS_ZAP;