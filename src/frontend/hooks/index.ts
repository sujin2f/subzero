import { useContext, useEffect } from 'react'
import { Context, ContextType, setTest } from 'src/frontend/store'

export const useTest = (): boolean => {
    const [{ test }, dispatch] = useContext(Context) as ContextType

    useEffect(() => {
        if (test) {
            return
        }

        dispatch(setTest())
    }, [dispatch, test])

    return test
}
