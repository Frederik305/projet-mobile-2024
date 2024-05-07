import Settings from '../model/Settings.js';
class settingsDAO{
    constructor(){
        this.settings = {};
        this.defaultSettings={MusicVolume:0.05,hasMusic:true};
    }

    getSettings(){
        
        if(localStorage['settings']){
            this.settings = JSON.parse(localStorage['settings']);
        }
        else{
            
            localStorage['settings']=JSON.stringify(this.defaultSettings);
            this.settings = JSON.parse(localStorage['settings']);
        }
        let settings= new Settings(this.settings.MusicVolume,this.settings.hasMusic)
        this.settings=settings;

        
        
        return this.settings;
    }

    modifierSettings(settings) {
        
        
            this.settings.hasMusic=settings.hasMusic;
            this.settings.MusicVolume=settings.MusicVolume;;
            

            localStorage['settings'] = JSON.stringify(this.settings);
        
    }

    
}
export default settingsDAO;