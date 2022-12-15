import { randomUUID } from 'node:crypto';
import { Replace } from 'src/@helpers/replace';
import Content from './content';

interface NotificationsProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createAt: Date;
}

export default class Notification {
  private _id: string;
  private props: NotificationsProps;

  protected constructor(
    props: Replace<NotificationsProps, { createAt?: Date }>,
  ) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date(),
    };
    this.props.readAt = null;
  }

  static New(
    recipientId: string,
    content: string,
    category: string,
  ): Notification {
    return new Notification({
      recipientId,
      content: new Content(content),
      category,
    });
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public get content(): string {
    return this.props.content.value;
  }

  public get category(): string {
    return this.props.category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt() {
    return this.props.createAt;
  }
}
