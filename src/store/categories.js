import axios from "axios"
const apiUrl=process.env.VUE_APP_API_URL

const state = {
    categories: [],
}

const mutations = {

    m_addCategory(state,newcategory){
        state.categories.push(newcategory)
    },

    m_getCategories(state, categories) {
        state.categories = categories
    },

    m_deleteCategory(state,id){
        state.categories= state.categories.filter(ele=> ele._id!==id)
    },

    m_updateCategory(state,updatedCategory){
        state.categories=state.categories.map(ctg=>{
          return  ctg._id===updatedCategory._id ? updatedCategory : ctg
        })
    
    },

}

const actions = {

    async ac_getCategories({
        commit
    }) {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${apiUrl}/api/category`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let categories = response.data.category
            commit('m_getCategories', categories)

        } catch (error) {
            console.log(`error get all orders is ${error}`)
        }

    },

    async ac_addCategory({commit},category){
        try{
            const token = localStorage.getItem('token')
            const response = await axios.post(`${apiUrl}/api/category`,category, {
                
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            const newcategory=response.data.category
            commit('m_addCategory',newcategory)

        }
        catch(error){
            console.log(`error add category is all  ${error}`)
        }
    },

    async ac_updateCategory({commit},{id,formCategoryUpdate}) {
        try {
            const token = localStorage.getItem('token')
           const response= await axios.put(`${apiUrl}/api/category/${id}`,formCategoryUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            const updatedCategory=response.data.categoryUpdate
            commit('m_updateCategory', updatedCategory)

        } catch (error) {
            console.log('erreur is :', error)
        }
    },

    async ac_deleteCategory({commit},id){
        try{
           const token = localStorage.getItem('token')
            await axios.put(`${apiUrl}/api/category/${id}`,{isDeleted:true}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            commit('m_deleteCategory',id)

        }
        catch(error){
            console.log(`error add category is all  ${error}`)
        }
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}