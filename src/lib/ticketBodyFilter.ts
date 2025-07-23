class TicketBodyFilter {
    async filter(ticket: string) {
        try {
            const title = ticket.split('\n')[0];
            const description = ticket.split('\n').slice(1).join('\n');

            let data = {
                input: {
                    name: title,
                    content: description,
                    locations_id: 1
                }
            }
            return data
    
        } catch (err) {
            if (err) throw err;
        }
    }
}

export default TicketBodyFilter