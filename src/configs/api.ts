import axios from 'axios'

export const api = axios.create({
    //baseURL: 'https://pan-dfb0dc725766.herokuapp.com',
    baseURL: 'http://192.168.1.11:3333/'
    // headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     'X-Parse-Application-Id': 'ry1MTkipoMEZ92Wauhho8eqzqxuYyM59kYGskR38',
    //     'X-Parse-REST-API-Key': 'wKyBO5KwCNfRlMCVWUCVkCQ8wJ3q40wFxYfqAh1B',
    //   }
}); 
