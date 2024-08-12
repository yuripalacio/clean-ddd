import { Either, left, right } from '@/core/either'
import { EnrollsRepository } from '../repositories/enrolls-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteEnrollUseCaseRequest {
  enrollId: string
  studentId: string
}

type DeleteEnrollUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteEnrollUseCase {
  constructor(private enrollsRepository: EnrollsRepository) {}

  async execute({
    enrollId,
    studentId,
  }: DeleteEnrollUseCaseRequest): Promise<DeleteEnrollUseCaseResponse> {
    const enroll = await this.enrollsRepository.findById(enrollId)

    if (!enroll) {
      return left(new ResourceNotFoundError())
    }

    if (enroll.studentId.toString() !== studentId) {
      return left(new NotAllowedError())
    }

    await this.enrollsRepository.delete(enroll)

    return right({})
  }
}
