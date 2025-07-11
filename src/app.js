// controllers
import SessionController from "./controllers/session.controller.js"
import TicketController from "./controllers/ticket.controller.js"

// new controllers instance
const session = new SessionController()
const ticket = new TicketController()

const token = await session.initSession("y", "x")

session.killSession(token)
