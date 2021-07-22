if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js')
            .then(function(registration){
            console.log(`El registro sel ServiceWorker fue exitoso, tiene el siguiente enlace: `, registration.scope);
            console.log(registration);                
        }).catch(function(err){
          console.log(`El registro del ServiceWorker falló: `, err);    
        });
        
        (function(){
            console.log('Entro a la funcion');
            function estado(evento){
                console.log(evento.type)
                if(navigator.onLine) {
                        alert("Online");
                } else {
                        alert("Offline");
                }
            }
    
            if(!navigator.onLine){
                estado(this)
            }
            window.addEventListener("online" , estado);
            window.addEventListener("offline" , estado);
        })();
    
        (function (){
            document.getElementById('share').addEventListener('click', function() {
                console.log('ingreso!!');
               if(navigator.share) {
                    navigator.share({
                      title: 'MOOV',
                      text: 'Tienda Online de Zapatillas',
                      url: 'http://localhost/awp-parcial2/index.html',
                    })
                    .then(function(){
                        console.log("Se compartió")
                    })      
                    .catch(function(error){
                      console.log(error)
                    })
              }
            });
          })();
    
        if(window.Notification && Notification.permission !== 'denied'){
            setTimeout('Notification.requestPermission()', 10000);
            console.log(Notification.permission);
        }
    });

}

function enviar(){
	
	if (!localStorage.getItem("agenda")){
		var arrayData = [];
	}else{
		arrayData = JSON.parse(localStorage.agenda);
	}
	
	var nombre=document.getElementById("nombre").value;
	var apellido=document.getElementById("apellido").value;
	var telefono=document.getElementById("telefono").value;
	
	data = { nombre: nombre, apellido: apellido, telefono : telefono }

	arrayData.push(data);

	localStorage.setItem("agenda", JSON.stringify(arrayData));	

	;
		
	mostrar();

}


function mostrar()
{

recuperar_localStorage= JSON.parse(localStorage.getItem("agenda"));

var textHTML = '';
for (var key in recuperar_localStorage) 
 	{
        textHTML +='<p class="datos mx-auto" >!Recibimos tu mensaje! <span>' + recuperar_localStorage[key].nombre + '</span><span> '+ recuperar_localStorage[key].apellido + '</span></p>'
    }

 document.getElementById("mostrar").innerHTML = outerHTML;

 document.getElementById("nombre").value ="";
 document.getElementById("apellido").value ="";
 document.getElementById("telefono").value ="";
}

