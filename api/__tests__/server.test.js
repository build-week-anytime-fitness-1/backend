const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] /api/auth/register', () => {
  test('responds with a new user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username:'Steve',
        password: 'dsfsdfsd',
        first_name: 'Steve',
        last_name: 'Stevenson',
        email:'sfsdfsdfsdf@fdgdfgd.dfgdf'
      });
    expect(res.body[0].username).toEqual('Steve');
  });
  test('responds with 400 error if username or password is missing', async () => {
    let res = await request(server)
      .post('/api/auth/register')
      .send({ username: '', password: '1234' });
    expect(res.status).toBe(400);
    res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Tom23', password: '' });
    expect(res.status).toBe(400);
  });
});

describe('[POST] /api/auth/login', () => {
  test('responds with correct message on successful login', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ 
        username:'Steve',
        password: 'dsfsdfsd',
        first_name: 'Steve',
        last_name: 'Stevenson',
        email:'sfsdfsdfsdf@fdgdfgd.dfgdf'
       });
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Steve', password: 'dsfsdfsd' });
    expect(res.body.message).toMatch(/welcome, steve/i);
  });
  test('responds with correct status and message on invalid credentials', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'Tom23', password: '1234' });
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Tom23', password: 'password' });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });
});


