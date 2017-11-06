'use strict'

const fp = require('fastify-plugin')
const Gun = require('gun')

function gunPlugin (fastify, opts, next) {
  opts.options = opts.options || {}

  const gun = new Gun(opts.options)

  fastify
    .decorate('gun', gun)
    .addHook('onClose', close)

  next()
}

function close (fastify, done) {
  done()
}

module.exports = fp(gunPlugin, '>=0.13.1')
