const schema: { [key: string]: string[] } = {
  User: ['posts'],
  Post: ['comments'],
  Group: ['users'],
}
export default schema
