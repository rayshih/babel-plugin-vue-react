
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function isVFor(node) {
  return node && node.type === 'JSXAttribute';
}

function getVFor(nodes) {
  for (const idx in nodes) {
    if (isVFor(nodes[idx])) return nodes[idx];
  }

  return null;
}

exports.default = ({ types: t }) => ({
  name: 'jsx-traverse-test',
  visitor: {
    JSXElement(path) {
      const { openingElement } = path.node;
      const vForNode = getVFor(openingElement.attributes);

      if (!vForNode) return;

      const m = /^\s*([^\s]+)\s+in\s+([^\s]+)\s*$/.exec(vForNode.value.value)
      if (!m) return;

      const collectionId = m[2];
      if (!path.scope.bindings[collectionId]) {
        throw path.buildCodeFrameError("The collection object doesn't exist");
      }

      openingElement.attributes = 
        openingElement.attributes.filter(n => !isVFor(n));

      path.replaceWith(
        t.callExpression(
          t.memberExpression(
            t.identifier(collectionId),
            t.identifier('map'),
          ),
          [
            t.arrowFunctionExpression(
              [
                t.identifier(m[1]),
              ],
              path.node,
            )
          ],
        ),
      );
    }
  },
});
