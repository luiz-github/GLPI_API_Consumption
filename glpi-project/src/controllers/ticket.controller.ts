import TicketBodyFilter from '../lib/ticketBodyFilter.ts'

class TicketController {
    apiURL = "https://www.suporte.unimontes.br/apirest.php"
    ticketURL = "/Ticket"

    async createTicket(amount: number, ticket: string, sessionToken: string | null) {
        const token = sessionToken
        const tbf = new TicketBodyFilter()
        const data = await tbf.filter(ticket)
        
        console.log(data, token)

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