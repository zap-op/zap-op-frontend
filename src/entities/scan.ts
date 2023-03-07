import api from "../services/api";
import type { AxiosInstance } from "../services/api";

class Scan {
	protected service = api;
	public url: string = "";
	protected reqAddress: string = "/scan";

	protected changeService(api: AxiosInstance) {
		this.service = api;
	}
}

export default Scan;
