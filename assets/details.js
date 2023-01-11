const { createApp } = Vue

createApp( {
	data(){
		return {
            
            amazingInfo : undefined,
            cards : undefined,
		}
	},
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            this.amazingInfo = data
            this.crearDetaills(data)
        })
        .catch(error => error.message)
    },
    methods:{
        llamarURL : () =>{
            let cadenaParametroUrl = location.search 
            let parametros = new URLSearchParams(cadenaParametroUrl)
            return parametros.get("idCarta")
        },
        crearDetaills : function (info) {
            let guardado = this.llamarURL()
            this.cards = info.events.find(objeto => objeto._id == guardado)

        },
    },
    
}).mount("#app")
