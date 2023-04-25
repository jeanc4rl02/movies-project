import {createTickets} from "../services/room.service";

const createAllTickets = (general, preferential, vip, id) => {
    const names = ['General', 'Preferencial', 'VIP'];
    const types = [general, preferential, vip];
    const prices = [12000, 17000, 25000];
    const seats = ['A', 'B', 'C']
    types.forEach(async (type, index) => {
        for (let i = 0; i < type; i++) {
            let ticket = {
                seat_number: seats[index]+i+1,
                status: false,
                type: names[index],
                price: prices[index],
                movieRoomId: id
            }
            // await createTickets(ticket);
        }
    });
}


createAllTickets(1, 2, 3, 1);