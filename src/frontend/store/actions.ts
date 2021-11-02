/**
 * Store actions
 * @module frontend
 */

import { Action } from 'src/types'

export const HELLO = 'sujin/v1/HELLO'

/**
 * To set pageInfo
 *
 * @param {Partial<PageInfo>} pageInfo
 * @returns {Partial<Action>}
 */
export const setHello = (hello: string): Partial<Action> => {
    return {
        type: HELLO,
        hello: hello,
    }
}
