# fastify-gundb

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://travis-ci.org/lmangani/fastify-gundb.svg?branch=master)](https://travis-ci.org/lmangani/fastify-gundb)


Fastify [GunDB](http://gundb.io) connection plugin, with this you can share a Gun instance in every part of your server.

## Install
```
npm i fastify-gundb --save
```
## Usage
Add it to you project with `register` and you are done!  
You can access Gun via `fastify.gun`.
```js
const fastify = require('fastify')

fastify.register(require('fastify-gundb'), {
  name: 'db'
}, err => {
  if (err) throw err
})

fastify.get('/foo', (req, reply) => {
  const { gun } = fastify.gun
  gun.get(req.query.key, (val) => {
    if (!val) val = { status: 404 }  
    reply.send(val)
  })
})

fastify.post('/foo', (req, reply) => {
  const { gun } = fastify.gun
  
  gun.get('key').put({hello: "world"}, function(ack){
    if (!ack) val = { status: 404 }  
    else reply.send({ status: 'ok' })
  })
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

## Acknowledgements

This project is kindly sponsored by:
- [QXIP](http://qxip.net)

Fastify is kindly sponsored by:
- [nearForm](http://nearform.com)
- [LetzDoIt](http://www.letzdoitapp.com/)

## License

Licensed under [MIT](./LICENSE).
