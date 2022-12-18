import ZAP from "./zap";

class TRIAL_TS_ZAP extends ZAP {
    private static _instance: TRIAL_TS_ZAP;
    private event_source_address!: string;
    static override readonly fullName: string = "Trial Traditonal Spider ZAP";
    static readonly typeCode: string = "trial";
    protected override reqAddress: string = this.reqAddress + `/${TRIAL_TS_ZAP.typeCode}`;

    private event_source: EventSource | undefined = undefined;

    constructor() {
        super();
        if (TRIAL_TS_ZAP._instance) {
            return TRIAL_TS_ZAP._instance;
        }
        this.event_source_address = this.service.defaults.baseURL + this.reqAddress;
        TRIAL_TS_ZAP._instance = this;
    }

    static getIntance() {
        return new TRIAL_TS_ZAP();
    }

    public connect() {
        this.disconnect();
        this.event_source = new EventSource(`${this.event_source_address}?url=${this.url}`);
    }

    /**
     * Get Event Source connected to server
     * @throws {ReferenceError}
     */
    public connectionSource(): EventSource {
        if (!this.event_source) {
            throw ReferenceError("event_source is not connected yet")
        }
        return this.event_source;
    }

    public disconnect() {
        if (this.event_source) {
            this.event_source.close();
            this.event_source = undefined;
        }
    }
}

export default TRIAL_TS_ZAP;