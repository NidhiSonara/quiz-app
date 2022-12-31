import { REDUX_LOCAL_STORE_KEY } from "../helper/Constants";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(REDUX_LOCAL_STORE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("🚀 ~ file: LocalstorageHelper.js ~ line 11 ~ loadState ~ e", e)
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(REDUX_LOCAL_STORE_KEY, serializedState);
    } catch (e) {
        console.error("🚀 ~ file: LocalstorageHelper.js ~ line 21 ~ saveState ~ e", e)
        return undefined;
    }
};