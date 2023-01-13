const { createApp } = Vue

createApp( {
	data(){
		return {
            amazingInfo : undefined,
            amazingCard : undefined,
            categorys : undefined,
            valueOfSearch: "",
            filterCard: "",
            checked: [],
		}
	},
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            this.amazingInfo = data
            this.amazingCard = data.events.filter( past => past.date > this.amazingInfo.currentDate )
            this.categorys = [...new Set(this.amazingCard.map(card => card.category))]
            this.filterCard = [...this.amazingCard]
            console.log(this.amazingCard)
        })
        .catch(error => error.message)
    },
    methods:{
        crossFilter: function(){
            let filterPerSearch = this.amazingCard.filter(card => card.name.toLowerCase().startsWith(this.valueOfSearch.toLowerCase()))
            if (this.checked.length === 0){
                this.filterCard = filterPerSearch
            }else{
                let filterPerCheck = filterPerSearch.filter(card => this.checked.includes(card.category))
                this.filterCard = filterPerCheck
            }
        }
    },
}).mount("#app")