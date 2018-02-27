export default function findDOMNode(ref) {
    if (ref && ref.nodeType) {
        return ref;
    }
    if (!ref || ref.$UN) {
        return null;
    }
    if (ref.$LI) {
        return ref.$LI.dom;
    }
    return null;
}