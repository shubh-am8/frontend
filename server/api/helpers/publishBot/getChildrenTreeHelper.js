const getMainParentNode = async (payload) => {
    const { allNodes } = payload;
    return allNodes.filter(n => n.parent_id === null).pop();
};
exports.getChildrenTree = async (payload) => {
    const { allNodes } = payload;
    const topParentNode = await getMainParentNode(payload);
    // var idToNodeMap = {}; //Keeps track of nodes using id as key, for fast lookup
    var idToNodeMap = allNodes.reduce(function (map, node) {
        node.children = [];
        if (node.sourceHandle === "if") {
            node.is_if_tree = true;
        } if (node.sourceHandle === "else") {
            node.is_else_tree = true;
        }
        map[node.id] = node;
        return map;
    }, {});
    var root = null;
    allNodes.forEach(function (node) {
        node.children = [];
        idToNodeMap[node.id] = node;
        if (node.parent_id === null) {
            root = node;
            console.log("root-->", root)
        } else {
            parentNode = idToNodeMap[node.parent_id];
            if (parentNode.is_if_tree) {
                node.is_if_tree = true;
            }
            if (parentNode.is_else_tree) {
                node.is_else_tree = true;
            }
            parentNode.children.push(node);
            console.log("parentNode--->", parentNode)

        }
    });
    let finalOutput = [idToNodeMap[topParentNode.id]];
    return finalOutput;
};