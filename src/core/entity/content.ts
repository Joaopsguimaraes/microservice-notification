export default class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);
    if (!isContentLengthValid) {
      throw new Error('Error content length');
    }
    this.content = content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
