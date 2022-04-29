const express=require("express")
const app=express()

const body=require('body-parser')
app.use(body.urlencoded({extended:true}))

const https=require('https')

const js=require('ejs')
app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'))

app.get('/', function(req,res){
    res.render('index',{weather:detail})
})

let detail=['0']

app.post('/city',function(req,res){
    let a=req.body.cityname
    const url="https://api.openweathermap.org/data/2.5/weather?q="+a+"&appid=b13875a8ec8ebb0844f86c5bd9aebef8&units=metric"
    https.get(url,function(res){
        res.on('data',function(data){
            const report=JSON.parse(data);
            detail[0]=(report.main.temp_max)
            detail[1]=(report.main.temp_min)
            detail[2]=(report.visibility)/1000
            detail[3]=(report.wind.speed)
            detail[4]=(report.wind.deg)
        })
    })
    res.render('index',{weather:detail})
})

app.post('/new_city',function(req,res){
    let b=req.body.cityName
    const url="https://api.openweathermap.org/data/2.5/weather?q="+b+"&appid=b13875a8ec8ebb0844f86c5bd9aebef8&units=metric"
    https.get(url,function(res){
        res.on('data',function(data){
            const report=JSON.parse(data);
            detail[0]=(report.main.temp_max)
            detail[1]=(report.main.temp_min)
            detail[2]=(report.visibility)/1000
            detail[3]=(report.wind.speed)
            detail[4]=(report.wind.deg)
        })
    })
    res.render('index',{weather:detail})
})


app.listen(3000,function(){
    console.log("Server added successfully!")
})