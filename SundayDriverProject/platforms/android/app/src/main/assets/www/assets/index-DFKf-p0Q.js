function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/GLTFLoader-Lm1hKXOz.js","assets/three.module-CwjCRhry.js","assets/index-BVBvlU2g.js","assets/_commonjsHelpers-CqkleIqs.js","assets/nipplejs-PhMyn1IT.js","assets/UnrealBloomPass-DJoZj9pB.js","assets/Pass-B04wQx25.js","assets/CopyShader-BzTUYzf6.js","assets/EffectComposer-30wFuIl5.js","assets/RenderPass-CUw22W0j.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class b{constructor(e,t,i,s,n,a,r,o,c,d,p,l,u,g){this.id=e,this.name=t,this.model=i,this.level=s,this.price=n,this.acceleration=a,this.baseMaxSpeed=r,this.weight=o,this.brakePower=c,this.maneuverability=d,this.rotation=p,this.cameraDistance=l,this.cameraRotationY=u,this.cameraRotationX=g}}class w{constructor(){this.cars=[{id:0,name:"Muscle",model:"3dModels/Muscle.glb",level:0,price:5e3,acceleration:.8,baseMaxSpeed:40,weight:1e3,brakePower:1,maneuverability:20,rotation:.01,cameraDistance:900,cameraRotationY:500,cameraRotationX:0},{id:1,name:"Sedan",model:"3dModels/Sedan.glb",level:5,price:5e3,acceleration:.6,baseMaxSpeed:50,weight:1e3,brakePower:1,maneuverability:10,rotation:.01,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:2,name:"Police car",model:"3dModels/Police Muscle.glb",price:5e3,level:10,acceleration:.9,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.009,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:3,name:"Gino",model:"3dModels/Muscle 2.glb",level:15,price:5e3,acceleration:.9,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.008,cameraDistance:1e3,cameraRotationY:400,cameraRotationX:0},{id:4,name:"Hatchback",model:"3dModels/Hatchback.glb",level:0,price:5e3,acceleration:.9,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.009,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:5,name:"Sport",model:"3dModels/Sports.glb",level:0,price:5e3,acceleration:1,baseMaxSpeed:100,weight:1e3,brakePower:1,maneuverability:.02,rotation:.01,cameraDistance:900,cameraRotationY:400,cameraRotationX:0},{id:6,name:"Pickup",model:"3dModels/Pickup.glb",level:0,price:5e3,acceleration:.8,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.007,cameraDistance:1100,cameraRotationY:550,cameraRotationX:0},{id:7,name:"Taxi",model:"3dModels/Taxi.glb",level:0,price:5e3,acceleration:1,baseMaxSpeed:30,weight:1e3,brakePower:1,maneuverability:.02,rotation:.0095,cameraDistance:1e3,cameraRotationY:500,cameraRotationX:0},{id:8,name:"Van",model:"3dModels/Van.glb",level:0,price:5e3,acceleration:.5,baseMaxSpeed:60,weight:1e3,brakePower:1,maneuverability:.02,rotation:.006,cameraDistance:1100,cameraRotationY:550,cameraRotationX:0},{id:9,name:"SUV",model:"3dModels/SUV.glb",level:0,price:5e3,acceleration:.6,baseMaxSpeed:80,weight:1e3,brakePower:1,maneuverability:.02,rotation:.005,cameraDistance:1e3,cameraRotationY:400,cameraRotationX:0}]}getCars(){for(let e in this.cars){let t=new b(this.cars[e].id,this.cars[e].name,this.cars[e].model,this.cars[e].level,this.cars[e].price,this.cars[e].acceleration,this.cars[e].baseMaxSpeed,this.cars[e].weight,this.cars[e].brakePower,this.cars[e].maneuverability,this.cars[e].rotation,this.cars[e].cameraDistance,this.cars[e].cameraRotationY,this.cars[e].cameraRotationX);this.cars[t.id]=t}return console.log(this.cars),this.cars}}class E{constructor(e,t,i,s,n,a,r){this.id=e,this.username=t,this.highscore=i,this.picture=s,this.level=n,this.cash=a,this.carsUnlocked=r}}class v{constructor(){this.html=document.getElementById("html-vue-player").innerHTML,this.actionModifierPlayer=null}initializeActionModifierPlayer(e){this.actionModifierPlayer=e}afficher(e){document.getElementsByTagName("body")[0].innerHTML=this.html,this.fileInput=document.getElementById("fileInput"),this.photoPlayer=document.getElementById("output"),this.photoPlayer.src=e.picture,this.fileInput.addEventListener("change",this.handleFileSelect.bind(this)),document.getElementById("username").value=e.username,document.getElementById("modifier-player").addEventListener("click",t=>{this.enregistrer(e)})}handleFileSelect(e){const t=e.target.files;if(t.length>0){const i=t[0],s=new FileReader;s.onload=n=>{const a=n.target.result;this.photoPlayer.src=`${a}`},s.readAsDataURL(i)}}enregistrer(e){let t=document.getElementById("username").value,i=document.getElementById("output").src;this.actionModifierPlayer(new E(e.id,t,e.highscore,i,e.level,e.cash,e.carsUnlocked))}}const S="modulepreload",P=function(h){return"/"+h},f={},m=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const n=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),r=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.all(t.map(o=>{if(o=P(o),o in f)return;f[o]=!0;const c=o.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(!!i)for(let u=n.length-1;u>=0;u--){const g=n[u];if(g.href===o&&(!c||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${d}`))return;const l=document.createElement("link");if(l.rel=c?"stylesheet":S,c||(l.as="script",l.crossOrigin=""),l.href=o,r&&l.setAttribute("nonce",r),document.head.appendChild(l),c)return new Promise((u,g)=>{l.addEventListener("load",u),l.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${o}`)))})}))}return s.then(()=>e()).catch(n=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n})};class I{constructor(){this.html=document.getElementById("html-vue-home-page").innerHTML,this.carList=null,this.player=null,this.selectedCar=0,this.carPositions=[],this.isAnimating=!1,this.onWindowResize=this.onWindowResize.bind(this),this.backgroundMusic=new Audio("music/HomePageMusic.mp3"),window.addEventListener("resize",this.onWindowResize,!1),this.fastestCarSpeed=0,this.fastestCarAcceleration=0,this.BestCarManiability=0,this.leftSwipes=0,this.rightSwipes=0}initializeHomePage(e,t){this.carList=e,this.player=t}afficher(){document.getElementsByTagName("body")[0].innerHTML=this.html,document.getElementById("btn-start").href=`#Game/${this.selectedCar}`,document.getElementById("username-player-home-page").innerHTML=this.player.username,document.getElementById("photo-player-home-page").src=this.player.picture,document.getElementById("high-score-player").innerHTML+=this.player.highscore,document.addEventListener("visibilitychange",e=>{document.visibilityState==="visible"?document.getElementById("high-score-player")&&this.backgroundMusic&&this.backgroundMusic.play():this.backgroundMusic&&this.backgroundMusic.pause()})}checkCarsOwned(){}addMusic(){this.backgroundMusic.loop=!0,this.backgroundMusic.load(),this.backgroundMusic.play()}setVolume(e,t){e?this.backgroundMusic.volume=t:this.backgroundMusic.volume=0}removeMusic(){this.backgroundMusic.currentTime=0,this.backgroundMusic.pause(),this.backgroundMusic.remove()}loadTexture(){this.player.carsUnlocked.includes(this.selectedCar)&&(console.log(this.carModel),new this.THREE.TextureLoader().load("NotOwned.png",t=>{this.carModel.traverse(i=>{i.isMesh&&(i.material.map=t,i.material.side=this.THREE.FrontSide,i.material.transparent=!0,i.material.opacity=.5,i.material.alphaTest=.5,i.material.needsUpdate=!0)})}))}async setup(){try{const[e,{GLTFLoader:t},{default:i},s,n]=await Promise.all([m(()=>import("./three.module-CwjCRhry.js"),__vite__mapDeps([])),m(()=>import("./GLTFLoader-Lm1hKXOz.js"),__vite__mapDeps([0,1])),m(()=>import("./tween.esm-BHSu4PDy.js"),__vite__mapDeps([])),m(()=>import("./index-BVBvlU2g.js").then(a=>a.i),__vite__mapDeps([2,3])),m(()=>import("./cannon-es-B7qhRxk4.js"),__vite__mapDeps([]))]);this.THREE=e,this.GLTFLoader=t,this.TWEEN=i,this.ZingTouch=s,this.CANNON=n}catch(e){throw console.error("Error setting up Three.js:",e),e}}setupScene(){this.scene=new this.THREE.Scene,this.camera=new this.THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,1e5),this.renderer=new this.THREE.WebGLRenderer;const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.renderer.setSize(e,t),document.body.appendChild(this.renderer.domElement);const i=this.createGradientBackground();this.scene.background=i,this.addLights()}createGradientBackground(){const e=document.createElement("canvas"),t=e.getContext("2d"),i=t.createLinearGradient(0,0,0,window.innerHeight);return t.fillStyle=i,t.fillRect(0,0,e.width,e.height),new this.THREE.CanvasTexture(e)}addLights(){const e=new this.THREE.AmbientLight(12301803,7),t=new this.THREE.DirectionalLight(12301803,15);t.position.set(10,20,-10),this.scene.add(e,t)}async loader(){const e=new this.GLTFLoader;for(let t=0;t<this.carList.length;t++)try{this.carList[t].baseMaxSpeed>this.fastestCarSpeed&&(this.fastestCarSpeed=this.carList[t].baseMaxSpeed),this.carList[t].acceleration>this.fastestCarAcceleration&&(this.fastestCarAcceleration=this.carList[t].acceleration),this.carList[t].rotation>this.BestCarManiability&&(this.BestCarManiability=this.carList[t].rotation);const i=await new Promise((a,r)=>{e.load(this.carList[t].model,a,void 0,r)}),s=await new Promise((a,r)=>{e.load("3dModels/Parking.glb",a,void 0,r)});this.carModel=i.scene,this.carModel.position.set(t*-400,0,0),this.carModel.rotateY(Math.PI),this.carPositions.push(this.carModel.position);const n=s.scene;n.position.set(t*-400,0,0),n.rotateY(Math.PI),this.scene.add(this.carModel),this.scene.add(n)}catch(i){console.error(i)}}setLinkSelectedCar(){this.updateLinkSelectedCar()}updateLinkSelectedCar(){let e=document.getElementById("displayBaseSpeed"),t=document.getElementById("displayAcceleration"),i=document.getElementById("displayManeuverability");e.style.width=this.carList[this.selectedCar].baseMaxSpeed/this.fastestCarSpeed*100+"px",e.style.background="linear-gradient(90deg, rgb(255, 103, 1) 0%, rgb(255,196,0)"+((this.fastestCarSpeed-this.carList[this.selectedCar].baseMaxSpeed+this.fastestCarSpeed)/this.fastestCarSpeed*100).toString()+"%)",t.style.width=this.carList[this.selectedCar].acceleration/this.fastestCarAcceleration*100+"px",t.style.background="linear-gradient(90deg, rgb(132,0,255) 0%,rgb(188,67,255)"+((this.fastestCarAcceleration-this.carList[this.selectedCar].acceleration+this.fastestCarAcceleration)/this.fastestCarAcceleration*100).toString()+"%)",i.style.width=this.carList[this.selectedCar].rotation/this.BestCarManiability*100+"px",i.style.background="linear-gradient(90deg, rgb(0,110,255) 0%, rgb(0,162,255)"+((this.BestCarManiability-this.carList[this.selectedCar].rotation+this.BestCarManiability)/this.BestCarManiability*100).toString()+"%)",console.log(((this.BestCarManiability-this.carList[this.selectedCar].maneuverability+this.BestCarManiability)/this.BestCarManiability*100).toString()+"%"),document.getElementById("name").innerText=this.carList[this.selectedCar].name,document.getElementById("name").fontSize="35px",document.getElementById("baseSpeed").innerText="Car Speed: ",document.getElementById("acceleration").innerText="Acceleration: ",document.getElementById("maneuverability").innerText="Maniability: ",document.getElementById("btn-start").href=`#Game/${this.selectedCar}`}appendSceneToDiv(){let e=document.getElementById("threejs-container");e?e.appendChild(this.renderer.domElement):console.error("Container not found")}catchSwipeEvent(){const e=document.getElementById("swipeCatcher");new this.ZingTouch.Region(e).bind(e,"swipe",i=>{(i.detail.data[0].currentDirection<=90||i.detail.data[0].currentDirection>=270)&&this.selectedCar>0&&(this.selectedCar--,this.moveCameraPositionLeft(),this.updateLinkSelectedCar(),this.checkCarsOwned()),i.detail.data[0].currentDirection>=90&&i.detail.data[0].currentDirection<=270&&this.selectedCar+1<this.carList.length&&(this.selectedCar++,this.moveCameraPositionRight(),this.updateLinkSelectedCar(),this.checkCarsOwned())})}setCameraPosition(){this.camera.position.set(this.carPositions[this.selectedCar].x+400,300,-800),console.log(this.carPositions[this.selectedCar].x),this.camera.lookAt(this.carPositions[this.selectedCar].clone().add(new this.THREE.Vector3(0,0,-100)))}moveCameraPositionLeft(){let e={x:this.camera.position.x},t=this.carPositions[this.selectedCar].x+400;new this.TWEEN.Tween(e).to({x:t},500).easing(this.TWEEN.Easing.Quadratic.Out).onUpdate(()=>{this.camera.position.x=e.x}).start()}moveCameraPositionRight(){let e={x:this.camera.position.x},t=this.carPositions[this.selectedCar].x+400;new this.TWEEN.Tween(e).to({x:t},500).easing(this.TWEEN.Easing.Quadratic.Out).onUpdate(()=>{this.camera.position.x=e.x}).start()}animate(){requestAnimationFrame(()=>this.animate()),this.TWEEN.update(),this.renderer.render(this.scene,this.camera)}startAnimation(){this.animate()}onWindowResize(){if(this.camera&&this.renderer){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}}async init(){this.setupScene(),this.startAnimation(),await this.loader(),this.setLinkSelectedCar(),this.setCameraPosition(),this.catchSwipeEvent(),this.checkCarsOwned(),this.appendSceneToDiv()}}class R{constructor(){this.html=document.getElementById("html-vue-game").innerHTML,this.scene=null,this.camera=null,this.renderer=null,this.THREE=null,this.GLTFLoader=null,this.nipplejs=null,this.UnrealBloomPass=null,this.EffectComposer=null,this.RenderPass=null,this.car,this.carModel,this.setup=this.setup.bind(this),this.bloomPass=null,this.gotoleft=!1,this.gotoright=!1,this.isLeft=!1,this.isRight=!1,this.tickInterval=1e3/120,this.lastTick=0,this.frameCount=0,this.isPaused=!1,this.lastFpsUpdate=Date.now(),this.totalLength=0,this.onWindowResize=this.onWindowResize.bind(this),window.addEventListener("resize",this.onWindowResize,!1),this.backgroundMusic=new Audio("music/GameMusic.mp3")}initialiserCar(e){this.car=e}getGameScore(){return(Math.abs(this.carModel.position.z)*this.score/1e4).toFixed(0)}afficher(){document.getElementsByTagName("body")[0].innerHTML=this.html,this.score=0,this.carInstances=[],this.roadInstances=[],this.maxRoadInstances=8,this.nextRoadPositionCounter=0,this.distanceAhead=-1e3,this.data=null,this.speed=this.car.baseMaxSpeed,document.addEventListener("visibilitychange",e=>{document.visibilityState==="visible"||this.isPaused||this.changePauseState()})}async setup(){try{const[e,{GLTFLoader:t},i,{UnrealBloomPass:s},{EffectComposer:n},{RenderPass:a}]=await Promise.all([m(()=>import("./three.module-CwjCRhry.js"),__vite__mapDeps([])),m(()=>import("./GLTFLoader-Lm1hKXOz.js"),__vite__mapDeps([0,1])),m(()=>import("./nipplejs-PhMyn1IT.js").then(r=>r.n),__vite__mapDeps([4,3])),m(()=>import("./UnrealBloomPass-DJoZj9pB.js"),__vite__mapDeps([5,1,6,7])),m(()=>import("./EffectComposer-30wFuIl5.js"),__vite__mapDeps([8,1,7,6])),m(()=>import("./RenderPass-CUw22W0j.js"),__vite__mapDeps([9,1,6]))]);this.THREE=e,this.GLTFLoader=t,this.nipplejs=i,this.UnrealBloomPass=s,this.EffectComposer=n,this.RenderPass=a,this.scene=new this.THREE.Scene,this.camera=new this.THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.1,1e5),this.renderer=new this.THREE.WebGLRenderer,this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio*2),this.setupScene()}catch(e){throw console.error("Error setting up Three.js:",e),e}}addMusic(){this.backgroundMusic.loop=!0,this.backgroundMusic.load(),this.backgroundMusic.play()}setVolume(e,t){e?this.backgroundMusic.volume=t:this.backgroundMusic.volume=0}removeMusic(){this.backgroundMusic.remove()}pauseMusic(){this.backgroundMusic.pause()}playMusic(){this.backgroundMusic.play()}setupScene(){document.body.appendChild(this.renderer.domElement);const i=new this.THREE.TextureLoader().load("img/Sky.png");i.magFilter=this.THREE.LinearFilter,i.minFilter=this.THREE.LinearFilter,this.scene.background=i,this.scene.fog=new this.THREE.FogExp2(10707140,5e-5),document.getElementById("Pause").style.display="block"}addStart(){new this.GLTFLoader().load("3dModels/Road+Night.glb",t=>{const i=t.scene;this.scene.add(i)},void 0,t=>{console.error(t)})}async loadRoad(){return new Promise((e,t)=>{new this.GLTFLoader().load("3dModels/Road+Night.glb",s=>{const n=s.scene;e(n)},void 0,s=>{t(s)})})}async addRoad(){for(;this.roadInstances.length<this.maxRoadInstances;)try{const e=await this.loadRoad(),t=this.calculateRoadLength(e);this.nextRoadPositionCounter++;let i=this.nextRoadPositionCounter*-t;e.position.z=i,this.scene.add(e),this.roadInstances.push(e)}catch(e){console.error(e)}}calculateRoadLength(e){return new this.THREE.Box3().setFromObject(e).getSize(new this.THREE.Vector3).z}getTotalRoadLength(){for(const e of this.roadInstances){const i=new this.THREE.Box3().setFromObject(e).getSize(new this.THREE.Vector3);this.totalLength+=i.z}}moveRoadBehind(e,t,i){if(t.length>0&&e&&e.position.z+7e3<t[0].position.z){const s=this.totalLength;t[0].position.z-=s,t.push(t.shift()),this.carsGeneration(t,i)}}async loadCars(){const e=[{file:"3dModels/Sedan.glb",weight:4},{file:"3dModels/Police Muscle.glb",weight:2},{file:"3dModels/Muscle 2.glb",weight:3},{file:"3dModels/Limousine.glb",weight:1},{file:"3dModels/Bus.glb",weight:2},{file:"3dModels/Muscle.glb",weight:3},{file:"3dModels/Firetruck.glb",weight:1},{file:"3dModels/Hatchback.glb",weight:4},{file:"3dModels/Ambulance.glb",weight:2},{file:"3dModels/Sports.glb",weight:2}],t=12;for(;this.carInstances.length<t;){let i=0;for(let c=0;c<e.length;c++)i+=e[c].weight;const s=Math.random()*i;let n,a=0;for(let c=0;c<e.length;c++)if(a+=e[c].weight,s<=a){n=e[c].file;break}let o=(await this.loadModel(n)).scene;o.scale.set(1.5,1.5,1.5),o.position.z=1e4,this.scene.add(o),this.carInstances.push(o)}}loadModel(e){return new Promise((t,i)=>{new this.GLTFLoader().load(e,t,void 0,i)})}carsGeneration(e,t){function i(){let a=[0,0,1];for(let r=a.length-1;r>0;r--){const o=Math.floor(Math.random()*(r+1));[a[r],a[o]]=[a[o],a[r]]}return a}function s(a){for(let o=0;o<a.length;o++)a[o]===0&&Math.floor(Math.random()*100)<20&&(a[o]=1);for(let o=0;o<3;o++)if(a[o]==0){let c=o===0?-600:o===1?0:600;const d=Math.random()*100-50;c+=d;const p=Math.random()*2e3-1e3,l=e[3].position.z+p;t[0].position.x=c,t[0].position.z=l,t.push(t.shift())}}let n=i();s(n)}addLights(){const e=new this.THREE.AmbientLight(12301803,3),t=new this.THREE.DirectionalLight(12301803,5);t.position.set(2,10,1),this.scene.add(e,t)}loadCar(){return new Promise((e,t)=>{const i=this.car.model;this.loadModel(i).then(s=>{this.carModel=s.scene,this.carModel.position.set(0,1,0),this.carModel.rotateY(Math.PI),this.carModel.scale.set(1.2,1.2,1.2),this.scene.add(this.carModel),e()}).catch(s=>{console.error(s),t(s)})})}mouvements(){let e=0;const t=this.car.rotation,i=document.getElementById("joystick-container"),s=this.nipplejs.create({zone:i,mode:"dynamic",color:"yellow"});s.on("move",(n,a)=>{if(a&&a.direction){this.data=a;const r=a.direction.x;r==="right"?(this.isRight=!0,this.isLeft=!1,e&&e>a.distance?this.gotoright=!1:this.gotoright=!0):r==="left"&&(this.isRight=!1,this.isLeft=!0,e&&e>a.distance?this.gotoleft=!1:this.gotoleft=!0),e=a.distance}}),s.on("end",()=>{const n=()=>{this.gotoleft=!1,this.gotoright=!1,this.isLeft=!1,this.isRight=!1,Math.abs(this.carModel.rotation.y)>.01?(this.carModel.rotation.y>0?this.carModel.rotation.y-=t:this.carModel.rotation.y<0&&(this.carModel.rotation.y+=t),requestAnimationFrame(n)):this.carModel.rotation.y=0};n()})}moveCarForward(e){const t=e.rotation.y,i=Math.sin(t)*this.speed,s=-Math.cos(t)*this.speed;e.position.x<=800&&e.position.x>=-800&&(e.position.x+=i,e.position.x>800?e.position.x=800:e.position.x<-800&&(e.position.x=-800)),e.position.z+=s}setCameraPosition(e,t,i){const s=new this.THREE.Vector3(t.cameraRotationX,t.cameraRotationY,t.cameraDistance),n=new this.THREE.Vector3;n.copy(e.position).add(s),i.position.copy(n),i.lookAt(e.position),i.rotation.x-=-.2}async update(){if(!this.isPaused){this.frameCount++;const e=this.car.rotation,t=Date.now(),i=t-this.lastTick;if(i>=this.tickInterval){let s=this.carModel,n=this.car,a=this.camera,r=this.roadInstances,o=this.carInstances,c=this.scene;try{this.moveRoadBehind(s,r,o),this.moveCarForward(s),this.setCameraPosition(s,n,a),this.renderer.render(c,a)}catch(u){console.error("Error in game loop:",u)}let d=this.frameCount;d%5===0&&this.updateScore(),d%100===0&&this.speedIncrease(n),this.detectCollision(s,o)&&(this.isPaused=!0,document.getElementById("joystick-container").style.display="none",document.getElementById("Pause").style.display="none",document.getElementById("Score").style.display="none",window.location.hash="EndScreen");let l=this.data;if(l){let u=this.gotoleft,g=this.gotoright,A=this.isRight,y=this.isLeft;A&&!g?s.rotation.y>e*(l.distance/50)&&(s.rotation.y-=e):A&&g?s.rotation.y<.3*(l.distance/50)&&(s.rotation.y+=e):y&&!u?s.rotation.y<e*(l.distance/50)&&(s.rotation.y+=e):y&&u&&s.rotation.y>-.3*(l.distance/50)&&(s.rotation.y-=e)}this.lastTick=t-i%this.tickInterval}}}updateScore(){if(!this.isPaused){this.score++;let e=this.getGameScore();document.getElementById("Score").innerHTML="SCORE: "+e}}speedIncrease(e){this.isPaused||(this.speed+=e.acceleration)}animate(){requestAnimationFrame(()=>{this.update(),this.animate()})}changePauseState(){this.isPaused=!this.isPaused,console.log(this.isPaused);const e=document.getElementById("Score"),t=document.getElementById("game-score-pause");this.isPaused?(this.pauseMusic(),document.getElementById("joystick-container").style.display="none",document.getElementById("Pause").style.display="none",document.getElementById("game-pause").style.display="flex",t.appendChild(e),e.style.backgroundColor="#444444d3"):(this.playMusic(),document.getElementById("game-pause").style.display="none",document.getElementById("Pause").style.display="block",document.getElementById("joystick-container").style.display="block",document.getElementById("container-score-pause").appendChild(e),e.style.backgroundColor="#49494977")}checkButtonClick(){document.getElementById("Pause").addEventListener("pointerdown",()=>{this.isPaused||this.changePauseState()}),document.getElementById("resume").addEventListener("pointerdown",()=>{this.isPaused&&this.changePauseState()}),document.getElementById("quit-btn").addEventListener("click",()=>{this.isPaused||this.changePauseState(),document.getElementById("game-pause").style.display="none",document.getElementById("Score").style.display="none"})}startGameLoop(){this.animate(),document.getElementById("Score").style.display="flex"}onWindowResize(){if(this.camera&&this.renderer){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.renderer.render(this.scene,this.camera)}}async init(){this.isPaused=!1,await this.loadCar(),this.addStart(),this.addLights(),this.mouvements(),this.checkButtonClick(),await this.addRoad(),this.getTotalRoadLength(),await this.loadCars(),this.startGameLoop()}detectCollision(e,t){const i=new this.THREE.Box3().setFromObject(e),s=.6;i.getSize(new this.THREE.Vector3).multiplyScalar(s);for(let a=0;a<t.length;a++){const r=new this.THREE.Box3().setFromObject(t[a]),o=r.getSize(new this.THREE.Vector3);if(o.multiplyScalar(s),r.setFromCenterAndSize(r.getCenter(new this.THREE.Vector3),o),i.intersectsBox(r))return console.log("Collision detected!"),!0}return!1}}class B{constructor(){this.html=document.getElementById("html-vue-end-screen").innerHTML,this.car,this.score}afficher(){document.getElementById("game-over-container").innerHTML+=this.html,document.getElementById("restart-btn").href=`#Game/${this.car.id}`,document.getElementById("game-score").innerHTML="SCORE: "+this.score}initialiserVueEndScreen(e,t){this.car=e,this.score=t}}class C{constructor(){this.player={},this.defaultplayer={id:0,username:"Player1",highscore:0,picture:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQACWAJYAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAMgAyAMBIgACEQEDEQH/xAAvAAEAAgMBAQAAAAAAAAAAAAAABgcCBAUBAwEBAQEAAAAAAAAAAAAAAAAAAAEC/9oADAMBAAIQAxAAAAC3BvIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PfhD4kWfvVBkXIhE2PQAAAAAAAAIRLalMRcgJfEMpbkau0oAAAAAAAEbr2fwAC5ACWwpJGJOoAAAAAAAHErS46kNcXIA2ZbC7eGagAAAAAAAOD3hTvztuPJBUw2iE2J09tQAAAAAAAADRiBPNKrvgWl96mJcvtQSJZ60d4AAAAAAARbCCmeAyFAAZzuApbmROWKAAAAA5XVrQ4vggWAAAAe2hV3blssKAAABpVNYFfoFgAAAAAS2zuxmTKAAABDYWIFgAAAAAE0mRNAAf/xAA9EAACAQICBAoIBAYDAAAAAAABAgMEEQUGACExURIiMEBBUmFxobETICMyM4GR0RAUFnIVNWJjssFCcHP/2gAIAQEAAT8A/wCoamspaNeFU1EUI/uOBp+pcG4Vv4jD428tKaspaxeFTVEUw/tuDzVmVFLMQFAuSTYAaY3nGR2anwtuAg1Gotrb9u4dukkjyyGSR2dztZjcn5/hHI8UgkjdkcbGU2I+emCZykRlp8UbhodQqLa1/dvHborK6hlIKkXBBuCOZ5xxwvKcLp2si/HYH3j1e4dPb62TsbKSjC6hrxt8Bj/xPV7j0dvfzLEqwYfhtRVm3skJAPSegfW2ju0kjO7FnYksT0k7fWR2jkV0Yq6kFSOgjZphtYMQw2nqxb2qAkDoPSPrfmOdpTHgSoD8SZQe4An/AEOQyTKZMCaMn4czAdgIB/3zHPK3weBt04/xPIZGW2DztvnP+I5jm2nM+XZyBcxFZfodfgTyGUqcwZdgJFjKWk+p1eAHMZokngkhkF0kUqw7CLaV9HJh9dNSSjjxta+8dB+Y9ago5MQroaSIceVrX3DpPyGkMSQQRwxiyRqFUdgFuZZky+MXhE0HBWsjFlvqDjqk+R0mhlp5mhmjaORTZlYWI9SGCWomWGGNpJGNlVRcnTLeXxhEJmn4LVkgs1tYQdUHzPNK/C6LE0C1dOkltjbGHcRr0qMiUjsTT1k0Q6rqHH11HT9BSX/mKW/8T99KfIlKjA1FZNKOqihB9dZ0oMLosMQrSU6R32ttY95OvmpIVeESAN51DSXGcMgNpcQplO70gPlp+pMGv/MYPH7aRYxhk5AixCmYno9IB56Ahl4QII3jWOZ4ji9FhUfDq5gpPuoNbN3DTEM7VkxK0Ma06dduM/2GlTW1VY/CqaiWY/1sT4abNn4bdulNW1VG3CpqiWE/0OR4aYfnashIWujWoTrrxX+x0w7F6LFY+HSTBiPeQ6mXvHMMwZrSiL0lAVkqBqeTasfYN58BpNNLUTNNNI0kjG7MxuTyEM0tPMs0MjRyKbqymxGmX81pWlKSvKx1B1JJsWTsO4+B5bNeYjShsOo3tMR7aRT7g3Dt8uUypmI1QXDqx7zAexkY++Nx7fPlMwYsMIwxpVI9O/EhB62/uGju0js7sWZjckm5J38ojNG6ujFWU3BBsQd+mX8WGL4YsrECdOJMo62/uPJ5pxI4hjMiq14ae8UdtmrafmfLlsrYkcPxmNWa0NRaJ77BfYfkfPksXrPyGEVVUDZkjPB/cdQ8Tpr6Tc8tr6DY6YRWfn8Jpakm7PGOF+4aj4jkc7z+jwWKEHXNML9wBP25hkif0mDSxE64pjbuIB+/I5+bi0Cdsh8uYZBbi16dsZ8/V//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8AKf/EABoRAAICAwAAAAAAAAAAAAAAAAARAVAQMED/2gAIAQMBAT8ArGPomoYx186Iz//Z",level:1,cash:1e4,carsUnlocked:[0,1,4]}}getPlayer(){localStorage.player?this.player=JSON.parse(localStorage.player):(localStorage.player=JSON.stringify(this.defaultplayer),this.player=JSON.parse(localStorage.player));let e=new E(this.player.id,this.player.username,this.player.highscore,this.player.picture,this.player.level,this.player.cash,this.player.carsUnlocked);return this.player=e,console.log(this.player.level),this.player}modifierInfoPlayer(e){this.player?(this.player.username=e.username,this.player.picture=e.picture,this.player.highscore=e.highscore,this.player.level=e.level,this.player.cash=e.cash,this.player.carsUnlocked=e.carsUnlocked,localStorage.player=JSON.stringify(this.player)):console.error("Le player avec l'ID spécifié n'existe pas.")}modifierHighscore(e){this.player&&(this.player.highscore=e,localStorage.player=JSON.stringify(this.player))}modifierLevel(e){this.player&&(e=parseInt(e),e/=(this.player.level+10)*15745,this.player.level+=e,localStorage.player=JSON.stringify(this.player))}isRegistered(){return localStorage.player?(this.player=JSON.parse(localStorage.player),!0):!1}}class M{constructor(e,t,i){this.id=e,this.MusicVolume=t,this.hasMusic=i}}class L{constructor(){this.settings={},this.defaultSettings={id:0,MusicVolume:.05,hasMusic:!0}}getSettings(){localStorage.settings?this.settings=JSON.parse(localStorage.settings):(localStorage.settings=JSON.stringify(this.defaultSettings),this.settings=JSON.parse(localStorage.settings));let e=new M(this.settings.id,this.settings.MusicVolume,this.settings.hasMusic);return this.settings=e,this.settings}modifierSettings(e){this.settings?(this.settings.hasMusic=e.hasMusic,this.settings.MusicVolume=e.MusicVolume,localStorage.settings=JSON.stringify(this.settings)):console.log("Settings")}}class k{constructor(){this.html=document.getElementById("html-vue-settings").innerHTML,this.volumeMusic,this.hasMusic,this.volumeSlider,this.musicBtn,this.actionModifierSettings=null}afficher(e){document.getElementById("settings-container-home-page").innerHTML+=this.html,document.getElementById("settings-container-home-page").style.display="flex",this.volumeSlider=document.getElementById("volume-slider"),this.musicBtn=document.getElementById("musicBtn"),this.saveBtn=document.getElementById("save-btn"),this.volumeMusic=e.MusicVolume,this.hasMusic=e.hasMusic,this.volumeSlider.value=this.volumeMusic,this.hasMusic?this.musicBtn.style.backgroundImage="url(../img/music.png)":this.musicBtn.style.backgroundImage="url(../img/music-slash.png)",this.saveBtn.addEventListener("click",()=>{this.saveSettings(e)}),this.musicBtn.addEventListener("click",()=>{this.hasMusic?(this.hasMusic=!1,this.musicBtn.style.backgroundImage="url(../public/img/music-slash.png)"):(this.hasMusic=!0,this.musicBtn.style.backgroundImage="url(../public/img/music.png)")}),this.volumeSlider.addEventListener("input",function(){let t=document.getElementById("volume-slider").value;console.log("La valeur a changé : "+t)})}initialiserActionModifierSettings(e){this.actionModifierSettings=e}saveSettings(e){let t=this.volumeSlider.value,i=this.hasMusic;this.actionModifierSettings(new M(e.id,t,i))}}class T{constructor(e,t,i,s,n,a,r,o,c){this.window=e,this.playerDAO=r,this.carDAO=t,this.vuePlayer=a,this.vueHomePage=i,this.vueGame=s,this.vueEndScreen=n,this.settingsDAO=o,this.vueSettings=c,this.idItem,this.vuePlayer.initializeActionModifierPlayer(d=>this.actionModifierPlayer(d)),this.vueSettings.initialiserActionModifierSettings(d=>this.actionModifierSettings(d)),this.hasInitGame=!1,this.hasInitHomePage=!1,document.addEventListener("deviceready",()=>this.initialiserNavigation(),!1)}initialiserNavigation(){document.addEventListener("backbutton",function(e){e.preventDefault()},!1),this.window.addEventListener("hashchange",()=>this.naviguer()),setTimeout(()=>this.naviguer(),3e3)}naviguer(){let e=window.location.hash;if(!e)this.vuePlayer.afficher(this.playerDAO.getPlayer());else if(e.match(/^#HomePage/))this.vueHomePage.initializeHomePage(this.carDAO.getCars(),this.playerDAO.getPlayer()),this.vueHomePage.afficher(),this.vueHomePage.setVolume(this.settingsDAO.getSettings().hasMusic,this.settingsDAO.getSettings().MusicVolume),this.vueHomePage.setup().then(()=>{this.hasInitHomePage==!1?(this.vueHomePage.init(),this.hasInitHomePage=!0):location.reload(),this.vueHomePage.addMusic()}).catch(t=>console.error(t));else if(e.match(/^#Game\/([0-9]+)/)){let t=e.match(/^#Game\/([0-9]+)/);this.idItem=t[1],this.vueHomePage.removeMusic(),this.vueGame.initialiserCar(this.carDAO.getCars()[this.idItem]),this.vueGame.afficher(),this.vueGame.setVolume(this.settingsDAO.getSettings().hasMusic,this.settingsDAO.getSettings().MusicVolume),this.vueGame.setup().then(()=>{this.hasInitGame==!1?(this.vueGame.init(),this.hasInitGame=!0):location.reload(),this.vueGame.addMusic()}).catch(i=>console.error(i))}else e.match(/^#EndScreen/)?(this.vueGame.removeMusic(),this.vueEndScreen.initialiserVueEndScreen(this.carDAO.getCars()[this.idItem],this.vueGame.getGameScore()),this.vueEndScreen.afficher(),parseInt(this.vueGame.getGameScore())>parseInt(this.playerDAO.getPlayer().highscore)&&this.playerDAO.modifierHighscore(this.vueGame.getGameScore()),console.log(this.playerDAO.getPlayer().level),this.playerDAO.modifierLevel(this.vueGame.getGameScore()),console.log(this.playerDAO.getPlayer().level)):e.match(/^#Settings/)&&this.vueSettings.afficher(this.settingsDAO.getSettings())}actionModifierPlayer(e){this.playerDAO.modifierInfoPlayer(e),this.window.location.hash="#"}actionModifierSettings(e){this.settingsDAO.modifierSettings(e),this.window.location.hash="#"}}new T(window,new w,new I,new R,new B,new v,new C,new L,new k);
