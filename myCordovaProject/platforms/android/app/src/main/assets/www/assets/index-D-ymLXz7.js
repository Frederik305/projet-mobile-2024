function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/GLTFLoader-Lm1hKXOz.js","assets/three.module-CwjCRhry.js","assets/index-BVBvlU2g.js","assets/_commonjsHelpers-CqkleIqs.js","assets/nipplejs-PhMyn1IT.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();class y{constructor(e,t,s,i,n,o,d,a,l,f,g,c){this.id=e,this.name=t,this.model=s,this.acceleration=i,this.baseMaxSpeed=n,this.weight=o,this.brakePower=d,this.maneuverability=a,this.rotation=l,this.cameraDistance=f,this.cameraRotationY=g,this.cameraRotationX=c}}class E{constructor(){this.cars=[{id:0,name:"Muscle",model:"Muscle.glb",acceleration:1.5,baseMaxSpeed:50,weight:1e3,brakePower:1,maneuverability:20,rotation:.01,cameraDistance:800,cameraRotationY:400,cameraRotationX:0},{id:1,name:"Sedan",model:"Sedan.glb",acceleration:2,baseMaxSpeed:50,weight:1e3,brakePower:1,maneuverability:10,rotation:.01,cameraDistance:800,cameraRotationY:400,cameraRotationX:0},{id:2,name:"Mazda rx7",model:"mazda_rx7_stylised.glb",acceleration:1.1,baseMaxSpeed:50,weight:1e3,brakePower:1,maneuverability:10,rotation:.03,cameraDistance:800,cameraRotationY:400,cameraRotationX:0}]}getCars(){for(let e in this.cars){let t=new y(this.cars[e].id,this.cars[e].name,this.cars[e].model,this.cars[e].acceleration,this.cars[e].baseMaxSpeed,this.cars[e].weight,this.cars[e].brakePower,this.cars[e].maneuverability,this.cars[e].rotation,this.cars[e].cameraDistance,this.cars[e].cameraRotationY,this.cars[e].cameraRotationX);this.cars[t.id]=t}return console.log(this.cars),this.cars}}class w{constructor(){this.html=document.getElementById("html-vue-player").innerHTML,this.displayPlayer=null}initializePlayer(e){this.displayPlayer=e}afficher(){document.getElementsByTagName("body")[0].innerHTML=this.html,this.fileInput=document.getElementById("fileInput"),this.photoPlayer=document.getElementById("output"),this.fileInput.addEventListener("change",this.handleFileSelect.bind(this))}handleFileSelect(e){const t=e.target.files;if(t.length>0){const s=t[0],i=new FileReader;i.onload=n=>{const o=n.target.result;console.log(o),this.photoPlayer.style.backgroundImage=`url('${o}')`},i.readAsDataURL(s)}}}const b="modulepreload",P=function(r){return"/"+r},p={},h=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){const n=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),d=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.all(t.map(a=>{if(a=P(a),a in p)return;p[a]=!0;const l=a.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(!!s)for(let m=n.length-1;m>=0;m--){const u=n[m];if(u.href===a&&(!l||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${f}`))return;const c=document.createElement("link");if(c.rel=l?"stylesheet":b,l||(c.as="script",c.crossOrigin=""),c.href=a,d&&c.setAttribute("nonce",d),document.head.appendChild(c),l)return new Promise((m,u)=>{c.addEventListener("load",m),c.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${a}`)))})}))}return i.then(()=>e()).catch(n=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n})};class T{constructor(){this.html=document.getElementById("html-vue-home-page").innerHTML,this.displayHomePage=null,this.selectedCar=0,this.onWindowResize=this.onWindowResize.bind(this),window.addEventListener("resize",this.onWindowResize,!1)}initializeHomePage(e){this.displayHomePage=e}afficher(){document.getElementsByTagName("body")[0].innerHTML=this.html,document.getElementById("name").innerText="Name: "+this.displayHomePage[this.selectedCar].name,document.getElementById("acceleration").innerText="Acceleration: "+this.displayHomePage[this.selectedCar].acceleration,document.getElementById("maneuverability").innerText="Maniability: "+this.displayHomePage[this.selectedCar].maneuverability,document.getElementById("brakePower").innerText="Brake: "+this.displayHomePage[this.selectedCar].brakePower,document.getElementById("btn-start").href=`#Game/${this.selectedCar}`}async setup(){try{const[e,{GLTFLoader:t},{default:s},i]=await Promise.all([h(()=>import("./three.module-CwjCRhry.js"),__vite__mapDeps([])),h(()=>import("./GLTFLoader-Lm1hKXOz.js"),__vite__mapDeps([0,1])),h(()=>import("./tween.esm-BHSu4PDy.js"),__vite__mapDeps([])),h(()=>import("./index-BVBvlU2g.js").then(n=>n.i),__vite__mapDeps([2,3]))]);this.THREE=e,this.GLTFLoader=t,this.TWEEN=s,this.ZingTouch=i,this.scene=new this.THREE.Scene,this.camera=new this.THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,1e5),this.renderer=new this.THREE.WebGLRenderer,this.setupScene()}catch(e){throw console.error("Error setting up Three.js:",e),e}}setupScene(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.renderer.setSize(e,t),document.body.appendChild(this.renderer.domElement);const s=this.createGradientBackground();this.scene.background=s,this.addLights()}createGradientBackground(){const e=document.createElement("canvas"),t=e.getContext("2d"),s=t.createLinearGradient(0,0,0,window.innerHeight);return t.fillStyle=s,t.fillRect(0,0,e.width,e.height),new this.THREE.CanvasTexture(e)}addLights(){const e=new this.THREE.AmbientLight(16777215,2),t=new this.THREE.DirectionalLight(16777215,7);t.position.set(10,20,-10),this.scene.add(e,t)}loader(){new this.GLTFLoader().load("HomeView.glb",t=>{const s=t.scene;s.position.set(0,0,0),s.rotateY(Math.PI),this.scene.add(s)},void 0,t=>{console.error(t)})}setLinkSelectedCar(){const e=this.selectedCar;this.updateLinkSelectedCar(e)}updateLinkSelectedCar(e){document.getElementById("name").innerText="Name: "+this.displayHomePage[e].name,document.getElementById("acceleration").innerText="Acceleration: "+this.displayHomePage[e].acceleration,document.getElementById("maneuverability").innerText="Maniability: "+this.displayHomePage[e].maneuverability,document.getElementById("brakePower").innerText="Brake: "+this.displayHomePage[e].brakePower,document.getElementById("btn-start").href=`#Game/${e}`}appendSceneToDiv(){let e=document.getElementById("threejs-container");e?e.appendChild(this.renderer.domElement):console.error("Container not found")}catchSwipeEvent(){var e=document.getElementById("swipeCatcher"),t=new this.ZingTouch.Region(e);let s=this.selectedCar;t.bind(e,"swipe",i=>{if(console.log(i.detail),console.log(i.detail.data[0].currentDirection),i.detail.data[0].currentDirection<=225&&i.detail.data[0].currentDirection>=135)if(console.log("left"),s<=0){console.log("premiere voiture");return}else s--,console.log(s),this.updateLinkSelectedCar(s);else(i.detail.data[0].currentDirection>=315||i.detail.data[0].currentDirection<=45)&&(console.log("right"),s++,console.log(s),this.updateLinkSelectedCar(s))})}setCameraPosition(){this.camera.position.set(400,400,-800),this.camera.lookAt(0,0,0)}animate(){requestAnimationFrame(()=>this.animate()),this.TWEEN.update(),this.renderer.render(this.scene,this.camera)}startAnimation(){this.animate()}onWindowResize(){if(this.camera&&this.renderer){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}}init(){this.setupScene(),this.startAnimation(),this.setLinkSelectedCar(),this.setCameraPosition(),this.loader(),this.appendSceneToDiv(),this.catchSwipeEvent()}}class v{constructor(){this.html=document.getElementById("html-vue-game").innerHTML,this.scene=null,this.camera=null,this.renderer=null,this.THREE=null,this.GLTFLoader=null,this.TWEEN=null,this.nipplejs=null,this.car,this.carModel,this.setup=this.setup.bind(this),this.tickInterval=1e3/120,this.lastTick=0,this.frameCount=0,this.fpsCounter=document.createElement("div"),this.button=document.createElement("button"),this.isPaused=!1,this.lastFpsUpdate=Date.now(),this.onWindowResize=this.onWindowResize.bind(this),window.addEventListener("resize",this.onWindowResize,!1)}initialiserCar(e){this.car=e}afficher(){document.getElementsByTagName("body")[0].innerHTML=this.html,document.body.appendChild(this.fpsCounter),document.body.appendChild(this.button),this.roadInstances=[],this.maxRoadInstances=8,this.nextRoadPositionCounter=0,this.distanceAhead=-1e3,this.fpsCounter.style.position="absolute",this.fpsCounter.style.top="10px",this.fpsCounter.style.left="10px",this.fpsCounter.style.color="white",this.fpsCounter.style.fontFamily="Arial, sans-serif",this.button.style.position="absolute",this.button.style.top="10px",this.button.style.right="10px",this.button.style.color="white",this.button.style.fontFamily="Arial, sans-serif",this.button.style.height="20px",this.button.style.width="20px",this.button.style.backgroundColor="rgb(250,250,250)",this.button.style.borderColor="rgb(250,250,250)",this.button.id="Pause"}async setup(){try{const[e,{GLTFLoader:t},{default:s},i]=await Promise.all([h(()=>import("./three.module-CwjCRhry.js"),__vite__mapDeps([])),h(()=>import("./GLTFLoader-Lm1hKXOz.js"),__vite__mapDeps([0,1])),h(()=>import("./tween.esm-BHSu4PDy.js"),__vite__mapDeps([])),h(()=>import("./nipplejs-PhMyn1IT.js").then(n=>n.n),__vite__mapDeps([4,3]))]);this.THREE=e,this.GLTFLoader=t,this.TWEEN=s,this.nipplejs=i,this.scene=new this.THREE.Scene,this.camera=new this.THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,1e5),this.renderer=new this.THREE.WebGLRenderer,this.setupScene()}catch(e){throw console.error("Error setting up Three.js:",e),e}}setupScene(){this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.scene.background=new this.THREE.Color(11063551),this.scene.fog=new this.THREE.FogExp2(12575709,12e-5)}addStart(){new this.GLTFLoader().load("rooad.glb",t=>{const s=t.scene;this.scene.add(s)},void 0,t=>{console.error(t)})}async loadRoad(){return new Promise((e,t)=>{new this.GLTFLoader().load("untitled.glb",i=>{const n=i.scene;e(n)},void 0,i=>{t(i)})})}async addRoad(){for(;this.roadInstances.length<this.maxRoadInstances;)try{const e=await this.loadRoad(),t=this.calculateRoadLength(e);this.nextRoadPositionCounter++;let s=this.nextRoadPositionCounter*-t;e.position.z=s,this.scene.add(e),this.roadInstances.push(e)}catch(e){console.error(e)}}calculateRoadLength(e){return new this.THREE.Box3().setFromObject(e).getSize(new this.THREE.Vector3).z}getTotalRoadLength(){let e=0;for(const t of this.roadInstances){const i=new this.THREE.Box3().setFromObject(t).getSize(new this.THREE.Vector3);e+=i.z}return e}moveRoadBehind(){if(this.roadInstances.length>0&&this.carModel&&this.carModel.position.z+7e3<this.roadInstances[0].position.z){const e=this.getTotalRoadLength();this.roadInstances[0].position.z-=e,this.roadInstances.push(this.roadInstances.shift())}}addLights(){const e=new this.THREE.AmbientLight(16777215,3),t=new this.THREE.DirectionalLight(16777215,5);t.position.set(1,1,1),this.scene.add(e,t)}loadCar(){return new Promise((e,t)=>{new this.GLTFLoader().load(this.car.model,i=>{this.carModel=i.scene,this.carModel.position.set(0,1,0),this.carModel.rotateY(Math.PI),this.carModel.scale.set(.8,.8,.8),this.scene.add(this.carModel),e()},void 0,i=>{console.error(i),t(i)})})}mouvements(){let e;const t=this.car.rotation,s=document.getElementById("joystick-container"),i=this.nipplejs.create({zone:s,mode:"dynamic",color:"yellow"});i.on("move",(n,o)=>{if(o&&o.direction){const d=o.direction.x;d==="right"?e&&e>o.distance?this.carModel.rotation.y>0&&(this.carModel.rotation.y-=t):this.carModel.rotation.y<.3&&(this.carModel.rotation.y+=t*(o.distance/50)):d==="left"&&(e&&e>o.distance?this.carModel.rotation.y<0&&(this.carModel.rotation.y+=t):this.carModel.rotation.y>-.3&&(this.carModel.rotation.y-=t*(o.distance/50))),e=o.distance}}),i.on("end",()=>{const n=()=>{Math.abs(this.carModel.rotation.y)>.01?(this.carModel.rotation.y>0?this.carModel.rotation.y-=t:this.carModel.rotation.y<0&&(this.carModel.rotation.y+=t),requestAnimationFrame(n)):this.carModel.rotation.y=0};n()})}moveCarForward(){const e=this.car.baseMaxSpeed,t=this.carModel.rotation.y,s=Math.sin(t)*e,i=-Math.cos(t)*e;this.carModel.position.x+=s,this.carModel.position.z+=i}setCameraPosition(){const e=new this.THREE.Vector3(this.car.cameraRotationX,this.car.cameraRotationY,this.car.cameraDistance),t=new this.THREE.Vector3;t.copy(this.carModel.position).add(e),this.camera.position.copy(t),this.camera.lookAt(this.carModel.position),this.camera.rotation.x-=-.2}async update(){if(!this.isPaused){this.frameCount++;const e=Date.now(),t=e-this.lastTick,s=e-this.lastFpsUpdate;if(s>=1e3){const i=Math.round(this.frameCount*1e3/s);this.fpsCounter.textContent=`FPS: ${i}`,this.frameCount=0,this.lastFpsUpdate=e}if(t>=this.tickInterval){this.TWEEN.update();try{this.moveRoadBehind(),this.moveCarForward(),this.setCameraPosition(),this.renderer.render(this.scene,this.camera)}catch(i){console.error("Error in game loop:",i)}this.lastTick=e-t%this.tickInterval}}}animate(){requestAnimationFrame(()=>{this.update(),this.animate()})}changePauseState(){this.isPaused=!this.isPaused,console.log(this.isPaused)}checkButtonClick(){document.getElementById("Pause").addEventListener("pointerdown",()=>{this.changePauseState()})}startGameLoop(){this.animate()}onWindowResize(){if(this.camera&&this.renderer){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.renderer.render(this.scene,this.camera)}}async init(){this.setupScene(),await this.loadCar(),this.addStart(),this.addLights(),this.mouvements(),this.checkButtonClick(),await this.addRoad(),this.startGameLoop()}}class R{constructor(){this.html=document.getElementById("html-vue-end-screen").innerHTML}afficher(){console.log("afficher")}}class L{constructor(e,t,s,i,n,o){this.window=e,this.carDAO=t,this.vuePlayer=o,this.vueHomePage=s,this.vueGame=i,this.vueEndScreen=n,this.window.addEventListener("hashchange",()=>this.naviger()),this.naviger()}naviger(){let e=window.location.hash;if(!e)this.vuePlayer.initializePlayer(),this.vuePlayer.afficher();else if(e.match(/^#HomePage/))this.vueHomePage.initializeHomePage(this.carDAO.getCars()),this.vueHomePage.afficher(),this.vueHomePage.setup().then(()=>{this.vueHomePage.init()}).catch(t=>console.error(t));else if(e.match(/^#Game\/([0-9]+)/)){let s=e.match(/^#Game\/([0-9]+)/)[1];this.vueGame.initialiserCar(this.carDAO.getCars()[s]),this.vueGame.afficher(),this.vueGame.setup().then(()=>{this.vueGame.init()}).catch(i=>console.error(i))}else e.match(/^#EndScreen/)&&this.vueEndScreen.afficher()}}new L(window,new E,new T,new v,new R,new w);
