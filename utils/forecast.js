const request=require('postman-request')

const forecast=(longitude,latitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=7fd354af84084f4994a454f9d01cf70e&query='+latitude+','+longitude
    request({ url, json:true },(error,{body})=>
    {
        if(error)
        {
            callback('Unable to connect to weather services',undefined)
        }else if(body.error)
        {
            callback('Unable to find location',undefined)
        }else
        {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + 
            ' degrees out. The  humidity is ' + body.current.humidity+"%.")
        }
    })
}

module.exports=forecast