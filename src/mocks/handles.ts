import { http, HttpResponse } from 'msw/http'

export const handlers = [
  http.get('/api/nft', () => {
    return HttpResponse.json({
      id: '', 
      Imageurl: '' ,    
      firstName: 'Emerald',
      Uni: '042',
      Price: '',
      Coin:''
    })
  }),
]
