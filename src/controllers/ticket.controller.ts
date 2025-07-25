import TicketBodyFilter from '../lib/ticketBodyFilter.ts'
import SessionController from './session.controller.ts'
// import SessionController from './session.controller.ts'

class TicketController {
    apiURL = import.meta.env.VITE_API_BASE_URL
    ticketURL = "/Ticket"
    assignURL = "/Ticket_User"

    async createTicket(amount: number, ticket: string, techID: number, sessionToken: string | null) {
        const tbf = new TicketBodyFilter()
        const data = await tbf.filter(ticket)

        for (let i = 1; i <= amount; i++) {
            const response = await fetch(
                `${this.apiURL}${this.ticketURL}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Session-Token': `${sessionToken}`,
                    },
                    body: JSON.stringify(data)
                }
            )
            const ticketID = (await response.json()).id // Retorna um objeto com: id, message.
            await this.assignTicket(ticketID, techID, sessionToken)
        }
    }

    private async assignTicket(ticketID: number, techID: number, sessionToken: string | null) {
        const session = new SessionController()
        const sessionUserID = await session.getSessionUserID(sessionToken) // id do usuário da sessão atual.
        let assignTech = [
            {
                input: {
                    tickets_id: ticketID,
                    users_id: sessionUserID,
                    type: 1,
                }
            },
            {
                input: {
                    tickets_id: ticketID,
                    users_id: techID,
                    type: 2,
                }
            }
        ]

        if (techID === 0) {
            assignTech.pop()
        }

        for (let i = 0; i < assignTech.length; i++) {
            await fetch(
                `${this.apiURL}${this.ticketURL}/${ticketID}${this.assignURL}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Session-Token': `${sessionToken}`,
                    },
                    body: JSON.stringify(assignTech[i])
                }
            )
        }
    }
}

export default TicketController