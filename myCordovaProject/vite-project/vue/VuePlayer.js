
class VuePlayer{
    constructor(){
        this.html = document.getElementById('html-vue-player').innerHTML;
        this.player = null;
        
        
      
    }
    
    initializePlayer(player){
        this.player = player;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.fileInput = document.getElementById('fileInput');
        this.photoPlayer = document.getElementById('output');
        this.photoPlayer.src=this.player.picture;
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        document.getElementById('username').value=this.player.username;
        
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
    }



export default VuePlayer;