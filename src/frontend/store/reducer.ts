import { TEST } from 'src/frontend/store/actions'
import { Action, State } from 'src/types'

export const initialState: State = {
    test: false,
}

export const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case TEST: {
            return {
                ...state,
                test: true,
            }
        }

        default: {
            return state
        }
    }
}
