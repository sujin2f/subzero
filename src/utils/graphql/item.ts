import { Item } from 'src/types'
import { getItems } from '..'

export const items = async (): Promise<Item[]> => {
    return await getItems().catch((e) => {
        throw e
    })
}
