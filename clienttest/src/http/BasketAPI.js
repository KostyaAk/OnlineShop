import { guestInstance } from './index.js'

export const fetchBasket = async () => {
    const { data } = await guestInstance.get('basket/getone')
    return data
}

export const appendSize = async (id, size_product) => {
    const { data } = await guestInstance.put(`basket/product/${id}/appendSize/1/${size_product}`)
    return data
}

export const increment = async (id, size_product) => {
    const { data } = await guestInstance.put(`basket/product/${id}/increment/1/${size_product}`)
    return data
}

export const decrement = async (id, size_product) => {
    const { data } = await guestInstance.put(`basket/product/${id}/decrement/1/${size_product}`)
    return data
}

export const remove = async (id, size_product) => {
    const { data } = await guestInstance.put(`basket/product/${id}/remove/${size_product}`)
    return data
}

export const clear = async () => {
    const { data } = await guestInstance.put(`basket/clear`)
    return data
}
