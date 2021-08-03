import NotImplementExpection from '../expections/NotImplement'

export const NotImplementMiddleware = async () => {
  throw new NotImplementExpection()
}
