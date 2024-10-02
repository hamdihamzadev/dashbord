<template>
        <div id="cont-img-error" class="d-flex flex-column gap-4" ><img src="../assets/illustration-du-concept-404 (1).png" alt="" id="img-error" >
        <b-button @click="todashbord" id="btn" >Return to Dashbord</b-button>
        </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    methods:{
        todashbord(){
            this.$router.push('/Dashbord')
        }
    }
  };
  </script>

<style scoped  >
#cont-img-error{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#img-error{
    width: 30%;
}

#btn{
    background-color: var(--couleur-primaire-4);
    border-color: var(--couleur-primaire-4);
}

#btn:hover{
    background-color: transparent;
    color: var(--couleur-primaire-4);
    display: block
}
</style>
  