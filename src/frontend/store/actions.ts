/**
 * Store actions
 * @module frontend
 */

import { Action } from 'src/types'

export const TEST = 'sujin/v1/TEST'

/**
 * To set pageInfo
 *
 * @param {Partial<PageInfo>} pageInfo
 * @returns {Partial<Action>}
 */
export const setTest = (): Partial<Action> => {
    return {
        type: TEST,
    }
}
