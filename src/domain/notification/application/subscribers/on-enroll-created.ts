import { DomainEvents } from '@/core/events/domain-envets'
import { EventHandler } from '@/core/events/event-handler'
import { EnrollCreatedEvent } from '@/domain/event/enterprise/events/enroll-created-event'

export class OnEnrollCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewEnrollNotification.bind(this),
      EnrollCreatedEvent.name,
    )
  }

  private async sendNewEnrollNotification({ enroll }: EnrollCreatedEvent) {
    console.log(enroll)
  }
}
