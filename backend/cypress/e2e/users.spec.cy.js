describe('Users endpoint', () => {

  // Api url
  const url = Cypress.env('URL');

  // JWT Token to be used in the tests as an admin
  let adminToken;

  // Save the user used in the tests
  let user;

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
  
  it('POST /api/v1/users', async() => {

    const response = await cy.request({
      method: 'POST',
      url: `${url}/api/v1/users`,
      body: { 
        name: "Seller",
        lastName: "Seller",
        email: "seller@marketmix.com",
        password: "contraseña123",
        role: "seller",
        phone: "3213213214"
      }
    });

    // Check status code
    expect(response.status).to.eq(201);
    // Check response message
    expect(response.body).to.have.property('message', 'User created');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('GET /api/v1/users', async() => {
      
    const response = await cy.request({
      method: 'GET',
      url: `${url}/api/v1/users`,
      headers: {
        "x-access-token": adminToken
      }
    });
    // Find the user created in the previous test
    user = response.body.data.find(user => user.email === "seller@marketmix.com");
    
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message');
    // Check response body
    expect(response.body).to.have.property('data');
  
  });

  it('PUT /api/v1/users/:id', async() => {
        
    const response = await cy.request({
      method: 'PUT',
      url: `${url}/api/v1/users/${user.id}`,
      headers: {
        "x-access-token": adminToken
      },
      body: { 
        password: "contraseña123",
        newPassword: "contraseña1234"
      }
    });
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'User password updated');
    // Check response body
    expect(response.body).to.have.property('data');

  });

  it('DELETE /api/v1/users/:id', async() => {
    
    const response = await cy.request({
      method: 'DELETE',
      url: `${url}/api/v1/users/${user.id}`,
      headers: {
        "x-access-token": adminToken
      }
    });
    // Check status code
    expect(response.status).to.eq(200);
    // Check response message
    expect(response.body).to.have.property('message', 'User deleted');
  });

})