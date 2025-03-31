import axios from 'axios'

const getCurrentCountryByIp = () => axios.get('http://ip-api.com/json/')

export { getCurrentCountryByIp }
