<template>
    <div class="d-flex" id="group-search">
        <b-form-input id="filter-input" type="search" placeholder="Search product or ..." @input="searchprd">
        </b-form-input>
        <b-form-select v-model="Selected" :options="options" id="select-filter" ></b-form-select>
    </div>
</template>

<script>
    export default {
        name: 'SearchTable',
        data() {
            return {
                Selected: 'Name',
        options: [
          { value: 'Name', text: 'Name' },
          { value: 'Price', text: 'Price' },
          { value: 'Category', text: 'Category' },
        ]
                
            }
        },
        methods: {
            searchprd(val) {

                let tbody = Array.from((document.querySelector('tbody').children))
                if(this.Selected==='Name'){
                    tbody.forEach(tr=>{
                        let name= Array.from(tr.children)[2].textContent.toLowerCase()
                        console.log(tr)
                        console.log(`this is type ${name}`)
                        console.log(`this is val ${val}`)
                        tr.style.display= name.includes(val.toLowerCase()) ? '':'none'
                    })
                }else if(this.Selected==='Price'){
                    tbody.forEach(tr=>{
                        let name= Array.from(tr.children)[3].textContent.toLowerCase()
                        tr.style.display= name.includes(val.toLowerCase()) ? '':'none'
                    })
                }else if(this.Selected==='Category'){
                    tbody.forEach(tr=>{
                        let name= Array.from(tr.children)[4].textContent.toLowerCase()
                        tr.style.display= name.includes(val.toLowerCase()) ? '':'none'
                    })
                }
                
            }
        }
    }
</script>

<style scoped>
#filter-input{
    width: 70%;
    border-radius: 0.375rem 0 0 0.375rem;
}
#filter-input::placeholder{
    color: var( --couleur-primaire-2);
}

#select-filter{
    width: 42%;
    background-color: var( --couleur-primaire-4);
    color: var(--couleur-primaire-3);
    border-radius: 0 0.375rem 0.375rem 0;
    border-color:  #6c757d;
    padding-inline: 6px;
}

#filter-input:focus{
    box-shadow: none;
    border-color: white;
}
#select-filter:focus{
    box-shadow: none;
    border-color: white;
}

</style>