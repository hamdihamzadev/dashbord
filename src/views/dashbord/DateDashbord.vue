<template>
    <section id="date">
        <b-row class="gap-2 gap-md-0" >
            <b-col cols="12" md="4" >
                <b-form-select v-model="optionSelected" :options="options" id="select-typeDate" @change="getValue">
                </b-form-select>
            </b-col>
            <b-col cols="12" md="8" >      
                <!-- Days -->
                <b-form-datepicker v-show="optionSelected==='Day'" id="example-datepicker" v-model="daySelected"
                    locale="en" class="w-100" @input="sendDay">
                </b-form-datepicker>

                <!--  Months -->
                <b-dropdown v-show="optionSelected==='Month'" variant="primary" class="w-100" id="dropMonth">
                    <template #button-content>
                        <b-icon icon="calendar-date" aria-hidden="true"></b-icon> {{ MonthSelecte }}
                    </template>
                    <b-dropdown-group class="w-100">
                        <b-dropdown-item-button class="w-100" @click="sendMonth(month)" v-for="month in allMonths"
                            :key="month.id">
                            {{ month }}
                        </b-dropdown-item-button>
                    </b-dropdown-group>
                </b-dropdown>
                 <!--  Years -->
                <b-dropdown v-show="optionSelected==='Year'" variant="primary" class="w-100" id="dropMonth">
                    <template #button-content>
                        <b-icon icon="calendar-date" aria-hidden="true"></b-icon> {{ yearSelected }}
                    </template>
                    <b-dropdown-group class="w-100">
                        <b-dropdown-item-button class="w-100" @click="sendYear(year)" v-for="year in years"
                            :key="year.id">
                            {{ year }}
                        </b-dropdown-item-button>
                    </b-dropdown-group>
                </b-dropdown>
            </b-col>
        </b-row>
    </section>
</template>

<script>
    export default {
        name: 'DateDashbord',
        data() {
            return {
                options: [{
                        value: 'Year',
                        text: 'Year'
                    },
                    {
                        value: 'Month',
                        text: 'Month'
                    },
                    {
                        value: 'Day',
                        text: 'Day'
                    },
                ],
                optionSelected: 'Year',
                years:[],
                allMonths: [

                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'

                ],
                MonthSelecte: '',
                daySelected: '',
                yearSelected:'',
           

            }
        },

        computed: {

            typeDate() {
                let date = ''
                if (this.optionSelected === 'Day') {
                    date = this.daySelected
                } else if (this.optionSelected === 'Month') {
                    date = this.allMonths.indexOf(this.MonthSelecte) + 1
                }else if(this.optionSelected === 'Year'){
                    date= this.yearSelected
                }
                return date
            }
        },

        methods: {

            // send date
            getValue() {

                this.$emit('send-date', {
                    type: this.optionSelected,
                    dateSelected: this.typeDate
                })
            },
            sendMonth(month) {
                this.MonthSelecte = month
                this.$emit('send-month', {
                    type: this.optionSelected,
                    dateSelected: this.typeDate
                })
            },
            sendDay() {
                this.$emit('send-day', {
                    type: this.optionSelected,
                    dateSelected: this.typeDate
                })
            },

            sendYear(year){
                this.yearSelected=year
                this.$emit('send-year',{
                    type: this.optionSelected,
                    dateSelected: this.typeDate
                })
            },

            // get recent month
            getRecentMonth() {
                this.MonthSelecte = this.allMonths[new Date().getMonth()]

            },

            // get recent day
            getRecentDay() {
                this.daySelected = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`

            },

            // Generation list years
            generateYears() {
                const currentYear = new Date().getFullYear();
                const startYear = 2000; // Vous pouvez ajuster cette année de départ
                for (let year = startYear; year <= currentYear; year++) {
                    this.years.push(year);
                }
                this.yearSelected=currentYear
            }
        },

        mounted() {
            this.getRecentMonth()
            this.getRecentDay()
            this.generateYears()
        }
    }
</script>

<style scoped>
    #select-typeDate {
        width: -webkit-fill-available;
        padding: 5px;
        border: none;
        border-radius: 6px;
        height: -webkit-fill-available;
        background: #355bf1;
        color: white;
        cursor: pointer;
    }

    .width {
        width: max-content;
    }
</style>