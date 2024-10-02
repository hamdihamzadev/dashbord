import axios from "axios"
const apiUrl=process.env.VUE_APP_API_URL

const state = {
    conversionOrders: {
        New: [],
        Confirmed: [],
        Shipped: [],
        Delivered: [],
        Return: [],
        Cancelled: []
    }
}

const mutations = {


    m_GetConversionOrders(state, {
        type,
        orders
    }) {
        state.conversionOrders[type] = orders
    },


}


const actions = {



    async ac_GetConversionOrders({commit}, type) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${apiUrl}/api/orderConversionStatus`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const orders = response.data.conversionOrders.filter(ele => ele.status === type)
            commit('m_GetConversionOrders', {
                type,
                orders
            })

        } catch (error) {
            console.log(`error get GetConversionOrders is ${error}`)
        }
    },



}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}