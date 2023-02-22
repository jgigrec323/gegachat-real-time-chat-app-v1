const hex__table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const colorGenerator = () => {
    let hex__key = ''
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * hex__table.length);
        hex__key += hex__table[index];
    }
    return hex__key;
}

module.exports = colorGenerator;