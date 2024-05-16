import Player from '../model/Player.js';
class VuePlayer{
    constructor(){
        this.html = document.getElementById('html-vue-player').innerHTML;
        
        this.actionModifierPlayer=null;
    }
    
    initializeActionModifierPlayer(actionModifierPlayer) {

        this.actionModifierPlayer = actionModifierPlayer;
    }
    

    afficher(player) {
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.fileInput = document.getElementById('fileInput');
        this.photoPlayer = document.getElementById('output');
        this.photoPlayer.src=player.picture;
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        document.getElementById('username').value=player.username;
        document.getElementById('modifier-player').addEventListener('click', event =>{this.enregistrer(player);});
        
    }

    handleFileSelect(event) {
        const files = event.target.files;
      
        if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
      
          reader.onload = (e) => {
            const base64Image = e.target.result;
            
            this.photoPlayer.src = `${base64Image}`;
          };
      
          reader.readAsDataURL(file);
        }
      }
      enregistrer(player){
      let username=document.getElementById("username").value;
      let picture=document.getElementById("output").src;
      this.actionModifierPlayer(new Player(player.id, username, player.highscore, picture, player.level, player.cash, player.carsUnlocked));
    }
    }

    



export default VuePlayer;