import { makeEnroll } from 'test/factories/make-enroll'
import { OnEnrollCreated } from './on-enroll-created'
import { InMemoryEnrollsRepository } from 'test/repositories/in-memory-enrolls-repository'

let inMemoryEnrollsRepository: InMemoryEnrollsRepository

describe('On Enroll Created', () => {
  beforeEach(() => {
    inMemoryEnrollsRepository = new InMemoryEnrollsRepository()
  })
  it('should send a notification when an enroll is created', () => {
    const onEnrollCreated = new OnEnrollCreated()

    const enroll = makeEnroll()

    inMemoryEnrollsRepository.create(enroll)
  })
})
