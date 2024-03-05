const handelize = (str) => {
    return str ? str.toLowerCase().replace(/\s+/g, '-') : '';
};

module.exports = {
    handelize
}