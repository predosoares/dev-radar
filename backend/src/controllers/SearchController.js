const Dev = require("../models/Dev")
const parseStringAsArray = require("../utils/parseStringAsArray")

module.exports = {

    async index(request, response)
    {
        // Buscar devs num raio de até 10km que tenham interesse na mesma tecnologia
        const { latitude , longitude , techs } = request.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [ Number(longitude) , Number(latitude) ]
                    },
                    $maxDistance: 100000
                }
            }
        })

        return response.json({devs})
    }
}