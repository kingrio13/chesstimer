
"use strict";

export default class Mychess{
    constructor() {
       this.player1="";
        this.player2="";
        this.timesetting="";
        
        
        this.timesetSpan=document.querySelectorAll('.timeset span');
        this.p1_time=document.querySelector('#p1_time');
       
        this.miketest=5;

        this.p2_time=document.querySelector('#p2_time');
        this.p1_btn=document.querySelector('#player1_btn');
        this.p2_btn=document.querySelector('#player2_btn');

        window.p1time={'min':1, 'sec':0};
        window.p2time={'min':1, 'sec':0}



        this.step1=document.querySelector('#chess_step1');
        this.step2=document.querySelector('#chess_step2');
        this.step3=document.querySelector('#chess_step3');

        this.stopgame=document.querySelector('#stopgame');

        this.cust_time=document.querySelector('#cust_time');
        this.customize_time=document.querySelector('#customize_time');

        this.timeincrement=0;
      

       
    }

eventListeners(){

    this.step1.classList.add('show');


    this.timesetSpan.forEach(timeset => timeset.addEventListener('click', event=>{this.selectTime(event)}));

    const playerName = document.querySelector('#playerName');
    playerName.addEventListener('click', event=>{
        event.preventDefault();
        this.nameAdded();
    });




    const start = document.querySelector('#start');
    start.addEventListener('click', event=>{
        event.preventDefault();
        this.startTime();
        this.step2.classList.remove('show');
        this.step3.classList.add('show');
    
        }
        );



    //data is preloaded.. needed to do another call

    this.p1_btn.addEventListener('click', event =>{
        event.preventDefault();
        //console.log("switch", window.p1time.min, window.p1time.sec);


        
        if(window.p1time.min==0 && window.p1time.sec==0){
            this.p1_btn.setAttribute('disabled', true);
            this.p1_btn.value+=" loss";
        }


        this.timerCountdownUpdate();
        this.timerCountDownp2(window.p2time.min, window.p2time.sec);
     

       //bring this to new function and get the updated date and time then change the content


        this.p1_btn.setAttribute('disabled', true);
        this.p2_btn.removeAttribute('disabled');
        clearInterval(newtimer);
        setInterval(newtimer2);
    })





    this.p2_btn.addEventListener('click', event =>{
        event.preventDefault();
        //console.log("switch", window.p1time.min, window.p1time.sec);

       
        this.timerCountdownUpdate2();
        this.timerCountDownp1(window.p1time.min, window.p1time.sec);
        
        this.p2_btn.setAttribute('disabled', true);
        this.p1_btn.removeAttribute('disabled');
        clearInterval(newtimer2);
        setInterval(newtimer);

        

    })


    this.stopgame.addEventListener('click', event=>{
       
        location.reload();
    });


    this.cust_time.addEventListener('click', event=>{
       this.customize_time.classList.add('show');
    })


}


timerCountdownUpdate(){

    let psec=parseInt(window.p1time.sec);
    let pmin=parseInt(window.p1time.min);
    window.p1time.sec=psec + parseInt(this.timeincrement);
    if(window.p1time.sec>=60){
        window.p1time.min=pmin + parseInt(1);
        window.p1time.sec-=parseInt(60);
    }

    if(window.p1time.sec<10){
        this.p1_time.textContent=window.p1time.min + ":0" + window.p1time.sec;
    }
    else{
        this.p1_time.textContent=window.p1time.min + ":" + window.p1time.sec;
    }
    

    
}


timerCountdownUpdate2(){

    let psec=parseInt(window.p2time.sec);
    let pmin=parseInt(window.p2time.min);
    window.p2time.sec=psec + parseInt(this.timeincrement);
    if(window.p2time.sec>=60){
        window.p2time.min=pmin + parseInt(1);
        window.p2time.sec-=parseInt(60);
    }


    if(window.p2time.sec<10){
        this.p2_time.textContent=window.p2time.min + ":0" + window.p2time.sec;
        console.log('hey')

    }else{
        this.p2_time.textContent=window.p2time.min + ":" + window.p2time.sec;
        console.log('hola')
    }
    

    
}





startTime(){
    this.p1_btn.removeAttribute('disabled', false);


    switch(this.timesetting) {
        case 'one_min':
            this.timesetting="1:00";
        
            window.p1time.sec=0;
            window.p1time.min=1;

            window.p2time.min=1;
            window.p2time.sec=0;

            
            break;
        
        case 'three_min':
            this.timesetting="3:00";
            window.p1time.min=3;
            window.p1time.sec=0;
            window.p2time.min=3;
            window.p2time.sec=0;
              break;
        
        case 'five_min':
            this.timesetting="5:00";
            window.p1time.min=5;
            window.p1time.sec=0;
            window.p2time.min=5;
            window.p2time.sec=0;
                break;

        case 'ten_min':
            this.timesetting="10:00";
            window.p1time.min=10;
            window.p1time.sec=0;
            window.p2time.min=10;
            window.p2time.sec=0;
            break;

        case 'cust_time':
            let cust_min=document.querySelector('#cust_min').value;
            let cust_sec=document.querySelector('#cust_sec').value;

            this.timeincrement=cust_sec;
 
            window.p1time.min=cust_min;
            window.p1time.sec=0;
            window.p2time.min=cust_min;
            window.p2time.sec=0;

            this.timesetting=cust_min + ":00";

            break;


            
        default:
            this.timesetting="1:00:00";
          // code block
      }
      

      const ptime=document.querySelectorAll('#chess_step3 .ptime');
      ptime.forEach(ptimes => ptimes.textContent=this.timesetting);
        this.timerCountDownp1(window.p1time.min, window.p1time.sec);
      
}






timerCountDownp1(pmin, psec){

    window.newtimer = setInterval(function() {
        
                if(psec==0 & pmin>=1){
                    psec=59;    
                    pmin-=1;                    
                    
                    //mike.test();
                    
                }else if(psec==0&& pmin==0){
                    pmin="00";
                    psec="0";
                    clearInterval(newtimer);
                  
                    let p1_btn=document.querySelector('#player1_btn');
                    let p2_btn=document.querySelector('#player2_btn');
                    
                    p1_btn.setAttribute('disabled', true);
                    p2_btn.setAttribute('disabled', true);
                    p1_btn.value+=" loss";
                }
                else{
                    psec-=1;
                
                }

                if(psec<10){
                    this.p1_time.textContent=pmin + ":0" + psec;
                }
                else{
                    this.p1_time.textContent=pmin + ":" + psec;
                }
                
                


                window.p1time.sec=psec;
                window.p1time.min=pmin;



               
              
           
                
                //console.log(p1Count.p1min, p1Count.p1sec, "-values insdie interval")
            },1000);

            

}





timerCountDownp2(pmin, psec){
    window.newtimer2 = setInterval(function() {
                if(psec==0 & pmin>=1){
                    psec=59;    
                    pmin-=1;    
                    
                    
                }else if(psec==0&& pmin==0){
                    pmin="00";
                    psec="0";
                    let p1_btn=document.querySelector('#player1_btn');
                    let p2_btn=document.querySelector('#player2_btn');
                    
                    p1_btn.setAttribute('disabled', true);
                    p2_btn.setAttribute('disabled', true);
                    p2_btn.value+=" loss";
                    clearInterval(newtimer2);
                }
                else{
                    psec-=1;
                    
                }

                if(psec<10){
                    this.p2_time.textContent=pmin + ":0" + psec;
                }
                else{
                    this.p2_time.textContent=pmin + ":" + psec;
                }
                

                
                window.p2time.sec=psec;
                window.p2time.min=pmin;

             


            },1000);
}








callWinner(){
    console.log('The winner is..');
}




nameAdded(){
    this.player1=document.getElementById('player1').value;
    this.player2=document.getElementById('player2').value;

    

    if(this.player1 && this.player2){
        const player1_btn=document.getElementById('player1_btn')
        player1_btn.value=this.player1;

        const player2_btn=document.getElementById('player2_btn')
        player2_btn.value=this.player2;


        this.step1.classList.remove('show');
        this.step2.classList.add('show');
        //go to step 2;
    }else{
        alert('We Need Name');
    }
}



selectTime(event) {
    const timesetSpan2=document.querySelectorAll('.timeset span');
    timesetSpan2.forEach(timeset => timeset.classList.remove('active'));
    event.target.classList="active";
    this.timesetting=event.target.id;
    // console.log(event);
    return this.timesetting;
  }


  


}//end of class


const mikeChess = new Mychess();

window.addEventListener("load", () => {
    mikeChess.eventListeners();
  });

