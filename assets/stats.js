const {createApp} = Vue

createApp({
    data(){
    return {
        data: undefined,
        upcomingFiltered: undefined,
        pastFiltered: undefined,
        maxMinPercentage: [],
    }  
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then( response => response.json())
            .then(info => {
                this.data = info
                this.upcomingFiltered = this.data.events.filter(event => event.date > this.data.currentDate)
                this.pastFiltered = this.data.events.filter(event => event.date < this.data.currentDate)
                let listaPorcentaje = this.newPropertyPercentage(this.data)
                this.maxCapacity(this.data.events)
                this.maxPercentage(listaPorcentaje)
                this.minPercentage(listaPorcentaje)
            })
            .catch(err => console.log(err))
    },
    methods:{
        revenues : function (prices, estimatesOrAssistance){
            let rev = prices * estimatesOrAssistance
            return rev.toLocaleString()
    },
        percentageOfAttendance : function (capacities, estimatesOrAssistance){
        let percentage = (estimatesOrAssistance / (capacities/100)).toFixed(0)
        return percentage
    },
        newPropertyPercentage : function (data){
        let list = []
        let filteredAssistance = data.events.filter( event => event.assistance)
            for (let i = 0; i < filteredAssistance.length; i++) {
                list.push(filteredAssistance[i]);
                list[i].percentage = this.percentageOfAttendance(list[i].capacity, list[i].assistance);
            }
            return [...list.sort((event1, event2) => event2.percentage - event1.percentage)]
        },
        maxPercentage : function (events2){
            let sortedMax = [...events2.sort((event1, event2) => event2.percentage - event1.percentage)]
            this.maxMinPercentage[0] = {name: sortedMax[0].name + " with " , percentage: sortedMax[0].percentage +"%"}
        },
        minPercentage : function (events2){
            let sortedMin = [...events2.sort((event1, event2) => event1.percentage - event2.percentage)]
            this.maxMinPercentage[1] = {name: sortedMin[0].name + " with ", percentage: sortedMin[0].percentage + "%"}
        },
        maxCapacity : function (events){
            let maximCapacity = events.sort((event1, event2) => event2.capacity - event1.capacity)
            this.maxMinPercentage[2] = {name: maximCapacity[0].name + " with ", capacity: (maximCapacity[0].capacity).toLocaleString() + " of capacity."} 
        },
    },
}).mount("#app")