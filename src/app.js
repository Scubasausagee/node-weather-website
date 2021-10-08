const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('../utils/geocode')
const forecast=require('../utils/forecast')

const app=express()

//define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const publicDirrPath = path.join(__dirname, '../public')
const partialsPath =path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static dirrectory to use
app.use(express.static(publicDirrPath))

app.get('',(req,res)=>
{
    res.render('index',{
        title: 'weather app',
        name: 'Alek Atanasoski'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        message: "Contact admin fo more info",
        title: 'Help',
        name:'Alek Atanasoski'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',
    {
        title:'About me',
        name:'Alek Atanasoski'
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send(
            {
                error: 'Please provide an address'
            }
        )
    }

    geocode(req.query.address, (error, { location, longitude, latitude } = {}) => {
        if (error) 
        { 
            return res.send({
                error
            }) 
        }
        forecast(latitude, longitude, (er, d) => {
            if (er) { 
                return res.send({
                    er
                }) 
            }
            
            res.send(
                {
                    Location:location,
                    Data:d,
                    address:req.query.address
                }
            )
        })
    })
})

app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*',(req,res)=>
{
    res.render('404',
    {
        message:"Help article not found",
        title:'404',
        name:'Alek Atanasoski'
    })
})

app.get('*',(req,res)=>
{
    res.render('404',
    {
        message:'Page not found',
        title:'404',
        name:'Alek Atanasoski'
    })
})

app.listen(3000,()=>
{
    console.log('server is up on port 3000')
})