playername = "";
function takeip() {
    playername = document.getElementById("name").value;
    console.log(playername);
    window.location.href = "game2048.html?name=" + playername;
    document.getElementById("name").textContent = playername;

}

/*function takeip() {
    pname = document.getElementById("name").value;
    console.log(pname);
    window.location.href = "game2048.html?name=" + pname;
    console.log(pname);
    playername=pname;
}*/
 
 
//document.addEventListener('DOMContentLoaded', () => {

mat = [];
 top = document.getElementById("topsc");
 top.innerHTML=0;
score = document.getElementById("curr");
 
window.addEventListener("load", matrixcreate);


function matrixcreate() {
    for (let i=0; i<16; i++) {
        let boxes=document.createElement('div');
        boxes.innerHTML= 0;
        document.querySelector('.matrix').appendChild(boxes);
        mat.push(boxes);
    }
    genval();
    genval();
    boxcolors();
}
function genval() {
    let emptyCells=mat.filter(cell => cell.innerHTML==0);

    if (emptyCells.length===0) {
        checkgameover(); 
        checkwin();  
        return;
    }

    let randomIndex=Math.floor(Math.random() * emptyCells.length);
    let randomCell=emptyCells[randomIndex];
    randomCell.innerHTML=2;

    boxcolors();  
}

function moveright(){
        for (let i=0; i<16; i++) {
            if (i%4===0) {
              let first=mat[i].innerHTML
              let second =mat[i+1].innerHTML
              let third =mat[i+2].innerHTML
              let fourth= mat[i+3].innerHTML
              let row =[parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)]
      
              let filteredrow=row.filter(num => num !== 0)
              let zeroarr=Array(4 - filteredrow.length).fill(0)
              let newrow=zeroarr.concat(filteredrow)
      
              mat[i].innerHTML=newrow[0]
              mat[i +1].innerHTML=newrow[1]
              mat[i +2].innerHTML=newrow[2]
              mat[i +3].innerHTML=newrow[3]
            }
          }
}
    
function moveleft(){
        for(let i=0;i<16;i++)
        {
            if(i%4==0)
            {
                let first=mat[i].innerHTML
                let second=mat[i+1].innerHTML
                let third=mat[i+2].innerHTML
                let fourth=mat[i+3].innerHTML

                let row=[parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];
                let filteredrow=row.filter(num => num !== 0)
                let zeroarr=Array(4-filteredrow.length).fill(0);
                let newrow=filteredrow.concat(zeroarr);
                mat[i].innerHTML=newrow[0]

                mat[i +1].innerHTML= newrow[1]
                mat[i +2].innerHTML=newrow[2]
                mat[i +3].innerHTML=newrow[3]
      
            }
        }
}
    
function moveup(){
        for(let i=0;i<4;i++)
        {
                let first =mat[i].innerHTML
                let second =mat[i+4].innerHTML
                let third =mat[i+8].innerHTML
                let fourth =mat[i+12].innerHTML
                let col=[parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];
                let filteredcol=col.filter(num => num !== 0)
                
                let zeroarr=Array(4-filteredcol.length).fill(0);
                let newcol=filteredcol.concat(zeroarr);
                mat[i].innerHTML =newcol[0]
                mat[i +4].innerHTML =newcol[1]
                mat[i +8].innerHTML= newcol[2]
                mat[i +12].innerHTML= newcol[3]
            
        }
}
function movedown(){
        for(let i=0;i<4;i++)
        {
                let first= mat[i].innerHTML
             let second =mat[i+4].innerHTML
                let third =mat[i+8].innerHTML
                let fourth =mat[i+12].innerHTML
                let col=[parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];
            let filteredcol=col.filter(num => num !== 0)
                let zeroarr=Array(4-filteredcol.length).fill(0);
                let newcol=zeroarr.concat(filteredcol);
            
                mat[i].innerHTML=newcol[0]
                mat[i +4].innerHTML=newcol[1]
                mat[i +8].innerHTML=newcol[2]
                mat[i +12].innerHTML=newcol[3]
            
        }
}
function combinecol() {
        let s = parseInt(score.innerHTML);
        for (let i=0; i<12; i++) {
            if (mat[i].innerHTML===mat[i + 4].innerHTML && mat[i].innerHTML!== '0') {
                let summ=parseInt(mat[i].innerHTML) * 2;
                s += summ;
                mat[i].innerHTML=summ.toString();
                mat[i + 4].innerHTML='0';
                score.innerHTML=s.toString();
            }
        }
        boxcolors();
        checkwin();
}
    
function combinerow() {
        let s=parseInt(score.innerHTML);
        for (let i=0; i<15; i++) {
            if (mat[i].innerHTML===mat[i + 1].innerHTML && mat[i].innerHTML!=='0') {
                let summ=parseInt(mat[i].innerHTML) * 2;
                s+=summ;
                mat[i].innerHTML=summ.toString();
                mat[i + 1].innerHTML='0';
                score.innerHTML=s.toString();
            }
        }
        boxcolors();
        checkwin();
}
function controlkeys(e) {
        if (e.keyCode===37) {
            Leftkey();
        } 
        else if (e.keyCode===38) {
            Upkey();
        }
         else if (e.keyCode===39) {
            Rightkey();
        }
         else if (e.keyCode===40) {
            Downkey();
        }
    }
document.addEventListener("keyup", controlkeys);
    
      
function Leftkey(){
        moveleft();
        combinerow();
        moveleft();
        genval();
       // boxcolors();
    }
function Rightkey(){
        moveright();
        combinerow();
        moveright();
        genval();
      //  boxcolors();
    }
function Upkey(){
        moveup();
        combinecol();
        moveup();
        genval();
      //  boxcolors();
    }
function Downkey(){
        movedown();
        combinecol();
        movedown();
        genval();
      //  boxcolors();
    }
function checkwin(){
        for(i=0;i<16;i++)
        {
            if(mat[i].innerHTML==2048)
            {
                document.getElementById("result").textContent="You Win "+playername+" Congrats!";
            }
        }
    }
     
function checkgameover() {
        let no_zero = 0;
        for (let i=0; i<16; i++) {
            if (mat[i].innerHTML===0) {  
                no_zero++;
            }
        }
        if (no_zero===0) {
            document.getElementById("result").getElementsByTagName("p")[0].textContent = "You Lose, "+playername+" Better luck next time!";
            document.removeEventListener('keyup', controlkeys);
 
        }
}
        
function boxcolors() {
    for (let i=0; i<mat.length; i++) {
      if (mat[i].innerHTML==0) 
        mat[i].style.backgroundColor ='#c3d2ff'
      else if (mat[i].innerHTML ==2) 
        mat[i].style.backgroundColor ='#5575d5'
      else if (mat[i].innerHTML  ==4) 
        mat[i].style.backgroundColor ='#3c559f'
      else if (mat[i].innerHTML  ==8) 
        mat[i].style.backgroundColor ='#2a4289'
      else if (mat[i].innerHTML  ==16) 
        mat[i].style.backgroundColor ='#23366e'
      else if (mat[i].innerHTML  ==32) 
        mat[i].style.backgroundColor ='#20305f'
      else if (mat[i].innerHTML ==64) 
        mat[i].style.backgroundColor ='#a74fa7'
      else if (mat[i].innerHTML ==128) 
        mat[i].style.backgroundColor ='#c36ecd'
      else if (mat[i].innerHTML ==256) 
        mat[i].style.backgroundColor ='#b645c3'
      else if (mat[i].innerHTML ==512) 
        mat[i].style.backgroundColor ='#992aa6'
      else if (mat[i].innerHTML ==1024) 
        mat[i].style.backgroundColor ='#82198d'
      else if (mat[i].innerHTML ==2048) 
        mat[i].style.backgroundColor ='#65076f'
    }
}

 
function reset() {
    for (let i=0; i<mat.length; i++) {
        mat[i].innerHTML= 0;
    }

    if (parseInt(top.innerHTML) < parseInt(score.innerHTML)) {
        top.innerHTML =score.innerHTML;
    }
    score.innerHTML =0;  
    genval();
    genval();
    boxcolors();

    document.getElementById("topsc").textContent=top.innerHTML;
    document.addEventListener("keyup", controlkeys);
    document.getElementById("result").getElementsByTagName("p")[0].textContent=" ";

}


 
