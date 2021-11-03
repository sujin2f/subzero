import { Action, Item } from 'src/types'

export const GET_ITEMS_INIT = 'sujin/v1/GET_ITEMS_INIT'
export const GET_ITEMS_SUCCESS = 'sujin/v1/GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAIL = 'sujin/v1/GET_ITEMS_FAIL'
export const OPEN_DELETE_POPUP = 'sujin/v1/OPEN_DELETE_POPUP'
export const CLOSE_DELETE_POPUP = 'sujin/v1/CLOSE_DELETE_POPUP'

/**
 * Init get items
 * @returns {Partial<Action>}
 */
export const getItemsInit = (): Partial<Action> => {
    return {
        type: GET_ITEMS_INIT,
    }
}

/**
 * Get items success
 * @param {Item[]} items
 * @returns {Partial<Action>}
 */
export const getItemsSuccess = (items: Item[]): Partial<Action> => {
    return {
        type: GET_ITEMS_SUCCESS,
        items,
    }
}

/**
 * Get items fail
 * @returns {Partial<Action>}
 */
export const getItemsFail = (): Partial<Action> => {
    return {
        type: GET_ITEMS_FAIL,
    }
}

/**
 * Open Popup
 * @returns {Partial<Action>}
 */
export const openRemovePopup = (_id: string): Partial<Action> => {
    return {
        type: OPEN_DELETE_POPUP,
        _id,
    }
}

/**
 * Close Popup
 * @returns {Partial<Action>}
 */
export const closeRemovePopup = (): Partial<Action> => {
    return {
        type: CLOSE_DELETE_POPUP,
    }
}
