import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL

const state = {
    orders: [],

}

const mutations = {

    m_getOrders(state, orders) {
        state.orders = orders
    },

    m_addOrder(state, newOrder) {
        state.orders.push(newOrder)
    },

    m_deleteOrder(state, id) {
        state.orders = state.orders.filter(ele => ele._id !== id)
    },

    m_changeStatusSuivi(state, id) {
        state.orders = state.orders.filter(ele => ele._id !== id)
    },

    m_updateOrder(state,{id,quantity,total}){
        state.orders= state.orders.map(ele=> ele._id === id ? {...ele,quantity:quantity,total:total}: ele)
     
     
    }


}


const actions = {

    async ac_getOrders({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${apiUrl}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const allOrders = response.data.orders
            commit('m_getOrders', allOrders)

        } catch (error) {
            console.log(`error get all orders is ${error}`)
        }
    },

    async ac_addOrder({
        commit
    }, order) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`${apiUrl}/api/order`, order, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newOrder = response.data.newOrder
            commit('m_addOrder', newOrder)

        } catch (error) {
            console.log(`error is : ${error}`)
        }
    },

    async ac_updateOrder({commit},{id,quantity,total}) {
        try {
            const token = localStorage.getItem('token')
            await axios.put(`${apiUrl}/api/order/${id}`, {
                quantity,
                total
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            commit('m_updateOrder',{id,quantity,total})
        } catch (error) {
            console.log(`error is ${error}`)
        }
    },

    async ac_deleteOrder({
        commit
    }, id) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`${apiUrl}/api/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.message)
            commit('m_deleteOrder', id)
        } catch (error) {
            console.log(`error delete order is ${error}`)
        }
    },
    async ac_changeStatusSuivi({
        commit
    }, {
        statusSuivi,
        id
    }) {
        try {
            const token = localStorage.getItem('token')
            await axios.put(`${apiUrl}/api/order/changeStutusSuivi/${id}`, {
                statusSuivi,
                statusTable: 'Not treat'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(`this in store ${statusSuivi}`)
            commit('m_changeStatusSuivi', id)

        } catch (error) {
            console.log(`error update status suivi is : ${error}`)
        }
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}