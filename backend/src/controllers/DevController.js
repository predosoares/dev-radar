const axios = require("axios")
const Dev = require("../models/Dev")
const parseStringAsArray = require("../utils/parseStringAsArray")

// index, show, store, destroy, update

module.exports = {
    async index(request, response) {
        const devs = await Dev.find()

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username , techs , latitude , longitude } = request.body

        console.log(request.body)

        let dev = await Dev.findOne( { github_username } )

        if (!dev)
        {
            const githubrApiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            console.log( githubrApiResponse.data )
    
            const { name = login , avatar_url, bio } = githubrApiResponse.data
    
            const techsArray = parseStringAsArray(techs)
    
            const location = {
                type: "Point",
                coordinates: [ Number(longitude), Number(latitude) ]
            }
    
            dev = await Dev.create({
                name,
                avatar_url,
                bio,
                github_username,
                techs: techsArray,
                location
            })
        }

        return response.json(dev)
    }
}