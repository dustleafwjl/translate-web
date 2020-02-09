export const debounce = function (handle, wait) {
    let timeout
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(handle, wait)
    }
}