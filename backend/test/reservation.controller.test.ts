import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {BackendApplication} from '../src/application';
import {ReservationRepository} from '../src/repositories';
import {juggler} from '@loopback/repository';

describe('ReservationController (Integration)', () => {
  let app: BackendApplication;
  let client: Client;
  let reservationRepository: ReservationRepository;

  before(async () => {
    app = new BackendApplication();

    const memoryDataSource = new juggler.DataSource({
      name: 'mongodb',
      connector: 'memory',
    });
    app.bind('datasources.mongodb').to(memoryDataSource);

    if (!app.booted) {
      await app.boot();
    }
    await app.start();

    app.bind('repositories.ReservationRepository').toClass(ReservationRepository);

    client = createRestAppClient(app);
    reservationRepository = await app.getRepository(ReservationRepository);
  });

  after(async () => {
    await app.stop();
  });

  it('should create a new reservation', async () => {
    const reservationData = {
      guestName: 'John Doe',
      guestContactInfo: 'john@example.com',
      expectedArrivalTime: '2025-04-06T00:00:00.000Z',
      reservedTableSize: 4,
      status: 'pending',
    };

    const response = await client
      .post('/reservations')
      .send(reservationData)
      .expect(200);

    expect(response.body).to.containDeep(reservationData);
  });

  it('should retrieve all reservations', async () => {
    await reservationRepository.create({
      guestName: 'Jane Doe',
      guestContactInfo: 'jane@example.com',
      expectedArrivalTime: '2025-04-07T00:00:00.000Z',
      reservedTableSize: 2,
      status: 'pending',
    });

    const response = await client.get('/reservations').expect(200);

    expect(response.body).to.be.Array();
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should retrieve a reservation by ID', async () => {
    const reservation = await reservationRepository.create({
      guestName: 'Alice Johnson',
      guestContactInfo: 'alice@example.com',
      expectedArrivalTime: '2025-04-07T00:00:00.000Z',
      reservedTableSize: 3,
      status: 'pending',
    });

    const response = await client.get(`/reservations/${reservation.id}`).expect(200);

    expect(response.body).to.containDeep({
      ...reservation,
      expectedArrivalTime: '2025-04-07T00:00:00.000Z',
    });
  });

  it('should update a reservation by ID', async () => {
    const reservation = await reservationRepository.create({
      guestName: 'Bob Smith',
      guestContactInfo: 'bob@example.com',
      expectedArrivalTime: '2025-04-08T00:00:00.000Z',
      reservedTableSize: 5,
      status: 'pending',
    });

    const updatedData = {reservedTableSize: 6};
    await client.patch(`/reservations/${reservation.id}`).send(updatedData).expect(204);

    const updatedReservation = await reservationRepository.findById(reservation.id);
    expect(updatedReservation.reservedTableSize).to.equal(6);
  });

  it('should delete a reservation by ID', async () => {
    const reservation = await reservationRepository.create({
      guestName: 'Charlie Brown',
      guestContactInfo: 'charlie@example.com',
      expectedArrivalTime: '2025-04-09T00:00:00.000Z',
      reservedTableSize: 3,
      status: 'pending',
    });

    await client.del(`/reservations/${reservation.id}`).expect(204);

    const deletedReservation = await reservationRepository.findById(reservation.id).catch(err => err);
    expect(deletedReservation).to.have.property('code', 'ENTITY_NOT_FOUND');
  });

  it('should filter reservations by date and status', async () => {
    await reservationRepository.create({
      guestName: 'John Doe',
      guestContactInfo: 'john@example.com',
      expectedArrivalTime: '2025-04-06T00:00:00.000Z',
      reservedTableSize: 4,
      status: 'pending',
    });

    const response = await client
      .get('/reservations/filter')
      .query({date: '2025-04-06', status: 'pending'})
      .expect(200);

    expect(response.body).to.have.length(2);
    expect(response.body[0].guestName).to.equal('John Doe');
  });

  it('should update the status of a reservation', async () => {
    const reservation = await reservationRepository.create({
      guestName: 'Alice Johnson',
      guestContactInfo: 'alice@example.com',
      expectedArrivalTime: '2025-04-07T00:00:00.000Z',
      reservedTableSize: 3,
      status: 'pending',
    });

    await client
      .patch(`/reservations/${reservation.id}/status`)
      .send({status: 'completed'})
      .expect(200);

    const updatedReservation = await reservationRepository.findById(reservation.id);
    expect(updatedReservation.status).to.equal('completed');
  });
});