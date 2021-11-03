import { Action, Item } from 'src/types'

export const HELLO = 'sujin/v1/HELLO'
export const GET_ITEMS_INIT = 'sujin/v1/GET_ITEMS_INIT'
export const GET_ITEMS_SUCCESS = 'sujin/v1/GET_ITEMS_SUCCESS'
export const GET_ITEMS_FAIL = 'sujin/v1/GET_ITEMS_FAIL'

/**
 * To test
 * @param {string} hello
 * @returns {Partial<Action>}
 */
export const setHello = (hello: string): Partial<Action> => {
    return {
        type: HELLO,
        hello: hello,
    }
}

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
