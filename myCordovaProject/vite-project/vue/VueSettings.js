import Settings from "../model/Settings";
class VueSettings{
    constructor(){
        this.html = document.getElementById('html-vue-settings').innerHTML;
        this.volumeMusic;
        this.hasMusic ;
        this.volumeSlider;
        this.musicBtn
        this.actionModifierSettings =null;
    }

    afficher(settings){
        
        document.getElementById("settings-container-home-page").innerHTML+=this.html;
        document.getElementById("settings-container-home-page").style.display = 'flex';
        this.volumeSlider=document.getElementById("volume-slider")
        this.musicBtn=document.getElementById("musicBtn")
        this.saveBtn=document.getElementById("save-btn")
        this.volumeMusic = settings.MusicVolume;
        this.hasMusic = settings.hasMusic;

        this.volumeSlider.value=this.volumeMusic;
        
        if(this.hasMusic){
            
            this.musicBtn.style.backgroundImage="url(../img/music.png)";            
        }
        else{            
            this.musicBtn.style.backgroundImage="url(../img/music-slash.png)";
        }
        
        this.saveBtn.addEventListener("click",()=>{
            this.saveSettings(settings)
            
            
        })
        this.musicBtn.addEventListener("click",()=>{
        if(this.hasMusic){
            this.hasMusic=false;
            this.musicBtn.style.backgroundImage="url(../img/music-slash.png)";
            
        }
        else{
            this.hasMusic=true;
            this.musicBtn.style.backgroundImage="url(../img/music.png)";
            
        }})
    }


    initialiserActionModifierSettings(actionModifierSettings){
        this.actionModifierSettings = actionModifierSettings;
    }
    saveSettings(settings){
        
        let volume = this.volumeSlider.value;
        let hasMusic = this.hasMusic;
        
        this.actionModifierSettings(new Settings(settings.id,volume,hasMusic));
    }
}

export default VueSettings;