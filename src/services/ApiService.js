import axios from 'axios'

const token = 'f52c189c1bcbbf87b67ec786967e3351'
// const regex = /^[0-9]+$/

class SuperheroService {
  constructor() {
    this.superheros = []
  }

  async fetchSuperheroById(id) {
    try {
      const url = `https://superheroapi.com/api.php/${token}/${id}`
      const { data } = await axios.get(url)
      console.log(data)
      return data
    } catch (error) {
      console.error('Error al traer la data:', error)
      return null
    }
  }
}

export default new SuperheroService()
