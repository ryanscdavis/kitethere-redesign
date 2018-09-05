const axios = require('axios')


function convertSpot (old) {

    let spot = {}
  
    spot.lat = old.position.lat
    spot.lng = old.position.lng
    
    spot.name = old.name
    spot.description = old.description
    spot.sections = []
    spot.images = []
  
    old.sections.forEach((sec,i) => {
        spot.sections.push({
            heading: sec.heading,
            body: sec.body,
            index: i
        })
    })
  
    old.images.forEach((img,i) => {
        spot.images.push({
            name: img.name,
            index: i
        })
    })
  
    return spot

}

axios({

  method: 'get',
  url: 'https://www.kitethere.com/api/spots'

}).then(response => {

  const spots = response.data

  spots.forEach(oldSpot => {

    const newSpot = convertSpot(oldSpot)

    axios({
      method: 'post',
      url: 'http://172.18.0.3:8000/spots',
      data: newSpot
    }).then(()=> {
      console.log('success')
    }).catch(err => {
      console.log('fail')
    })
  })

}).catch(err => {

  console.error(err)

})