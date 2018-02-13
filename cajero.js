var imagenes = [];

imagenes["1"] = "1rupee.jpg";
imagenes["5"] = "5rupee.jpg";
imagenes["20"] = "20rupee.jpg";
imagenes["50"] = "50rupee.jpg";

class Billete
{
  constructor(v, c)
  {
    this.valor = v;
    this.cantidad = c;

    this.imagen = new Image();
    this.imagen.src = imagenes[this.valor];
  }
}

var entregado = [];
var caja = [];
caja.push( new Billete(50, 1) );
caja.push( new Billete(20, 1) );
caja.push( new Billete(5, 1) );
caja.push( new Billete(1, 1) );


var dinero = 0;
var aDar = 0;
var retirados = 0;

var boton_saldo = document.getElementById("ver_saldo");
boton_saldo.addEventListener("click", saldo);

var total = 0;
function saldo()
{
  var tesoro = 0;
  for(var v of caja)
  {
    tesoro += (v.valor * v.cantidad);
    total = tesoro;
    mensaje.innerHTML = "Su saldo es: " + tesoro + " rupias." + "<hr />";
  }
}

function actualizar()
{
  var saldo = 0;
  for(var v of caja)
  {
    saldo += (v.valor * v.cantidad);
    total = saldo;
  }
}

var boton_depositar = document.getElementById("depositar");
boton_depositar.addEventListener("click", deposito);

function deposito()
{
  var tesoro = prompt("Por favor indique la denominación a depositar: 50, 20, 5 ó 1.", "Denominación.");
  if( tesoro == 50 || tesoro == 20 || tesoro == 5 || tesoro == 1)
  {
    if(tesoro == 50)
    {
      var cant_50 = prompt("Indíque la cantidad de billetes.", 1);

      while( isNaN(cant_50) )
      {
        cant_50 = prompt(cant_50 + " No es un valor correcto, Por favor indíque un valor");
      }

      caja[0].cantidad += parseInt(cant_50);
      actualizar();
      mensaje.innerHTML += "Se ha depositado " + cant_50 + " Billetes de: " + tesoro + " rupias." + "<hr />";
    }

    if(tesoro == 20)
    {
      var cant_20 = prompt("Indíque la cantidad de billetes.", 1);

      while( isNaN(cant_20) )
      {
        cant_20 = prompt(cant_20 + " No es un valor correcto, Por favor indíque un valor");
      }

      caja[1].cantidad += parseInt(cant_20);
      actualizar();
      mensaje.innerHTML += "Se ha depositado " + cant_20 + " Billetes de: " + tesoro + " rupias." + "<hr />";
    }

    if(tesoro == 5)
    {
      var cant_5 = prompt("Indíque la cantidad de billetes.", 1);

      while( isNaN(cant_5) )
      {
        cant_5 = prompt(cant_5 + " No es un valor correcto, Por favor indíque un valor");
      }

      caja[2].cantidad += parseInt(cant_5);
      actualizar();
      mensaje.innerHTML += "Se ha depositado " + cant_5 + " Billetes de: " + tesoro + " rupias." + "<hr />";
    }

    if(tesoro == 1)
    {
      var cant_1 = prompt("Indíque la cantidad de billetes.", 1);

      while( isNaN(cant_1) )
      {
        cant_1 = prompt(cant_1 + " No es un valor correcto, Por favor indíque un valor");
      }

      caja[3].cantidad += parseInt(cant_1);
      actualizar();
      mensaje.innerHTML += "Se ha depositado " + cant_1 + " Billetes de: " + tesoro + " rupias." + "<hr />";
    }
  }
  else
  {
    mensaje.innerHTML = ("Valor no valido, por favor elija una denominación disponible para depositar." + "<hr />");
  }
}




var boton = document.getElementById("extraer");
boton.addEventListener("click", entregarDinero);

var mensaje = document.getElementById("mensaje");



document.getElementById("borrar").onclick = function borra()
{
  mensaje.innerHTML = "";
  entregado = [];
}

function contador()
{
  total = 0;
  for(var tot of caja)
  {
    total += (tot.valor * tot.cantidad);
  }
}


function entregarDinero()
{

  var mostrado = [];

  var t = document.getElementById("dinero");
  dinero = parseInt(t.value);

  if(dinero > total)
  {
    mensaje.innerHTML += "No tienes suficientes rupias, ve a romper unas vasijas! <hr />";
  }
  else
  {
    for(var bi of caja)
    {
      if(dinero > 0)
      {
        aDar = Math.floor(dinero / bi.valor);
        if(aDar > bi.cantidad)
        {
          retirados = bi.cantidad;
        }
        else
        {
          retirados = aDar;
        }

        bi.cantidad -= retirados;

        entregado.push( new Billete(bi.valor, retirados) );

        for(var i = 0; i < retirados; i++)
        {
          mostrado.push( new Billete(bi.valor, 1) );
        }
        dinero -= (bi.valor * retirados);
      }
    }


    if(dinero == 0)
    {
      mensaje.innerHTML += "Fueron retirados:" + "<br />";
      for(var e of entregado)
      {
        if(e.cantidad > 0)
        {
          var extraidos = (e.valor * e.cantidad);
          mensaje.innerHTML += e.cantidad + " billetes de $" + e.valor + " rupias" + " = " + extraidos + " rupias." + "<br />";
        }
      }
    }
    mensaje.innerHTML += "<br />" + "<hr />";
  }

  if(dinero == 0)
  {
    for(var e of mostrado)
    {
      mensaje.innerHTML += e.cantidad + " billete de " + e.valor + " rupias." + "<br />" + "<img src=" + e.imagen.src + " />" + "<hr />";
    }
    mensaje.innerHTML += "<hr />";
    contador();
  }
  else
  {
    mensaje.innerHTML += "No hay billetes para esa cantidad, intenta otro valor! <hr />";
  }
}



//Corregir: Se resta valor al saldo si se saca una cantidad para la cual no se cuenta con suficientes billetes.
//Agregar: Que diga el total extraido abajo del recuento por escrito.
//Optimizar: Función deposito();
