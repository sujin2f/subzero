import { HELLO } from 'src/frontend/store/actions'
import { Action, State } from 'src/types'

export const initialState: State = {
    hello: '',
}

export const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case HELLO: {
            return {
                ...state,
                hello: action.hello,
            }
        }

        default: {
            return state
        }
    }
}
