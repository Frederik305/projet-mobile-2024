class VuePlayer{
    constructor(){
        this.html = document.getElementById('html-vue-player').innerHTML;
        this.displayPlayer = null;
        
        
      
    }
    
    initializePlayer(displayPlayer){
        this.displayPlayer = displayPlayer;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        this.fileInput = document.getElementById('fileInput');
        this.photoPlayer = document.getElementById('output');
        
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    }

    handleFileSelect(event) {
        const files = event.target.files;
      
        if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
      
          reader.onload = (e) => {
            const base64Image = e.target.result;
            
            this.photoPlayer.style.backgroundImage = `url('${base64Image}')`;
          };
      
          reader.readAsDataURL(file);
        }
      }
    }



export default VuePlayer;