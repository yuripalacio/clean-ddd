import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { makeLesson } from 'test/factories/make-lesson'
import { DeleteLessonUseCase } from './delete-lesson'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryLessonsRepository: InMemoryLessonsRepository
let sut: DeleteLessonUseCase

describe('Delete lesson', () => {
  beforeEach(() => {
    inMemoryLessonsRepository = new InMemoryLessonsRepository()
    sut = new DeleteLessonUseCase(inMemoryLessonsRepository)
  })

  it('should be able to delete a lesson', async () => {
    const newLesson = makeLesson({}, new UniqueEntityId('1'))

    await inMemoryLessonsRepository.create(newLesson)

    await sut.execute({
      lessonId: '1',
    })

    expect(inMemoryLessonsRepository.items).toHaveLength(0)
  })
})
