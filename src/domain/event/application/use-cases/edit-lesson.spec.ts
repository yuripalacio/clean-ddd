import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { makeLesson } from 'test/factories/make-lesson'
import { EditLessonUseCase } from './edit-lesson'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryLessonsRepository: InMemoryLessonsRepository
let sut: EditLessonUseCase

describe('Edit lesson', () => {
  beforeEach(() => {
    inMemoryLessonsRepository = new InMemoryLessonsRepository()
    sut = new EditLessonUseCase(inMemoryLessonsRepository)
  })

  it('should be able to edit a lesson', async () => {
    const newLesson = makeLesson(
      {
        title: 'Old Title',
        content: 'Old content',
      },
      new UniqueEntityId('1'),
    )

    await inMemoryLessonsRepository.create(newLesson)

    await sut.execute({
      lessonId: '1',
      title: 'New title',
      content: 'New content',
    })

    expect(inMemoryLessonsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })
})
