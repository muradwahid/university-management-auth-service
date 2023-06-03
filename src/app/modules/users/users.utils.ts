// let lastUserId = 0;

import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: true, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incrementId = (Number(currentId) + 1).toString().padStart(5, '0')
  return incrementId
  // lastUserId++
  // return String(lastUserId).padStart(5,'0')
}
