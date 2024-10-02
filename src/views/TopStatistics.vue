<template>
    <section id="topStatistics">
        <b-container fluid>
            <div>
                <b-nav tabs fill>
                    <b-nav-item @click="toggleActive(item.path)" :active="item.path===linkSelected" v-for="item in links" :key="item.id" :to="item.path" exact>{{ item.name }}</b-nav-item>
                </b-nav>

                <router-view></router-view>
            </div>
        </b-container>
    </section>
</template>

<script>
    export default {
        name: 'TopStatistics',
        data() {
            return {
                test:'',
                linkSelected: 'Top Category',
                links: [
                    {
                    path: '/Statistics/top/category',
                    name: 'Top Category'
                },
                    {
                    path: '/Statistics/top/product',
                    name: 'Top Product'
                },
                    {
                    path: '/Statistics/top/city',
                    name: 'Top City'
                },
                ]
                
            }
            
        },

        methods:{
            toggleActive(path){
                this.linkSelected=path
            }
        },

        mounted(){
            this.linkSelected=this.$route.fullPath
        }

    }
</script>