import { Either, left, right } from '@/core/either'
import { Lesson } from '../../enterprise/entities/lesson'
import { LessonsRepository } from '../repositories/lessons-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditLessonUseCaseRequest {
  lessonId: string
  title: string
  content: string
}

type EditLessonUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    lesson: Lesson
  }
>

export class EditLessonUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    lessonId,
    title,
    content,
  }: EditLessonUseCaseRequest): Promise<EditLessonUseCaseResponse> {
    const lesson = await this.lessonsRepository.findById(lessonId)

    if (!lesson) {
      return left(new ResourceNotFoundError())
    }

    lesson.title = title
    lesson.content = content

    await this.lessonsRepository.save(lesson)

    return right({
      lesson,
    })
  }
}
