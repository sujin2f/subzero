import {
    GET_ITEMS_INIT,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL,
    OPEN_DELETE_POPUP,
    CLOSE_DELETE_POPUP,
} from 'src/client/store/actions'
import { Action, State } from 'src/types'

export const initialState: State = {
    items: undefined,
    removePopup: false,
}

export const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case GET_ITEMS_INIT: {
            return {
                ...state,
                items: [],
            }
        }

        case GET_ITEMS_SUCCESS: {
            return {
                ...state,
                items: action.items,
            }
        }

        case GET_ITEMS_FAIL: {
            return {
                ...state,
                items: [],
            }
        }

        case OPEN_DELETE_POPUP: {
            return {
                ...state,
                removePopup: action._id,
            }
        }

        case CLOSE_DELETE_POPUP: {
            return {
                ...state,
                removePopup: false,
            }
        }

        default: {
            return state
        }
    }
}
