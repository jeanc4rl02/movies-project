describe('Tickets endpoint', async() => {

  // Api url
  const url = Cypress.env('URL');
  
  // JWT Token to be used in the tests as an admin
  let adminToken;

  // Save the ticket used in the tests
  let ticket;

  it('POST /api/v1/users/login', async() => {
    const response = await cy.request({
      method: 'POST',
      url: `${url}/api/v1/users/login`,
      body: { 
        email: "admin@email.com",
        password: "contraseña123"
      }
    });
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'User logged in');
    // Check response body
    expect(response.body).to.have.property('data');
    // Save the token to be used in the next test
    adminToken = response.body.data.token;
  });
  
  it('GET /api/v1/tickets', async() => {

    const response = await cy.request({
      method: 'GET',
      url: `${url}/api/v1/tickets`
    });

    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Tickets found');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('POST /api/v1/tickets', async() => {
      
    const response = await cy.request({
      method: 'POST',
      url: `${url}/api/v1/tickets`,
      headers: {
        "x-access-token": adminToken
      },
      body: {
        seatNumber: "Z4",
        status: true,
        type: "VIP",
        price: 20000,
        movieRoomId: 2
      }
    });
    
    // Save the ticket to be used in the next test
    ticket = response.body.data;
    
    // Check status code
    expect(response.status).to.eq(201);
    // Check response message
    expect(response.body).to.have.property('message', 'Ticket created');
    // Check response body
    expect(response.body).to.have.property('data');
  
  });

  it('GET /api/v1/tickets/movieRoom/:id', async() => {

    const response = await cy.request({
      method: 'GET',
      url: `${url}/api/v1/tickets/movieRoom/${ticket.movieRoomId}`,
    });

    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Tickets found');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('PUT /api/v1/tickets/:id', async() => {
        
    const response = await cy.request({
      method: 'PUT',
      url: `${url}/api/v1/tickets/${ticket.id}`,
      headers: {
        "x-access-token": adminToken
      },
      body: { 
        status: false,
      }
    });
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Ticket updated');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('DELETE /api/v1/tickets/:id', async() => {
    
    const response = await cy.request({
      method: 'DELETE',
      url: `${url}/api/v1/tickets/${ticket.id}`,
      headers: {
        "x-access-token": adminToken
      }
    });
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Ticket deleted');
  });

})