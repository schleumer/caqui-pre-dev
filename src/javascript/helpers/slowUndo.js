// TODO: refactor
// @see https://github.com/omnidan/redux-undo/issues/70
// @see https://github.com/omnidan/redux-undo/issues/24

let filter;
export default function slowUndo(action, currentState, previousState) {
    if (!filter) {
        filter = setTimeout(() => {
            filter = false
        }, 1000);
        return true;
    }
    return false;
}