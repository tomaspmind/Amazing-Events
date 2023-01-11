const { createApp } = Vue

createApp( {
	data(){
		return {
            
            amazingInfo : undefined,
		}
	},
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            this.amazingInfo = data
            console.log(data)
        })
        .catch(error => error.message)
    },
    methods:{
        
    },
    
}).mount("#app")




let $stat1 = document.getElementById("tbody1")
let $stat2 = document.getElementById("tbody2")
let $stat3 = document.getElementById("tbody3")

let lista;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(datos => {
    lista = datos
    generadorDeTRPast (lista, $stat3)
    generadorDeTRUpcoming (lista, $stat2)
    mayorCapacity(lista.events)
    let filtro = armadoDeNuevaLista(lista)
    imprimirMayorPorcentaje(filtro)
    imprimirMenorPorcentaje(filtro)
})
.catch(error => error.message)



// Generar los TR del past

function generadorDeTRPast(losDatos, ubicacion){
/*     let categorias = new Set (losDatos.events.map(evento => evento.category)) */
    let pasEvents = losDatos.events.filter(evento => evento.date < losDatos.currentDate)
/*     let template1 = "" */
    let template2 = ""
/*   for(let categoria of categorias){
    
        template1 += `<tr>
        <td>${categoria}</td>
        `
    } */

    for (let past of pasEvents){
        template2 += 
    `<tr>
        <td>${past.category}</td>
        <td>$ ${multiplicacion(past.assistance, past.price)}</td>
        <td>${porcentaje(past.capacity, past.assistance)}%</td>
    </tr>`
    }


    ubicacion.innerHTML = template2
}

// Generar los TR del upcoming

function generadorDeTRUpcoming(losDatos, ubicacion){

        let upcomingEvents = losDatos.events.filter(evento => evento.date > losDatos.currentDate)
        let template1 = ""
        for (let up of upcomingEvents){
            template1 += 
        `<tr>
            <td>${up.category}</td>
            <td>$ ${multiplicacion(up.estimate, up.price)}</td>
            <td>${porcentaje(up.capacity, up.estimate)}%</td>
        </tr>`
        }
    
        ubicacion.innerHTML = template1
}

// Funcion de multiplicacion

function multiplicacion(dato1, dato2){
    return (dato1 * dato2).toLocaleString()
}

/* console.log (multiplicacion (15,10)) */

// Funcion de porcentaje

function porcentaje(dato1, dato2){
    return ( dato2 / (dato1/100) ).toFixed (2) //tomar solo 2 decimales
}

/* console.log (porcentaje(45000, 42756)) */

function mayorCapacity (eventos){
    let mayorCapacity = eventos.sort((a,b) => b.capacity - a.capacity)
    document.getElementById ("eventomayor").innerHTML = `${mayorCapacity[0].name} with ${mayorCapacity[0].capacity}`
}

function armadoDeNuevaLista(datos){ 
let nuevaLista = []
/* console.log(datos) */
    for (let i = 0; i < datos.events.length; i++) {
        nuevaLista.push(datos.events[i]);
        
        nuevaLista[i].percentage = porcentaje(nuevaLista[i].capacity, (nuevaLista[i].assistance || nuevaLista[i].estimate));
    }
    console.log(nuevaLista)
    return nuevaLista.sort((a,b) => b.percentage - a.percentage) 
}

function imprimirMayorPorcentaje(nuevoEvento){
    document.getElementById("mayorporcentaje").innerHTML = `${nuevoEvento[0].name} with ${nuevoEvento[0].percentage}%`
}

function imprimirMenorPorcentaje(nuevoEvento){
    document.getElementById("menorporcentaje").innerHTML = `${nuevoEvento[nuevoEvento.length-1].name} with ${nuevoEvento[nuevoEvento.length-1].percentage}%`
}