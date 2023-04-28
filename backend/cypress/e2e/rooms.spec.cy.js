describe('Rooms endpoint', async() => {

  // Api url
  const url = Cypress.env('URL');
  
  // JWT Token to be used in the tests as an admin
  let adminToken;

  // Save the room used in the tests
  let room;

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
  
  it('GET /api/v1/rooms', async() => {

    const response = await cy.request({
      method: 'GET',
      url: `${url}/api/v1/rooms`
    });

    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Rooms found');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('POST /api/v1/rooms', async() => {
      
    const response = await cy.request({
      method: 'POST',
      url: `${url}/api/v1/rooms`,
      headers: {
        "x-access-token": adminToken
      },
      body: {
        name: "Room test",
        capacity: 100,
        status: "active",
        cinemaId: 5
      }
    });
    
    // Save the room to be used in the next test
    room = response.body.data;
    
    // Check status code
    expect(response.status).to.eq(201);
    // Check response message
    expect(response.body).to.have.property('message');
    // Check response body
    expect(response.body).to.have.property('data');
  
  });

  it('GET /api/v1/rooms/cinema/:id', async() => {

    const response = await cy.request({
      method: 'GET',
      url: `${url}/api/v1/rooms/cinema/${room.cinemaId}`,
    });

    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Rooms found');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('PUT /api/v1/rooms/:id', async() => {
        
    const response = await cy.request({
      method: 'PUT',
      url: `${url}/api/v1/rooms/${room.id}`,
      headers: {
        "x-access-token": adminToken
      },
      body: { 
        status: "busy",
      }
    });
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Room updated');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('DELETE /api/v1/rooms/:id', async() => {
    
    const response = await cy.request({
      method: 'DELETE',
      url: `${url}/api/v1/rooms/${room.id}`,
      headers: {
        "x-access-token": adminToken
      }
    });
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'Room deleted');
  });

})