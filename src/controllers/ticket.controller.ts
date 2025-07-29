import TicketBodyFilter from '../lib/ticketBodyFilter.ts'
import SessionController from './session.controller.ts'

interface defaultReturn {
    success: boolean,
    data?: any
}

class TicketController {
    private apiURL
    private ticketURL
    private assignURL
    private sessionController
    private ticketBodyFilter

    constructor() {
        this.apiURL = import.meta.env.VITE_API_BASE_URL
        this.ticketURL = "/Ticket"
        this.assignURL = "/Ticket_User"
        this.sessionController = new SessionController()
        this.ticketBodyFilter = new TicketBodyFilter()
    }

    async createTicket(amount: number, ticket: string, techID: number, sessionToken: string | null): Promise<defaultReturn> {
        const data = await this.ticketBodyFilter.filter(ticket)

        for (let i = 1; i <= amount; i++) {
            const response = await this.genericRequest("POST", this.ticketURL, data, sessionToken)

            if (response.ok) {
                const ticketID = (await response.json()).id
                await this.assignTicket(ticketID, techID, sessionToken)
            } else {
                const errorData = await response.json()
                return {
                    success: false,
                    data: errorData
                }
            }
        }

        return { success: true }
    }

    private async assignTicket(ticketID: number, techID: number, sessionToken: string | null): Promise<defaultReturn> {
        const sessionUserID = (await this.sessionController.getSessionUserID(sessionToken)).data // id do usuário da sessão atual.
        
        let assignTech = [
            { input: { tickets_id: ticketID, users_id: sessionUserID, type: 1 } }
        ]
        if (techID !== 0) {
            assignTech.push({ input: { tickets_id: ticketID, users_id: techID, type: 2 } })
        }

        for (let assignment of assignTech) {
            const response = await this.genericRequest("POST", `${this.ticketURL}/${ticketID}${this.assignURL}`, assignment, sessionToken)
            if (!response.ok) {
                const errorData = await response.json()
                return {
                    success: false,
                    data: errorData
                }
            }
        }
        return { success: true}
    }

    private async genericRequest(method: string, endpoint: string, body: any, sessionToken: string | null) {
        return fetch(`${this.apiURL}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Session-Token': sessionToken ?? '',
            },
            body: JSON.stringify(body)
        })
    }
}

export default TicketController