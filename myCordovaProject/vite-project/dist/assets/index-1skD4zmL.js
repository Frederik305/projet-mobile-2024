function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/GLTFLoader-Lm1hKXOz.js","assets/three.module-CwjCRhry.js","assets/index-BVBvlU2g.js","assets/_commonjsHelpers-CqkleIqs.js","assets/nipplejs-PhMyn1IT.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class w{constructor(e,t,i,s,o,a,r,n,c,g,p,l,d,m){this.id=e,this.name=t,this.model=i,this.level=s,this.price=o,this.acceleration=a,this.baseMaxSpeed=r,this.weight=n,this.brakePower=c,this.maneuverability=g,this.rotation=p,this.cameraDistance=l,this.cameraRotationY=d,this.cameraRotationX=m}}class M{constructor(){this.cars=[{id:0,name:"Muscle",model:"Muscle.glb",level:0,price:5e3,acceleration:.8,baseMaxSpeed:40,weight:1e3,brakePower:1,maneuverability:20,rotation:.01,cameraDistance:900,cameraRotationY:500,cameraRotationX:0},{id:1,name:"Sedan",model:"Sedan.glb",level:5,price:5e3,acceleration:.6,baseMaxSpeed:50,weight:1e3,brakePower:1,maneuverability:10,rotation:.01,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:2,name:"Police car",model:"Police Muscle.glb",price:5e3,level:10,acceleration:.9,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.009,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:3,name:"Gino",model:"Muscle 2.glb",level:15,price:5e3,acceleration:.9,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.008,cameraDistance:1e3,cameraRotationY:400,cameraRotationX:0},{id:4,name:"Hatchback",model:"Hatchback.glb",level:0,price:5e3,acceleration:.9,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.009,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:5,name:"Sport",model:"Sports.glb",level:0,price:5e3,acceleration:1,baseMaxSpeed:100,weight:1e3,brakePower:1,maneuverability:.02,rotation:.01,cameraDistance:900,cameraRotationY:400,cameraRotationX:0},{id:6,name:"Pickup",model:"Pickup.glb",level:0,price:5e3,acceleration:.8,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.007,cameraDistance:1100,cameraRotationY:550,cameraRotationX:0},{id:7,name:"Taxi",model:"Taxi.glb",level:0,price:5e3,acceleration:1,baseMaxSpeed:30,weight:1e3,brakePower:1,maneuverability:.02,rotation:.0095,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:8,name:"Van",model:"Van.glb",level:0,price:5e3,acceleration:.5,baseMaxSpeed:60,weight:1e3,brakePower:1,maneuverability:.02,rotation:.006,cameraDistance:1100,cameraRotationY:550,cameraRotationX:0},{id:9,name:"SUV",model:"SUV.glb",level:0,price:5e3,acceleration:.6,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.005,cameraDistance:1e3,cameraRotationY:400,cameraRotationX:0}]}getCars(){for(let e in this.cars){let t=new w(this.cars[e].id,this.cars[e].name,this.cars[e].model,this.cars[e].level,this.cars[e].price,this.cars[e].acceleration,this.cars[e].baseMaxSpeed,this.cars[e].weight,this.cars[e].brakePower,this.cars[e].maneuverability,this.cars[e].rotation,this.cars[e].cameraDistance,this.cars[e].cameraRotationY,this.cars[e].cameraRotationX);this.cars[t.id]=t}return console.log(this.cars),this.cars}}class E{constructor(e,t,i,s,o,a,r){this.id=e,this.username=t,this.highscore=i,this.picture=s,this.level=o,this.cash=a,this.carsUnlocked=r}}class b{constructor(){this.html=document.getElementById("html-vue-player").innerHTML,this.actionModifierPlayer=null}initializeActionModifierPlayer(e){this.actionModifierPlayer=e}afficher(e){document.getElementsByTagName("body")[0].innerHTML=this.html,this.fileInput=document.getElementById("fileInput"),this.photoPlayer=document.getElementById("output"),this.photoPlayer.src=e.picture,this.fileInput.addEventListener("change",this.handleFileSelect.bind(this)),document.getElementById("username").value=e.username,document.getElementById("modifier-player").addEventListener("click",t=>{this.enregistrer(e)})}handleFileSelect(e){const t=e.target.files;if(t.length>0){const i=t[0],s=new FileReader;s.onload=o=>{const a=o.target.result;this.photoPlayer.src=`${a}`},s.readAsDataURL(i)}}enregistrer(e){let t=document.getElementById("username").value,i=document.getElementById("output").src;this.actionModifierPlayer(new E(e.id,t,e.highscore,i,e.level,e.cash,e.carsUnlocked))}}const P="modulepreload",v=function(h){return"/"+h},y={},u=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),r=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.all(t.map(n=>{if(n=v(n),n in y)return;y[n]=!0;const c=n.endsWith(".css"),g=c?'[rel="stylesheet"]':"";if(!!i)for(let d=o.length-1;d>=0;d--){const m=o[d];if(m.href===n&&(!c||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${g}`))return;const l=document.createElement("link");if(l.rel=c?"stylesheet":P,c||(l.as="script",l.crossOrigin=""),l.href=n,r&&l.setAttribute("nonce",r),document.head.appendChild(l),c)return new Promise((d,m)=>{l.addEventListener("load",d),l.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${n}`)))})}))}return s.then(()=>e()).catch(o=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o})};class I{constructor(){this.html=document.getElementById("html-vue-home-page").innerHTML,this.carList=null,this.player=null,this.selectedCar=0,this.carPositions=[],this.isAnimating=!1,this.onWindowResize=this.onWindowResize.bind(this),this.backgroundMusic=new Audio("music/HomePageMusic.mp3"),window.addEventListener("resize",this.onWindowResize,!1)}initializeHomePage(e,t){this.carList=e,this.player=t}afficher(){document.getElementsByTagName("body")[0].innerHTML=this.html,document.getElementById("btn-start").href=`#Game/${this.selectedCar}`,document.getElementById("username-player-home-page").innerHTML=this.player.username,document.getElementById("photo-player-home-page").src=this.player.picture,document.getElementById("high-score-player").innerHTML+=this.player.highscore}checkCarsOwned(){this.player.carsUnlocked.includes(this.selectedCar)?console.log("car already owned",this.selectedCar):console.log("car not owned",this.selectedCar)}addMusic(){this.backgroundMusic.loop=!0,this.backgroundMusic.volume=.05,this.backgroundMusic.load(),this.backgroundMusic.play()}removeMusic(){this.backgroundMusic.pause(),this.backgroundMusic.currentTime=0}loadTexture(){this.player.carsUnlocked.includes(this.selectedCar)&&(console.log(this.carModel),new this.THREE.TextureLoader().load("NotOwned.png",t=>{this.carModel.traverse(i=>{i.isMesh&&(i.material.map=t,i.material.side=this.THREE.FrontSide,i.material.transparent=!0,i.material.opacity=.5,i.material.alphaTest=.5,i.material.needsUpdate=!0)})}))}async setup(){try{const[e,{GLTFLoader:t},{default:i},s,o]=await Promise.all([u(()=>import("./three.module-CwjCRhry.js"),__vite__mapDeps([])),u(()=>import("./GLTFLoader-Lm1hKXOz.js"),__vite__mapDeps([0,1])),u(()=>import("./tween.esm-BHSu4PDy.js"),__vite__mapDeps([])),u(()=>import("./index-BVBvlU2g.js").then(a=>a.i),__vite__mapDeps([2,3])),u(()=>import("./cannon-es-B7qhRxk4.js"),__vite__mapDeps([]))]);this.THREE=e,this.GLTFLoader=t,this.TWEEN=i,this.ZingTouch=s,this.CANNON=o,this.scene=new this.THREE.Scene,this.camera=new this.THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,1e5),this.renderer=new this.THREE.WebGLRenderer,this.setupScene()}catch(e){throw console.error("Error setting up Three.js:",e),e}}setupScene(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.renderer.setSize(e,t),document.body.appendChild(this.renderer.domElement);const i=this.createGradientBackground();this.scene.background=i,this.addLights()}createGradientBackground(){const e=document.createElement("canvas"),t=e.getContext("2d"),i=t.createLinearGradient(0,0,0,window.innerHeight);return t.fillStyle=i,t.fillRect(0,0,e.width,e.height),new this.THREE.CanvasTexture(e)}addLights(){const e=new this.THREE.AmbientLight(16777215,2),t=new this.THREE.DirectionalLight(16777215,7);t.position.set(10,20,-10),this.scene.add(e,t)}async loader(){const e=new this.GLTFLoader;for(let t=0;t<this.carList.length;t++)try{const i=await new Promise((a,r)=>{e.load(this.carList[t].model,a,void 0,r)}),s=await new Promise((a,r)=>{e.load("Parking.glb",a,void 0,r)});this.carModel=i.scene,this.carModel.position.set(t*-400,0,0),this.carModel.rotateY(Math.PI),this.carPositions.push(this.carModel.position);const o=s.scene;o.position.set(t*-400,0,0),o.rotateY(Math.PI),this.scene.add(this.carModel),this.scene.add(o)}catch(i){console.error(i)}}setLinkSelectedCar(){this.updateLinkSelectedCar()}updateLinkSelectedCar(){let e=document.getElementById("displayBaseSpeed"),t=document.getElementById("displayAcceleration"),i=document.getElementById("displayManeuverability");e.style.width=this.carList[this.selectedCar].baseMaxSpeed+"px",t.style.width=this.carList[this.selectedCar].acceleration*100+"px",i.style.width=this.carList[this.selectedCar].rotation*5e3+"px",document.getElementById("name").innerText="Name: "+this.carList[this.selectedCar].name,document.getElementById("baseSpeed").innerText="Car Speed: ",document.getElementById("acceleration").innerText="Acceleration: ",document.getElementById("maneuverability").innerText="Maniability: ",document.getElementById("btn-start").href=`#Game/${this.selectedCar}`}appendSceneToDiv(){let e=document.getElementById("threejs-container");e?e.appendChild(this.renderer.domElement):console.error("Container not found")}catchSwipeEvent(){var e=document.getElementById("swipeCatcher"),t=new this.ZingTouch.Region(e);t.bind(e,"swipe",i=>{if(i.detail.data[0].currentDirection<=270&&i.detail.data[0].currentDirection>=90&&!this.isAnimating&&this.selectedCar+1<this.carList.length&&(this.selectedCar++,this.updateLinkSelectedCar(),this.moveCameraPositionRight(),this.checkCarsOwned()),(i.detail.data[0].currentDirection>=270||i.detail.data[0].currentDirection<=90)&&!this.isAnimating){if(this.selectedCar<=0)return;this.selectedCar--,this.updateLinkSelectedCar(),this.moveCameraPositionLeft(),this.checkCarsOwned()}})}setCameraPosition(){this.camera.position.set(this.carPositions[this.selectedCar].x+400,300,-800),console.log(this.carPositions[this.selectedCar].x),this.camera.lookAt(this.carPositions[this.selectedCar].clone().add(new this.THREE.Vector3(0,0,-100)))}moveCameraPositionLeft(){this.isAnimating=!0;let e=this.camera.position.x+400,t={x:this.camera.position.x};new this.TWEEN.Tween(t).to({x:e},500).easing(this.TWEEN.Easing.Quartic.Out).onUpdate(()=>{this.camera.position.x=t.x}).onComplete(()=>{this.isAnimating=!1}).start()}moveCameraPositionRight(){this.isAnimating=!0;let e=this.camera.position.x-400,t={x:this.camera.position.x};new this.TWEEN.Tween(t).to({x:e},500).easing(this.TWEEN.Easing.Quartic.Out).onUpdate(()=>{this.camera.position.x=t.x}).onComplete(()=>{this.isAnimating=!1}).start()}animate(){requestAnimationFrame(()=>this.animate()),this.TWEEN.update(),this.renderer.render(this.scene,this.camera)}startAnimation(){this.animate()}onWindowResize(){if(this.camera&&this.renderer){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}}async init(){this.startAnimation(),this.setLinkSelectedCar(),await this.loader(),this.setCameraPosition(),this.appendSceneToDiv(),this.catchSwipeEvent(),this.checkCarsOwned()}}class R{constructor(){this.html=document.getElementById("html-vue-game").innerHTML,this.scene=null,this.camera=null,this.renderer=null,this.THREE=null,this.GLTFLoader=null,this.TWEEN=null,this.nipplejs=null,this.car,this.carModel,this.setup=this.setup.bind(this),this.gotoleft=!1,this.gotoright=!1,this.isLeft=!1,this.isRight=!1,this.tickInterval=1e3/120,this.lastTick=0,this.frameCount=0,this.isPaused=!1,this.lastFpsUpdate=Date.now(),this.totalLength=0,this.moveCarWorker=new Worker("vue/worker/moveCarWorker.js"),this.moveCarWorker.onmessage=e=>{const{positionX:t,positionZ:i}=e.data;this.carModel.position.x=t,this.carModel.position.z=i},this.onWindowResize=this.onWindowResize.bind(this),window.addEventListener("resize",this.onWindowResize,!1)}initialiserCar(e){this.car=e}getGameScore(){return(Math.abs(this.carModel.position.z)*this.score/1e4).toFixed(0)}afficher(){document.getElementsByTagName("body")[0].innerHTML=this.html,document.getElementById("Score").style.display="flex",document.getElementById("Pause").style.display="block",this.score=0,this.carInstances=[],this.roadInstances=[],this.maxRoadInstances=8,this.nextRoadPositionCounter=0,this.distanceAhead=-1e3,this.data=null,this.speed=this.car.baseMaxSpeed}async setup(){try{const[e,{GLTFLoader:t},{default:i},s]=await Promise.all([u(()=>import("./three.module-CwjCRhry.js"),__vite__mapDeps([])),u(()=>import("./GLTFLoader-Lm1hKXOz.js"),__vite__mapDeps([0,1])),u(()=>import("./tween.esm-BHSu4PDy.js"),__vite__mapDeps([])),u(()=>import("./nipplejs-PhMyn1IT.js").then(o=>o.n),__vite__mapDeps([4,3]))]);this.backgroundMusic,this.THREE=e,this.GLTFLoader=t,this.TWEEN=i,this.nipplejs=s,this.scene=new this.THREE.Scene,this.camera=new this.THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,1e5),this.renderer=new this.THREE.WebGLRenderer,this.renderer.setSize(window.innerWidth,window.innerHeight),this.setupScene()}catch(e){throw console.error("Error setting up Three.js:",e),e}}addMusic(){this.backgroundMusic=new Audio("music/GameMusic.mp3"),this.backgroundMusic.loop=!0,this.backgroundMusic.volume=.05,this.backgroundMusic.load(),this.backgroundMusic.play()}removeMusic(){this.backgroundMusic.pause(),this.backgroundMusic.currentTime=0}pauseMusic(){this.backgroundMusic.pause()}playMusic(){this.backgroundMusic.play()}setupScene(){document.body.appendChild(this.renderer.domElement),new this.THREE.TextureLoader;const e=this.createGradientBackground();this.scene.background=e,this.scene.fog=new this.THREE.FogExp2(14205695,5e-5)}createGradientBackground(){const e=document.createElement("canvas");e.width=window.innerWidth,e.height=window.innerHeight;const t=e.getContext("2d"),i=t.createLinearGradient(0,0,0,window.innerHeight);return i.addColorStop(0,"#983275"),i.addColorStop(.1,"#983275"),i.addColorStop(.5,"#FED800"),i.addColorStop(1,"#FED800"),t.fillStyle=i,t.fillRect(0,0,e.width,e.height),new this.THREE.CanvasTexture(e)}addStart(){new this.GLTFLoader().load("rooad.glb",t=>{const i=t.scene;this.scene.add(i)},void 0,t=>{console.error(t)})}async loadRoad(){return new Promise((e,t)=>{new this.GLTFLoader().load("Road+Night.glb",s=>{const o=s.scene;e(o)},void 0,s=>{t(s)})})}async addRoad(){for(;this.roadInstances.length<this.maxRoadInstances;)try{const e=await this.loadRoad(),t=this.calculateRoadLength(e);this.nextRoadPositionCounter++;let i=this.nextRoadPositionCounter*-t;e.position.z=i,this.scene.add(e),this.roadInstances.push(e)}catch(e){console.error(e)}}calculateRoadLength(e){return new this.THREE.Box3().setFromObject(e).getSize(new this.THREE.Vector3).z}getTotalRoadLength(){for(const e of this.roadInstances){const i=new this.THREE.Box3().setFromObject(e).getSize(new this.THREE.Vector3);this.totalLength+=i.z}}moveRoadBehind(e,t,i){if(t.length>0&&e&&e.position.z+7e3<t[0].position.z){const s=this.totalLength;t[0].position.z-=s,t.push(t.shift()),this.carsGeneration(t,i)}}async loadCars(){const e=[{file:"Sedan.glb",weight:4},{file:"Police Muscle.glb",weight:2},{file:"Muscle 2.glb",weight:3},{file:"Limousine.glb",weight:1},{file:"Bus.glb",weight:2},{file:"Muscle.glb",weight:3},{file:"Firetruck.glb",weight:1},{file:"Hatchback.glb",weight:4},{file:"Ambulance.glb",weight:2},{file:"Sports.glb",weight:2}],t=12;for(;this.carInstances.length<t;){let i=0;for(let c=0;c<e.length;c++)i+=e[c].weight;const s=Math.random()*i;let o,a=0;for(let c=0;c<e.length;c++)if(a+=e[c].weight,s<=a){o=e[c].file;break}let n=(await this.loadModel(o)).scene;n.scale.set(1.5,1.5,1.5),n.position.z=1e4,this.scene.add(n),this.carInstances.push(n)}}loadModel(e){return new Promise((t,i)=>{new this.GLTFLoader().load(e,t,void 0,i)})}carsGeneration(e,t){function i(){let a=[0,0,1];for(let r=a.length-1;r>0;r--){const n=Math.floor(Math.random()*(r+1));[a[r],a[n]]=[a[n],a[r]]}return a}function s(a){for(let n=0;n<a.length;n++)a[n]===0&&Math.floor(Math.random()*100)<20&&(a[n]=1);for(let n=0;n<3;n++)if(a[n]==0){let c=n===0?-600:n===1?0:600;const g=Math.random()*100-50;c+=g;const p=Math.random()*2e3-1e3,l=e[3].position.z+p;t[0].position.x=c,t[0].position.z=l,t.push(t.shift())}}let o=i();s(o)}addLights(){const e=new this.THREE.AmbientLight(16777215,3),t=new this.THREE.DirectionalLight(16777215,5);t.position.set(1,1,1),this.scene.add(e,t)}loadCar(){return new Promise((e,t)=>{const i=this.car.model;this.loadModel(i).then(s=>{this.carModel=s.scene,this.carModel.position.set(0,1,0),this.carModel.rotateY(Math.PI),this.carModel.scale.set(1.2,1.2,1.2),this.scene.add(this.carModel),e()}).catch(s=>{console.error(s),t(s)})})}mouvements(){let e=0;const t=this.car.rotation,i=document.getElementById("joystick-container"),s=this.nipplejs.create({zone:i,mode:"dynamic",color:"yellow"});s.on("move",(o,a)=>{if(a&&a.direction){this.data=a;const r=a.direction.x;r==="right"?(this.isRight=!0,this.isLeft=!1,e&&e>a.distance?this.gotoright=!1:this.gotoright=!0):r==="left"&&(this.isRight=!1,this.isLeft=!0,e&&e>a.distance?this.gotoleft=!1:this.gotoleft=!0),e=a.distance}}),s.on("end",()=>{const o=()=>{this.gotoleft=!1,this.gotoright=!1,this.isLeft=!1,this.isRight=!1,Math.abs(this.carModel.rotation.y)>.01?(this.carModel.rotation.y>0?this.carModel.rotation.y-=t:this.carModel.rotation.y<0&&(this.carModel.rotation.y+=t),requestAnimationFrame(o)):this.carModel.rotation.y=0};o()})}moveCarForward(e){const t=e.rotation.y,i=Math.sin(t)*this.speed,s=-Math.cos(t)*this.speed;e.position.x<=800&&e.position.x>=-800&&(e.position.x+=i,e.position.x>800?e.position.x=800:e.position.x<-800&&(e.position.x=-800)),e.position.z+=s}setCameraPosition(e,t,i){const s=new this.THREE.Vector3(t.cameraRotationX,t.cameraRotationY,t.cameraDistance),o=new this.THREE.Vector3;o.copy(e.position).add(s),i.position.copy(o),i.lookAt(e.position),i.rotation.x-=-.2}async update(){if(!this.isPaused){this.frameCount++;const e=this.car.rotation,t=Date.now(),i=t-this.lastTick;if(i>=this.tickInterval){const s=this.carModel,o=this.car,a=this.camera,r=this.roadInstances,n=this.carInstances,c=this.scene;this.TWEEN.update();try{this.moveRoadBehind(s,r,n),this.moveCarForward(s),this.setCameraPosition(s,o,a),this.renderer.render(c,a)}catch(d){console.error("Error in game loop:",d)}let g=this.frameCount;g%5===0&&this.updateScore(),g%100===0&&this.speedIncrease(o),this.detectCollision(s,n)&&(this.shakeCamera(a),this.renderer.render(c,a),this.isPaused=!0,document.getElementById("joystick-container").style.display="none",document.getElementById("Pause").style.display="none",document.getElementById("Score").style.display="none",window.location.hash="EndScreen");let l=this.data;if(l){let d=this.gotoleft,m=this.gotoright,A=this.isRight,f=this.isLeft;A&&!m?s.rotation.y>e*(l.distance/50)&&(s.rotation.y-=e):A&&m?s.rotation.y<.3*(l.distance/50)&&(s.rotation.y+=e):f&&!d?s.rotation.y<e*(l.distance/50)&&(s.rotation.y+=e):f&&d&&s.rotation.y>-.3*(l.distance/50)&&(s.rotation.y-=e)}this.lastTick=t-i%this.tickInterval}}}updateScore(){if(!this.isPaused){this.score++;let e=this.getGameScore();document.getElementById("Score").innerHTML="SCORE: "+e}}speedIncrease(e){this.isPaused||(this.speed+=e.acceleration)}animate(){requestAnimationFrame(()=>{this.update(),this.animate()})}changePauseState(){this.isPaused=!this.isPaused,console.log(this.isPaused);const e=document.getElementById("Score"),t=document.getElementById("game-score-pause");this.isPaused?(this.pauseMusic(),document.getElementById("joystick-container").style.display="none",document.getElementById("Pause").style.display="none",document.getElementById("game-pause").style.display="flex",t.appendChild(e),e.style.backgroundColor="#444444d3"):(this.playMusic(),document.getElementById("game-pause").style.display="none",document.getElementById("Pause").style.display="block",document.getElementById("joystick-container").style.display="block",document.getElementById("container-score-pause").appendChild(e),e.style.backgroundColor="#49494977")}checkButtonClick(){document.getElementById("Pause").addEventListener("pointerdown",()=>{this.isPaused||this.changePauseState()}),document.getElementById("resume").addEventListener("pointerdown",()=>{this.isPaused&&this.changePauseState()}),document.getElementById("quit-btn").addEventListener("click",()=>{this.isPaused||this.changePauseState(),document.getElementById("game-pause").style.display="none"})}startGameLoop(){this.animate()}onWindowResize(){if(this.camera&&this.renderer){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.renderer.render(this.scene,this.camera)}}async init(){await this.loadCar(),this.addStart(),this.addLights(),this.mouvements(),this.checkButtonClick(),await this.addRoad(),this.getTotalRoadLength(),await this.loadCars(),this.startGameLoop(),this.isPaused=!1,this.addMusic()}detectCollision(e,t){const i=new this.THREE.Box3().setFromObject(e),s=.6;i.getSize(new this.THREE.Vector3).multiplyScalar(s);for(let a=0;a<t.length;a++){const r=new this.THREE.Box3().setFromObject(t[a]),n=r.getSize(new this.THREE.Vector3);if(n.multiplyScalar(s),r.setFromCenterAndSize(r.getCenter(new this.THREE.Vector3),n),i.intersectsBox(r))return console.log("Collision detected!"),!0}return!1}shakeCamera(e){const s=e.position.clone();new this.TWEEN.Tween(e.position).to({x:s.x+Math.random()*.1*2-.1,y:s.y+Math.random()*.1*2-.1,z:s.z+Math.random()*.1*2-.1},.5*1e3).easing(this.TWEEN.Easing.Quadratic.InOut).onComplete(()=>{}).start()}}class S{constructor(){this.html=document.getElementById("html-vue-end-screen").innerHTML,this.car,this.score}afficher(){document.getElementById("game-over-container").innerHTML+=this.html,document.getElementById("restart-btn").href=`#Game/${this.car.id}`,document.getElementById("game-score").innerHTML="SCORE: "+this.score}initialiserVueEndScreen(e,t){this.car=e,this.score=t}}class T{constructor(){this.player={},this.defaultplayer={id:0,username:"Player1",highscore:0,picture:"data:image/jpeg;base64,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",level:1,cash:1e4,carsUnlocked:[0,1,4]}}getPlayer(){localStorage.player?this.player=JSON.parse(localStorage.player):(localStorage.player=JSON.stringify(this.defaultplayer),this.player=JSON.parse(localStorage.player));let e=new E(this.player.id,this.player.username,this.player.highscore,this.player.picture,this.player.level,this.player.cash,this.player.carsUnlocked);return this.player=e,console.log(this.player.level),this.player}modifierInfoPlayer(e){console.log(e.id),this.player?(this.player.username=e.username,this.player.picture=e.picture,this.player.highscore=e.highscore,this.player.level=e.level,this.player.cash=e.cash,this.player.carsUnlocked=e.carsUnlocked,localStorage.player=JSON.stringify(this.player)):console.error("Le player avec l'ID spécifié n'existe pas.")}modifierHighscore(e){this.player&&(this.player.highscore=e,localStorage.player=JSON.stringify(this.player))}modifierLevel(e){this.player&&(e=parseInt(e),e/=(this.player.level+10)*15745,this.player.level+=e,localStorage.player=JSON.stringify(this.player))}isRegistered(){return localStorage.player?(this.player=JSON.parse(localStorage.player),!0):!1}}class C{constructor(e,t,i,s,o,a,r){this.window=e,this.playerDAO=r,this.carDAO=t,this.vuePlayer=a,this.vueHomePage=i,this.vueGame=s,this.vueEndScreen=o,this.idItem,this.vuePlayer.initializeActionModifierPlayer(n=>this.actionModifierPlayer(n)),this.window.addEventListener("hashchange",()=>this.naviger()),this.naviger(),this.hasInitGame=!1,this.hasInitHomePage=!1}naviger(){let e=window.location.hash;if(!e)this.vuePlayer.afficher(this.playerDAO.getPlayer());else if(e.match(/^#HomePage/))this.vueHomePage.initializeHomePage(this.carDAO.getCars(),this.playerDAO.getPlayer()),this.vueHomePage.afficher(),this.vueHomePage.addMusic(),this.vueHomePage.setup().then(()=>{this.hasInitHomePage==!1?(this.vueHomePage.init(),this.hasInitHomePage=!0):location.reload()}).catch(t=>console.error(t));else if(e.match(/^#Game\/([0-9]+)/)){let t=e.match(/^#Game\/([0-9]+)/);this.idItem=t[1],this.vueGame.initialiserCar(this.carDAO.getCars()[this.idItem]),this.vueGame.afficher(),this.vueGame.setup().then(()=>{this.hasInitGame==!1?(this.vueGame.init(),this.hasInitGame=!0,this.vueHomePage.removeMusic()):location.reload()}).catch(i=>console.error(i))}else e.match(/^#EndScreen/)&&(this.vueGame.removeMusic(),this.vueEndScreen.initialiserVueEndScreen(this.carDAO.getCars()[this.idItem],this.vueGame.getGameScore()),this.vueEndScreen.afficher(),parseInt(this.vueGame.getGameScore())>parseInt(this.playerDAO.getPlayer().highscore)&&this.playerDAO.modifierHighscore(this.vueGame.getGameScore()),console.log(this.playerDAO.getPlayer().level),this.playerDAO.modifierLevel(this.vueGame.getGameScore()),console.log(this.playerDAO.getPlayer().level))}actionModifierPlayer(e){this.playerDAO.modifierInfoPlayer(e),this.window.location.hash="#"}}new C(window,new M,new I,new R,new S,new b,new T);
