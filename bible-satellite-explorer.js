/* DMC Bible History Satellite Explorer — English content, Abraham to Revelation. */
(function(){
"use strict";
const locations=[
{n:"Ur of the Chaldeans",c:"Modern Iraq",e:"Abraham's early home; the starting point of the patriarchal story.",r:"Genesis 11:27–32; 15:7",lat:30.9626,lon:46.1031,era:"Patriarchs"},
{n:"Haran",c:"Modern Türkiye",e:"Abraham's family settled here before he continued toward Canaan.",r:"Genesis 11:31–12:5",lat:36.8667,lon:39.0333,era:"Patriarchs"},
{n:"Shechem",c:"Modern West Bank / Palestine",e:"Abraham received God's promise in Canaan; later associated with Israel's covenant renewal.",r:"Genesis 12:6–7; Joshua 24",lat:32.2132,lon:35.2824,era:"Patriarchs"},
{n:"Bethel",c:"Modern West Bank / Palestine",e:"Abraham and Jacob worshipped here; Jacob's dream became a defining moment.",r:"Genesis 12:8; 28:10–22",lat:31.9305,lon:35.2212,era:"Patriarchs"},
{n:"Hebron / Mamre",c:"Modern West Bank / Palestine",e:"Abraham lived near Mamre; the patriarchal narratives connect this region with covenant promises and the burial place of the patriarchs.",r:"Genesis 13:18; 18:1; 23:2–20",lat:31.5326,lon:35.0998,era:"Patriarchs"},
{n:"Beersheba",c:"Modern Israel",e:"A southern landmark in the stories of Abraham, Isaac and Jacob.",r:"Genesis 21:31–33; 26:23–33",lat:31.2520,lon:34.7915,era:"Patriarchs"},
{n:"Egypt / Nile Delta",c:"Modern Egypt",e:"Abraham visited Egypt; centuries later the Israelites lived in Egypt and were delivered in the Exodus.",r:"Genesis 12:10–20; Exodus 1–14",lat:30.0444,lon:31.2357,era:"Patriarchs and Exodus"},
{n:"Mount Sinai (traditional location)",c:"Modern Egypt",e:"The traditional site associated with the giving of the Law to Moses; the exact mountain location is debated.",r:"Exodus 19–20;  Deuteronomy 5",lat:28.5395,lon:33.9750,era:"Exodus"},
{n:"Jericho",c:"Modern West Bank / Palestine",e:"A key city in the account of Israel's entry into the land.",r:"Joshua 2–6",lat:31.8713,lon:35.4444,era:"Conquest and settlement"},
{n:"Jerusalem",c:"Modern Israel / East Jerusalem",e:"The city of David, the Temple, Jesus' final week, crucifixion and resurrection proclamation; central to Acts.",r:"2 Samuel 5:6–10; 1 Kings 8; Luke 19–24; Acts 1–2",lat:31.7683,lon:35.2137,era:"Kingdom, Jesus and Church"},
{n:"Bethlehem",c:"Modern West Bank / Palestine",e:"The town associated with the birth of Jesus and the Davidic promise.",r:"Micah 5:2; Matthew 2:1–6; Luke 2:1–20",lat:31.7054,lon:35.2024,era:"Jesus"},
{n:"Nazareth",c:"Modern Israel",e:"The town where Jesus grew up and began his public ministry in Galilee.",r:"Matthew 2:19–23; Luke 4:16–30",lat:32.6996,lon:35.3035,era:"Jesus"},
{n:"Sea of Galilee",c:"Modern Israel",e:"The setting for Jesus' calling of disciples, teaching, healings and miracles.",r:"Matthew 4:18–22; Mark 4:35–41; John 6",lat:32.8191,lon:35.5906,era:"Jesus"},
{n:"Capernaum",c:"Modern Israel",e:"A major center of Jesus' Galilean ministry.",r:"Matthew 4:13; Mark 1:21–34",lat:32.8803,lon:35.5753,era:"Jesus"},
{n:"Caesarea Philippi",c:"Modern Golan Heights",e:"Near this region Peter confessed Jesus as the Messiah.",r:"Matthew 16:13–20; Mark 8:27–30",lat:33.2485,lon:35.6937,era:"Jesus"},
{n:"Samaria",c:"Modern West Bank / Palestine",e:"The historic northern kingdom's capital region; Jesus taught about true worship and crossed Samaritan territory.",r:"1 Kings 16:24; John 4:1–42; Acts 8:4–25",lat:32.2767,lon:35.1900,era:"Kings and Early Church"},
{n:"Damascus",c:"Modern Syria",e:"Saul encountered the risen Jesus on the way to Damascus and became Paul.",r:"Acts 9:1–25; 22:6–16",lat:33.5138,lon:36.2765,era:"Early Church"},
{n:"Antioch",c:"Modern Türkiye",e:"A major sending church; disciples were first called Christians here.",r:"Acts 11:19–26; 13:1–3",lat:36.2021,lon:36.1600,era:"Paul's missions"},
{n:"Tarsus",c:"Modern Türkiye",e:"Paul's hometown in Cilicia.",r:"Acts 9:11; 21:39; 22:3",lat:36.9167,lon:34.8950,era:"Paul's missions"},
{n:"Ephesus",c:"Modern Türkiye",e:"Paul taught here; Ephesus is also one of the seven churches addressed in Revelation.",r:"Acts 19; Ephesians 1:1; Revelation 2:1–7",lat:37.9497,lon:27.3639,era:"Paul and Revelation"},
{n:"Philippi",c:"Modern Greece",e:"The first recorded European church founded by Paul; Lydia and the jailer feature in Acts.",r:"Acts 16:11–40; Philippians 1:1",lat:41.0135,lon:24.2866,era:"Paul's missions"},
{n:"Thessalonica",c:"Modern Greece",e:"An early church received Paul's letters.",r:"Acts 17:1–9; 1 Thessalonians 1:1",lat:40.6401,lon:22.9444,era:"Paul's missions"},
{n:"Athens",c:"Modern Greece",e:"Paul spoke about the Creator to philosophers at the Areopagus.",r:"Acts 17:16–34",lat:37.9838,lon:23.7275,era:"Paul's missions"},
{n:"Corinth",c:"Modern Greece",e:"Paul ministered here and wrote letters to the church.",r:"Acts 18:1–18; 1 Corinthians 1:2",lat:37.9386,lon:22.9322,era:"Paul's missions"},
{n:"Rome",c:"Modern Italy",e:"The imperial capital; Acts ends with Paul preaching under guard in Rome.",r:"Acts 28:14–31; Romans 1:7",lat:41.9028,lon:12.4964,era:"Paul's missions"},
{n:"Patmos",c:"Modern Greece",e:"The island where John received the visions recorded in Revelation.",r:"Revelation 1:9–11",lat:37.3089,lon:26.5475,era:"Revelation"},
{n:"Smyrna",c:"Modern Türkiye",e:"One of the seven churches addressed by the risen Christ.",r:"Revelation 2:8–11",lat:38.4237,lon:27.1428,era:"Seven Churches"},
{n:"Pergamum",c:"Modern Türkiye",e:"One of the seven churches addressed in Revelation.",r:"Revelation 2:12–17",lat:39.1310,lon:27.1840,era:"Seven Churches"},
{n:"Thyatira",c:"Modern Türkiye",e:"One of the seven churches addressed in Revelation.",r:"Revelation 2:18–29",lat:38.9191,lon:27.8370,era:"Seven Churches"},
{n:"Sardis",c:"Modern Türkiye",e:"One of the seven churches addressed in Revelation.",r:"Revelation 3:1–6",lat:38.4880,lon:28.0400,era:"Seven Churches"},
{n:"Philadelphia",c:"Modern Türkiye",e:"One of the seven churches addressed in Revelation.",r:"Revelation 3:7–13",lat:38.3530,lon:28.5170,era:"Seven Churches"},
{n:"Laodicea",c:"Modern Türkiye",e:"One of the seven churches addressed in Revelation.",r:"Revelation 3:14–22",lat:37.8340,lon:29.1080,era:"Seven Churches"}
];
let map,imagery,street,rotation=0,selected=locations[0];
const el=id=>document.getElementById(id);
function setPlace(p){selected=p;el("explorerPlaceTitle").textContent=p.n;el("explorerPlaceMeta").textContent=p.c+" • "+p.era;el("explorerPlaceStory").textContent=p.e;el("explorerPlaceRefs").textContent="Scripture: "+p.r;el("explorerGoogleMaps").onclick=()=>window.open("https://www.google.com/maps/@"+p.lat+","+p.lon+",8z/data=!3m1!1e3","_blank","noopener");el("explorerGoogleEarth").onclick=()=>window.open("https://earth.google.com/web/search/"+encodeURIComponent(p.n+", "+p.c)+"/@"+p.lat+","+p.lon+",1200a,5000d,35y,0h,0t,0r","_blank","noopener");if(map)map.setView([p.lat,p.lon],Math.max(map.getZoom(),6));}
function init(){if(!window.L||!el("bibleExplorerMap")||map)return;map=L.map("bibleExplorerMap",{rotate:true, touchRotate:true, bearing:0, zoomControl:true}).setView([31.5,35.3],5);imagery=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"Satellite imagery © Esri, Maxar, Earthstar Geographics"});street=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"});imagery.addTo(map);locations.forEach(p=>L.marker([p.lat,p.lon]).addTo(map).bindPopup("<b>"+p.n+"</b><br>"+p.c+"<br>"+p.r).on("click",()=>setPlace(p)));el("explorerSatellite").onclick=()=>{if(map.hasLayer(street))map.removeLayer(street);imagery.addTo(map);};el("explorerStreets").onclick=()=>{if(map.hasLayer(imagery))map.removeLayer(imagery);street.addTo(map);};el("explorerRotate").onclick=()=>{rotation=(rotation+30)%360;if(typeof map.setBearing==="function")map.setBearing(rotation);else alert("Rotation is not supported by this browser's map engine. Open Google Earth 3D for camera rotation.");};el("explorerReset").onclick=()=>{rotation=0;if(typeof map.setBearing==="function")map.setBearing(0);map.setView([31.5,35.3],5);};setPlace(selected);setTimeout(()=>map.invalidateSize(),300);}
document.querySelectorAll('[data-tab="bible-explorer"]').forEach(b=>b.addEventListener("click",()=>setTimeout(init,100)));
window.addEventListener("load",()=>{if(el("bible-explorer")?.classList.contains("active"))init();});
window.DMCBibleExplorer={init,locations};
})();