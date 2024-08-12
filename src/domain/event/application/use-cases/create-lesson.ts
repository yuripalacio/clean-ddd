import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { LessonsRepository } from '../repositories/lessons-repository'
import { Lesson } from '../../enterprise/entities/lesson'
import { Either, right } from '@/core/either'
import { LessonAttachment } from '../../enterprise/entities/lesson-attachment'

interface CreateLessonUseCaseRequest {
  teacherId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateLessonUseCaseResponse = Either<
  null,
  {
    lesson: Lesson
  }
>

export class CreateLessonUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    teacherId,
    title,
    content,
    attachmentsIds,
  }: CreateLessonUseCaseRequest): Promise<CreateLessonUseCaseResponse> {
    const lesson = Lesson.create({
      content,
      teacherId: new UniqueEntityId(teacherId),
      title,
    })

    const lessonAttachments = attachmentsIds.map((attachmentsId) => {
      return LessonAttachment.create({
        attachmentId: new UniqueEntityId(attachmentsId),
        lessonId: lesson.id,
      })
    })

    lesson.attachments = lessonAttachments

    await this.lessonsRepository.create(lesson)

    return right({
      lesson,
    })
  }
}
