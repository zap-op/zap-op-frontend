const validator = {
    /**
     * Check if string is "string" type and not empty
     * @param {string} string
     */
    isEmptyString(string) {
        return typeof string === "string" && string;
    }
}

export default validator;