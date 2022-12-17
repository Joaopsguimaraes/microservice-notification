import Content from './content';
describe('Unit test content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce tem uma notificação');
    expect(content).toBeTruthy();
  });
  it("shouldn't be able to create a notification content with less than 5 characters", () => {
    expect(() => new Content('aaa')).toThrowError();
  });
  it("shouldn't be able to create a notification content with more than 240 characters", () => {
    expect(() => new Content('a'.repeat(255))).toThrowError();
  });
});
