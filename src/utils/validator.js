const validator = {
    /**
     * Check if "string" type
     * @param {string} string
     * @return {boolean}
     */
     isString(string) {
        return typeof string === "string";
    },
    
    /**
     * Check if string is "string" type and not empty
     * @param {string} string
     * @return {boolean}
     */
    isEmptyString(string) {
        return this.isString(string) && string.length === 0;
    }
}

export default validator;