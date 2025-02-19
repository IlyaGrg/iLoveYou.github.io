document.getElementById('pink__btn').addEventListener('click' , function(){
    document.getElementById('button').classList.add('opacity')
    document.getElementById('pink__btn').innerHTML = 'Нажми на сердечко'
})
document.getElementById('button').addEventListener('click' , function(){
    document.getElementById('first__text').classList.add('opacity')
})
const btn = document.getElementById('btn')
const output = document.getElementById('output')
let i = 100
let mark = '-'
btn.addEventListener('click',function(){
    document.getElementById('second__text').classList.add('opacity')
    if(i<1000){
        const interval = setInterval(()=>{
            if(i<1000){
                i+=10
                output.innerHTML = "Я люблю тебя на " + i + " %";
            }
            else{
                clearInterval(interval)
                output.innerHTML = "Я бесконечно сильно люблю тебя"
                mark = '+'  
            }
        },50)
    }
    document.getElementById('third__text').classList.add('opacity')
})
const btn1 = document.getElementById('btn1')
btn1.addEventListener('click' , function(){
    document.getElementById('four__text').classList.add('opacity')
})
document.getElementById('btn2').addEventListener('click' , function(){
    document.getElementById('five__text').classList.add('opacity')
})










    

