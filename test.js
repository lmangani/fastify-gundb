'use strict'

const t = require('tap')
const test = t.test
const rimraf = require('rimraf')
const Fastify = require('fastify')
const gunPlugin = require('./')

t.tearDown(() => {
  rimraf('./test', err => {
    if (err) throw err
  })
})

test('gun namespace should exist', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify
    .register(gunPlugin, { name: 'test' })
    .ready(err => {
      t.error(err)
      t.ok(fastify.gun)
      fastify.close(() => {
        t.pass('unlock')
      })
    })
})

test('gun should support gundb operations', t => {
  t.plan(2)

  const fastify = Fastify()
  fastify
    .register(gunPlugin, { name: 'test' })
    .ready(err => {
      t.error(err)
      fastify.gun.get('test').set('d').once(function (val) {
        if (!val) t.error('no data')
        t.equal('d', val)
      })
    })
})
