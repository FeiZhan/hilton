import {createRestAppClient, expect} from '@loopback/testlab';
import {ReservationRepository} from '../src/repositories';
import {Reservation} from '../src/models';
import {BackendApplication} from '../src/application';
import {juggler} from '@loopback/repository';

describe('ReservationRepository (Unit)', () => {
  let app: BackendApplication;
  let reservationRepository: ReservationRepository;

  before(async () => {
    app = new BackendApplication();
    const memoryDataSource = new juggler.DataSource({
      name: 'mongodb',
      connector: 'memory',
    });
    app.bind('datasources.mongodb').to(memoryDataSource);
    reservationRepository = new ReservationRepository(memoryDataSource);

    if (!app.booted) {
      await app.boot();
    }
    await app.start();

    app.bind('repositories.ReservationRepository').toClass(ReservationRepository);

    createRestAppClient(app);
  });

  after(async () => {
    await app.stop();
  });

  it('should find reservations by date and status', async () => {
    const mockReservations: Reservation[] = [
      new Reservation({
        guestName: 'John Doe',
        guestContactInfo: 'john@example.com',
        expectedArrivalTime: '2025-04-06',
        reservedTableSize: 4,
        status: 'pending',
      }),
      new Reservation({
        guestName: 'Jane Smith',
        guestContactInfo: 'jane@example.com',
        expectedArrivalTime: '2025-04-06',
        reservedTableSize: 2,
        status: 'completed',
      }),
    ];
    await reservationRepository.createAll(mockReservations);

    const result = await reservationRepository.findByDateAndStatus(
      '2025-04-06',
      'pending',
    );

    expect(result).to.have.length(1);
    expect(result[0].guestName).to.equal('John Doe');
    expect(result[0].status).to.equal('pending');
  });

  it('should update the status of a reservation', async () => {
    const mockReservation = await reservationRepository.create({
      guestName: 'Alice Johnson',
      guestContactInfo: 'alice@example.com',
      expectedArrivalTime: '2025-04-07',
      reservedTableSize: 3,
      status: 'pending',
    });

    const success = await reservationRepository.updateStatus(
      mockReservation.id as string,
      'completed',
    );

    expect(success).to.be.true();
    const updatedReservation = await reservationRepository.findById(
      mockReservation.id as string,
    );
    expect(updatedReservation.status).to.equal('completed');
  });
});