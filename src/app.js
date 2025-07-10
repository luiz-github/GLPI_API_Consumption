// controllers
import SessionController from "./controllers/session.controller.js"
import TicketController from "./controllers/ticket.controller.js"

// new controllers instance
const session = new SessionController()
const ticket = new TicketController()

const token = await session.initSession("daniel.coelho", "Mudar@123")

// console.log(await ticket.getTicketFields(token.session_token))


session.killSession(token)
