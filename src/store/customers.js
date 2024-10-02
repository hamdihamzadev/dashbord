import axios from "axios"
const apiUrl=process.env.VUE_APP_API_URL

const state = {
    customers: [],
}

const mutations = {

    m_getCustomers(state, customers) {
        state.customers = customers
    },

    m_addCustomer(state,newCustomer){
        state.customers.push(newCustomer)
    },

    m_updatCustomer(state,{updateCustomer,id}){
        state.customers=state.customers.map(ele => ele._id === id ? updateCustomer : ele )
    },

    m_deleteCustomer(state,id){
        state.customers=state.customers.filter(ele => ele._id!==id  )
    }
  

}

const actions = {

    async ac_addCustomer({commit},{customer}){
        try{
            const token=localStorage.getItem('token')
            const response = await axios.post(`${apiUrl}/api/customers`,customer,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const newCustomer=response.data.newCustomer
            commit('m_addCustomer',newCustomer)
        }
        catch(error){
            console.log(error)
        }
    },

    async ac_getCustomers({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${apiUrl}/api/customers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let customers = response.data.Allcustomers
            commit('m_getCustomers',customers)

        } catch (error) {
            console.log(`error get all orders is ${error}`)
        }
    },

    async ac_updatCustomer({commit},{customer,id}){
        try{
            const token=localStorage.getItem('token')
            const response = await axios.put(`${apiUrl}/api/customers/${id}`,customer, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            const updateCustomer=response.data.upadateCustomer
            commit('m_updatCustomer',{updateCustomer,id})
           
        }
        catch(error){
            console.log(`error get edit customer is ${error}`)
        }
    },

    async ac_deleteCustomer({commit},id) {
        try {
            const token = localStorage.getItem('token')
            await axios.put(`${apiUrl}/api/deletCustomer/${id}`,null,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            commit('m_deleteCustomer',id)
        } catch (error) {
            console.log('error the delete customer is :', error)
        }
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}