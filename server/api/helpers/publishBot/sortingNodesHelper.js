exports.sortingNodes = async (payload) => {
    const { nodesWithParentId } = payload;
    const sortedArray2 = nodesWithParentId.reduce((accumulator, currentValue) => {
        let item = accumulator.find(x => x.id === currentValue.parent_id);
        let index = accumulator.indexOf(item);
        index = index !== -1 ? index + 1 : accumulator.length;
        accumulator.splice(index, 0, currentValue);
        return accumulator;
    }, []);
    return sortedArray2;
};