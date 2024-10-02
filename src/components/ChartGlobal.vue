<template>
    
    <b-container fluid>
        <b-row>
            <b-col :class="classchart">
                <div class="headline">
                      <h6 class="title">{{title }}</h6>
                      <h3 class="number">{{ number }}</h3>
            </div>
            <canvas :class="classcanvas"></canvas>
            </b-col>
        </b-row>
    </b-container>
     
    </template>
    
    <script>
    export default{
    
        name:'ChartGlobal',
        props:['title','number','classcanvas','classchart'],
       
    }
    </script>
    
    <style scoped>
    .confirmedneworders, .confirmationrate{
        margin-top: 34px;
        background: #14142D;
        width:43%;
        padding: 41px 40px;
        border-radius: 12px;
    }
    
    .canvas, .canvasconfirmationrate{
    height: 20%;
    width: 30%;
    }
    
    .headline .title{
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    
    .headline .number{
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 15px;
    }
    
    </style>