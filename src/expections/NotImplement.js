import { StatusCodes, getStatusText } from 'http-status-codes'

export default function (message) {
  this.message = message || getStatusText(StatusCodes.NOT_IMPLEMENTED)
  this.status = StatusCodes.NOT_IMPLEMENTED
  this.name = 'NotImplementException'
}
