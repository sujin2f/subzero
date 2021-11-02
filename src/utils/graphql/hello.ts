import { Hello } from 'src/types'
import { getHello } from '..'

export const hello = async (): Promise<Hello> => {
    return await getHello().catch((e) => {
        throw e
    })
}
