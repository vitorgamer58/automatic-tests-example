module.exports = {
    sum: notes => {
        const minValue = Math.min(...notes)
        if (minValue) {
            const result = notes.reduce((acc, note) => {
                acc += note
                return acc
            }, 0)
            return notes.length > 5 ? result * 2 : result
        }
        else {
            return 0
        }

    }
}