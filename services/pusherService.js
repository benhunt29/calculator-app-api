const Pusher = require('pusher')

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'us2',
  encrypted: true
})

const getPusher = () => {
  return pusher
}

const push = ({channel, event, payload}) => {
  if (channel && event) {
    getPusher().trigger(channel, event, payload)
  }
}

module.exports = {
  push
}
