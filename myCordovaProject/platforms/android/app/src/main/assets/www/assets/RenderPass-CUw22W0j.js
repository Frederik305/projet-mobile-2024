import{Color as s}from"./three.module-CwjCRhry.js";import{P as r}from"./Pass-B04wQx25.js";class u extends r{constructor(l,i,t=null,e=null,a=null){super(),this.scene=l,this.camera=i,this.overrideMaterial=t,this.clearColor=e,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new s}render(l,i,t){const e=l.autoClear;l.autoClear=!1;let a,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(l.getClearColor(this._oldClearColor),l.setClearColor(this.clearColor)),this.clearAlpha!==null&&(a=l.getClearAlpha(),l.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&l.clearDepth(),l.setRenderTarget(this.renderToScreen?null:t),this.clear===!0&&l.clear(l.autoClearColor,l.autoClearDepth,l.autoClearStencil),l.render(this.scene,this.camera),this.clearColor!==null&&l.setClearColor(this._oldClearColor),this.clearAlpha!==null&&l.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),l.autoClear=e}}export{u as RenderPass};