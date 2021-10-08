const weatherForm=document.querySelector('form')
const search=document.querySelector('input')


weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location=search.value

    const n = document.querySelector(".main-content")
    if (n.lastChild.nodeType===1)
    {
        n.removeChild(n.lastChild)
    }
    const LoadingDiv = document.createElement('div')
    const P = document.createElement('p')
    const D = document.createTextNode("Loading...")
    P.appendChild(D)
    LoadingDiv.appendChild(P)
    const b = document.querySelector(".main-content")
    b.appendChild(LoadingDiv)

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                const newDiv=document.createElement('div')
                const errorP=document.createElement('p')
                const textData=document.createTextNode(data.error)
                errorP.appendChild(textData)
                newDiv.appendChild(errorP)
                const bodySelector=document.querySelector(".main-content")
                bodySelector.appendChild(newDiv)
                return
            }
            const newDiv = document.createElement('div')
            const locationP = document.createElement('p')
            const forecastP = document.createElement('p')
            const textLocation = document.createTextNode(data.Location)
            const textForecast = document.createTextNode(data.Data)
            locationP.appendChild(textLocation)
            forecastP.appendChild(textForecast)
            newDiv.appendChild(locationP)
            newDiv.appendChild(forecastP)
            const bodySelector = document.querySelector(".main-content")
            bodySelector.removeChild(LoadingDiv)
            bodySelector.appendChild(newDiv)
        })
    })

    
})