/**
 * 
 * @param {string} url 
 * @param {number} max_childen Must greater than 1
 * @param {boolean} recurse 
 * @param {boolean} subtree_only
 * @throws {TypeError} in case do not have expect type
 * @returns {Object} Object
 */


export default function ConnectSocketRequest(url, max_childen = 0, recurse = true, subtree_only = false) {
    if (typeof url !== "string") {
        throw new TypeError("url should be string");
    }

    if (typeof max_childen !== "number") {
        throw new TypeError("max_childen should be number");
    }

    if (typeof recurse !== "boolean") {
        throw new TypeError("recurse should be boolean");
    }

    if (typeof subtree_only !== "boolean") {
        throw new TypeError("subtree_only shoul be boolean");
    }

    return {
        url: url,
        max_childen: max_childen,
        recurse: recurse,
        subtree_only: subtree_only
    }
}