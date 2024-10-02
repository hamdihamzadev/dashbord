<template>

    <div id="row-carts" class="justify-content-between" >

        <div id="cart" v-for="item in carts" :key="item.id">

            <div :class=item.classicon><i :class=item.icon></i></div>
            <div class="product">
                <h2 class="title">{{item.title}}</h2>
                <p class="numbers">{{ item.number }} {{ item.dollar }}</p>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: 'CardGlobal',
        props: {
            carts: {
                type: Array,
                required: true
            }
        }

    }
</script>

<style lang="scss">
    #row-carts {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        #cart {

            display: flex;
            height: 174px;
            padding-left: 26px;
            align-items: center;
            gap: 28px;
            background: #14142D;
            border-radius: 12px;
            flex-grow: 1;
            max-width: 49%;

            .allorders,
            .Neworders,
            .Order-Confirmed {
                background: rgba(155, 81, 224, 0.1);
                color: #9b51e0;
                padding: 12px;
                border-radius: 12px;

            }

            .income {
                background: rgba(33, 150, 83, 0.1);
                color: #219653;
                padding: 12px;
                border-radius: 12px;

            }

            .views,
            .visitors,
            .Shipped {
                background: rgba(54, 92, 245, 0.1);
                color: #365CF5;
                padding: 12px;
                border-radius: 12px;

            }

            .sales,
            .confirmation-rate,
            .delivery-rate {
                background: rgba(242, 153, 74, 0.1);
                color: #f2994a;
                padding: 12px;
                border-radius: 12px;

            }


            i.bx {
                font-size: 24px;
            }


            .product {
                .title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }

                .numbers {
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .pourcentage {
                    font-size: 14px;
                    color: #219653 !important;

                    span {
                        color: white;
                    }
                }
            }
        }
    }

    /* Style for tablets (less than de 992px) */
    @media screen and  (max-width: 991.98px) {
        #row-carts #cart {
            width: -webkit-fill-available;
        }
       
    }

    @media screen and (max-width: 768px) {
        #row-carts {
            gap: 18px;
        }

        #row-carts #cart {
            max-width: -webkit-fill-available;
        }
    }
</style>