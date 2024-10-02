import axios from "axios"
const apiUrl=process.env.VUE_APP_API_URL

const state = {
    Products: []
}

const mutations = {
    
    m_addProduct(state,newProduct) {
        state.Products.push(newProduct)
    },

    m_UpdateProduct(state,{updateProduct,id}) {
        state.Products= state.Products.map(product => product._id===id ? updateProduct : product )
    },

    m_deleteProduct(state,id){
        state.Products=state.Products.filter(ele => ele._id!==id )
    },

    m_getProducts(state, Products) {
        state.Products = Products ? Products:''
    },

    m_updateQuantityProduct(state,{id,UpdateProduct}){
        state.Products= state.Product.map(ele=> ele._id ===  id ? UpdateProduct : ele )
    }

  
}

const actions = {

    
    async ac_addProduct({commit},product) {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${apiUrl}/api/product`,product, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        const newProduct= response.data.Product
        commit('m_addProduct',newProduct)
    },

    
    async ac_UpdateProduct({commit},{product,id}){
        try{
            const token=localStorage.getItem('token')
            const response = await axios.put(`${apiUrl}/api/product/${id}`,product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            const updateProduct=response.data.updateProduct
            commit('m_UpdateProduct',{updateProduct,id})
        }
        catch(error){
            console.log('error is :', error)
        }
    },


    async ac_getProducts({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${apiUrl}/api/product`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const Products = response.data.products
            commit('m_getProducts', Products)

        } catch (error) {
            console.log('error is :', error)
        }
    },

    async ac_deleteProduct({commit},id){
        try{
            const token = localStorage.getItem('token')
            await axios.put(`${apiUrl}/api/deleteProduct/${id}`,null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            commit('m_deleteProduct',id)
        }
        catch(error){
            console.log('error delete prd is :', error)
        }
    },

    async ac_updateQuantityProduct({commit},{id,quantity}){
        try{
            const token=localStorage.getItem('token')
            const response=await axios.put(`${apiUrl}/api/productQuantity/${id}`,{quantity},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const UpdateProduct=response.data.UpdateProduct
            commit('m_updateQuantityProduct',{id,UpdateProduct})
        }
        catch(error){
            console.log(`error the update quantity product is ${error}`)
        }
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}






