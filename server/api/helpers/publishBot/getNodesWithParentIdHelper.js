exports.getNodesWithParentId = async (payload) => {
    const { allEdges, allNodes } = payload;
    let nodesArrWithParentId = [];
    await Promise.all(allNodes.map(async (node) => {
        let filteredEdge = allEdges.filter(edge => edge.target === node.id);
        if (filteredEdge.length) {
            filteredEdge.map(async (fe) => {
                const { source, target, sourceHandle } = fe;
                if (target === node.id) {
                    node.parent_id = source;
                    node.sourceHandle = sourceHandle;
                    nodesArrWithParentId.push(node);
                }
            })
        } else {
            node.parent_id = null;
            node.sourceHandle = null;
            nodesArrWithParentId.push(node);
        }
    }));
    return nodesArrWithParentId;
};