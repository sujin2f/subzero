import {
    HELLO,
    GET_ITEMS_INIT,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL,
} from 'src/frontend/store/actions'
import { Action, State } from 'src/types'

export const initialState: State = {
    hello: '',
    items: undefined,
}

export const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case HELLO: {
            return {
                ...state,
                hello: action.hello,
            }
        }

        case GET_ITEMS_INIT: {
            return {
                ...state,
                items: undefined,
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

        default: {
            return state
        }
    }
}
