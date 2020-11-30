
for (let i=0; i<9; i++){
  const pole = document.getElementById('pole');
  pole.innerHTML +=`<div class="block"></div>`;
 }
 
 let hod = 0;
 
 const pole = document.getElementById('pole');
 
 pole.onclick = function (event) {
   if(!event.target.innerHTML){
     if(event.target.className == 'block'){
       if (hod%2==0){
         event.target.innerHTML = 'x';
       }else{
         event.target.innerHTML = '0';
       }
       hod++
       winFun();
     }
   }else{
     alert('Эта ячейка занята!');
   }
 }
 
 function winFun (){
   let blockAll = document.querySelectorAll('.block')
   if(blockAll[0].innerHTML === 'x' && blockAll[1].innerHTML === 'x' && blockAll[2].innerHTML === 'x') (alert('Победили крестики!'));
   if(blockAll[3].innerHTML === 'x' && blockAll[4].innerHTML === 'x' && blockAll[5].innerHTML === 'x') (alert('Победили крестики!'));
   if(blockAll[6].innerHTML === 'x' && blockAll[7].innerHTML === 'x' && blockAll[8].innerHTML === 'x') (alert('Победили крестики!'));
   if(blockAll[0].innerHTML === 'x' && blockAll[4].innerHTML === 'x' && blockAll[8].innerHTML === 'x') (alert('Победили крестики!'));
   if(blockAll[2].innerHTML === 'x' && blockAll[4].innerHTML === 'x' && blockAll[6].innerHTML === 'x') (alert('Победили крестики!'));
   if(blockAll[0].innerHTML === 'x' && blockAll[3].innerHTML === 'x' && blockAll[6].innerHTML === 'x') (alert('Победили крестики!'));
   if(blockAll[1].innerHTML === 'x' && blockAll[4].innerHTML === 'x' && blockAll[7].innerHTML === 'x') (alert('Победили крестики!'));
   if(blockAll[2].innerHTML === 'x' && blockAll[5].innerHTML === 'x' && blockAll[8].innerHTML === 'x') (alert('Победили крестики!'));
 
   if(blockAll[0].innerHTML === '0' && blockAll[1].innerHTML === '0' && blockAll[2].innerHTML === '0') (alert('Победили нолики!'));
   if(blockAll[3].innerHTML === '0' && blockAll[4].innerHTML === '0' && blockAll[5].innerHTML === '0') (alert('Победили нолики!'));
   if(blockAll[6].innerHTML === '0' && blockAll[7].innerHTML === '0' && blockAll[8].innerHTML === '0') (alert('Победили нолики!'));
   if(blockAll[0].innerHTML === '0' && blockAll[4].innerHTML === '0' && blockAll[8].innerHTML === '0') (alert('Победили нолики!'));
   if(blockAll[2].innerHTML === '0' && blockAll[4].innerHTML === '0' && blockAll[6].innerHTML === '0') (alert('Победили нолики!'));
   if(blockAll[0].innerHTML === '0' && blockAll[3].innerHTML === '0' && blockAll[6].innerHTML === '0') (alert('Победили нолики!'));
   if(blockAll[1].innerHTML === '0' && blockAll[4].innerHTML === '0' && blockAll[7].innerHTML === '0') (alert('Победили нолики!'));
   if(blockAll[2].innerHTML === '0' && blockAll[5].innerHTML === '0' && blockAll[8].innerHTML === '0') (alert('Победили нолики!'));
   };
 