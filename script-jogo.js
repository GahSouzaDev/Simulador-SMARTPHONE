const personagem = document.getElementById('personagem')
const pipe = document.getElementById('pipe')
const jump =() =>
    {
        personagem.classList.add('jump');
        setTimeout(()=>{

            personagem.classList.remove('jump');
        },800)
    }

const loop = setInterval(()=>{
 
    const personagemPosition = + window.getComputedStyle(personagem). bottom.replace('px','');
    const pipePosition = pipe.offsetLeft;   
    console.log(pipePosition)

    if(pipePosition <= 110 && pipePosition > 0 && personagemPosition <= 110 )
    {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

         personagem.style.animation = 'none'
        personagem.style.bottom = `${personagemPosition}px`

        personagem.src = "game-over.png";
        personagem.style.width ='95px'
        personagem.style.marginLeft ='50px'
         
        clearInterval(loop);
    }
},10)
    
document.addEventListener('keydown',jump)
document.addEventListener('touchstart', jump);