import TicketService from "../services/ticket.service.js";

const _ticketService = new TicketService();

export const createAllTickets = (general, preferential, vip, id) => {
    const names = ['General', 'Preferencial', 'VIP'];
    const types = [general, preferential, vip];
    const prices = [12000, 17000, 25000];
    const seats = ['G', 'P', 'V']
    try {
        types.forEach(async (type, index) => {
        for (let i = 0; i < type; i++) {
            let ticket = {
                seatNumber: seats[index]+(i+1),
                status: false,
                type: names[index],
                price: prices[index],
                movieRoomId: id
            }
            await _ticketService.createTicket(ticket);
        }
        });
    } catch (error) {
        console.log(error)
    }
}

export const validateIfHourExistsInDatabase = (array, hour) => {
    try {
       let exists;
        const hourExists = array.find(movieRoom => movieRoom.hour == `${hour}:00`);
        hourExists ? exists = true : exists = false;
        return exists; 
    } catch (error) {
        console.log(error);
    }
    
}