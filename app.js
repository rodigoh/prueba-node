let autos = require('./node_modules/autos.js');
let concesionaria = {
   autos: autos,

   buscarAuto: function (patente) {
      let resultado = autos.find(auto => auto.patente === patente)
      if (!resultado) return null;
      return resultado;
   },

   venderAuto: function (patente) {
      const autoEncontrado = this.buscarAuto(patente);
      autos.forEach(auto => {
         if (auto.patente === patente) {
            auto.vendido = true;
         }
      })
   },
   autosParaLaVenta: function () {
      return autos.filter(auto => auto.vendido === false)
   },
   autosNuevos: function () {
      let autoEncontrado = this.autosParaLaVenta();
      return autos.filter(auto => auto.km < 100 && auto.vendido == false)
   },
   listaDeVentas: function () {
      let vendidos = autos.filter(auto => auto.vendido === true);
      let costos = [];
      vendidos.forEach(auto => costos.push(auto.precio))
      return costos;
   },
   totalDeVentas: function () {
      return this.listaDeVentas().reduce((previo, actual) => previo + actual, 0);
   },
   
puedeComprar: function (auto, persona) {
      let precioCuotas = auto.precio / auto.cuotas;
      if (persona.capacidadDePagoEnCuotas > precioCuotas && persona.capacidadDePagoTotal >= auto.precio) {
         console.log("Cumple");
        return true
      } 
   }, 
};



let autoEjemplo = {
    precio: 150000,
    cuotas: 12,
}
let personaEjemplo = {
    capacidadDePagoEnCuotas: 100,
    capacidadDePagoTotal: 10000000,
}
console.log(concesionaria.puedeComprar(autoEjemplo, personaEjemplo));