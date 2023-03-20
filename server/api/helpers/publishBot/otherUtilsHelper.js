exports.isSourceNode = async (payload) => {
    const { edges, nodes, nodeId } = payload;
    let childNode = "";
    let sourceEdge = edges.filter(edge => edge.source === nodeId);
    sourceEdge.map(async (se) => {
        childNode = nodes.filter(node => node.id === se.target);
    });
    return {
        childNode: childNode,
        isSource: sourceEdge.length ? true : false
    };
};
exports.isTargetNode = async (payload) => {
    const { edges, nodes, nodeId } = payload;
    let parentNode = "";
    let targetEdge = edges.filter(edge => edge.target === nodeId);
    targetEdge.map(async (te) => {
        parentNode = nodes.filter(node => node.id === te.source);
    });
    return {
        parentNode: parentNode,
        isTarget: targetEdge.length ? true : false
    };
};