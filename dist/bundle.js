!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(2),n(1)},function(e,t){let n=new Date,o={month:"long",day:"numeric",weekday:"short",hour:"numeric",minute:"numeric"},a={0:"sunday",1:"monday",2:"thuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"},d=document.getElementById("logoOneDay"),r=document.getElementById("logoTwoDay"),i=document.getElementById("logoThreeDay"),c=document.getElementById("degOne"),l=document.getElementById("degTwo"),u=document.getElementById("degThree"),s=document.getElementById("dayone"),m=document.getElementById("daytwo"),y=document.getElementById("daythree"),g=document.getElementById("country"),f=document.getElementById("weatherLogo"),p=document.getElementById("degreesTo"),h=document.getElementById("condition"),b=document.getElementById("feelsLike"),E=document.getElementById("wind"),I=document.getElementById("humidity"),x=document.getElementById("dateTime"),w=document.getElementById("longitude"),B=document.getElementById("latitude"),v=(document.getElementById("map"),document.getElementById("location")),C=document.getElementById("refreshBtn"),L=document.getElementById("celsius"),M=document.getElementById("fahrenheit");async function T(){let e;try{let t=await fetch("https://api.unsplash.com/photos/random?query=town,Ufa&client_id=472c15d3b911a4f0c95fa146c48b2b7a5298d38afe5f7fd474e6b6a67e54df21"),n=await t.json();e=await n.urls.small}catch(e){return e}v.style.background=`linear-gradient(#5f4e9680, #95537b80), url(${e}) no-repeat`,v.style.backgroundSize="100% 100%"}function k(){this.classList.add("active"),this==L?M.classList.remove("active"):L.classList.remove("active")}function j(e){return Math.floor(5*(e-32)/9)}x.textContent=n.toLocaleString("en-GB",o),setTimeout((function e(){n=new Date,x.textContent=n.toLocaleString("en-GB",o),setTimeout(e,60001)}),60001),mapboxgl.accessToken="pk.eyJ1IjoidXdldHUiLCJhIjoiY2s0Mmk3bGFqMDBsajNsczMydHViYnlydyJ9.1IY_Osu-DEAo1vXwwLhJ-w";let D=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/streets-v11",center:[-79.4512,43.6568],zoom:13}),S=new MapboxGeocoder({accessToken:mapboxgl.accessToken,mapboxgl:mapboxgl});navigator.geolocation&&navigator.geolocation.getCurrentPosition(e=>{let t=e.coords;D.flyTo({center:[t.longitude,t.latitude]}),B.textContent="Latitude: "+t.latitude.toFixed(3),w.textContent="Longitude: "+t.longitude.toFixed(3);let n=`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8811bed434bc45bdad5131edb4f26174/${t.latitude},${t.longitude}`;fetch(n).then(e=>e.json()).then(e=>{const{windSpeed:t,humidity:n,apparentTemperature:o,temperature:a,summary:s,icon:m}=e.currently;p.textContent=j(a)+"°",h.textContent=s,b.textContent="FEELS LIKE: "+j(o)+"°",E.textContent="WIND: "+t+" m/s",I.textContent="HUMIDITY: "+100*n+"%",f.src=`./assets/img/weather/${m}.svg`,c.textContent=Math.floor((j(e.daily.data[0].temperatureHigh)-Math.abs(j(e.daily.data[0].temperatureLow)))/2)+"°",l.textContent=Math.floor((j(e.daily.data[1].temperatureHigh)-Math.abs(j(e.daily.data[1].temperatureLow)))/2)+"°",u.textContent=Math.floor((j(e.daily.data[2].temperatureHigh)-Math.abs(j(e.daily.data[2].temperatureLow)))/2)+"°",d.src=`./assets/img/weather/${e.daily.data[0].icon}.svg`,r.src=`./assets/img/weather/${e.daily.data[1].icon}.svg`,i.src=`./assets/img/weather/${e.daily.data[2].icon}.svg`});fetch("https://ipinfo.io/json?token=e350ee42cac6a6").then(e=>e.json()).then(e=>{g.textContent=e.city+", "+e.country})}),window.onload=()=>{T()},C.addEventListener("click",T),L.addEventListener("click",k),M.addEventListener("click",k),document.getElementById("geocoder").appendChild(S.onAdd(D)),s.textContent=a[(n.getDay()+1)%7],m.textContent=a[(n.getDay()+2)%7],y.textContent=a[(n.getDay()+3)%7]},function(e,t){}]);