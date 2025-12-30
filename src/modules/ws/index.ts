import Elysia from "elysia";

export default new Elysia({
  name: 'websocket'
})
.ws('/ws', {
  open(ws) {
    console.log('socket connected')
  },
  message(ws, message) {
    console.log('Socket Connected')
  }
})
