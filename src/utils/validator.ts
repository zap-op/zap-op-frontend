const validator = {
    /**
     * Check if "string" type
     */
     isString(string:string) {
        return typeof string === "string";
    },
    
    /**
     * Check if string is "string" type and not empty
     */
    isEmptyString(string:string) {
        return this.isString(string) && string.length === 0;
    }
}

export default validator;