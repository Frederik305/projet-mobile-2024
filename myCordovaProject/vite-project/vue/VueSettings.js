class VueSettings{
    constructor(){
        this.html = document.getElementById('html-vue-settings').innerHTML;
        this.volumeMusic;
        this.hasMusic ;
        
         
    }

    afficher(){
        
        
        document.getElementById("settings-container-home-page").innerHTML+=this.html;
        document.getElementById("settings-container-home-page").style.display = 'flex';
        //document.getElementById("volume-slider").value=this.volumeMusic;
        if(this.hasMusic){
            this.hasMusic=false;
            document.getElementById("musicBtn").style.backgroundImage="url(../img/music-slash.png)";
            
        }
        else{
            this.hasMusic=true;
            document.getElementById("musicBtn").style.backgroundImage="url(../img/music.png)";
        }
        this.changeMusicState();
    }

    changeMusicState(){

        document.getElementById("musicBtn").addEventListener("click",()=>{
        if(this.hasMusic){
            this.hasMusic=false;
            document.getElementById("musicBtn").style.backgroundImage="url(../img/music-slash.png)";
            
        }
        else{
            this.hasMusic=true;
            document.getElementById("musicBtn").style.backgroundImage="url(../img/music.png)";
        }}
    )}
    
    initialiserSettings(settings){
        this.volumeMusic = settings.MusicVolume;
        this.hasMusic = settings.hasMusic;
    }
}

export default VueSettings;