import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface EnrollProps {
  lessonId: UniqueEntityId
  studentId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Enroll extends Entity<EnrollProps> {
  get lessonId() {
    return this.props.lessonId
  }

  get studentId() {
    return this.props.studentId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<EnrollProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const enroll = new Enroll(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return enroll
  }
}
