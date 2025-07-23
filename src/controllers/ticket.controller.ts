import TicketBodyFilter from '../lib/ticketBodyFilter.ts'

class TicketController {
    apiURL = import.meta.env.VITE_API_BASE_URL
    ticketURL = "/Ticket"

    async createTicket(amount: number, ticket: string, sessionToken: string | null) {
        const tbf = new TicketBodyFilter()
        const data = await tbf.filter(ticket)

        for (let i = 1; i <= amount; i++) {
            await fetch(
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
        }
    }
}

export default TicketController