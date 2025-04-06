import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Reservation} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository : ReservationRepository,
  ) {}

  @post('/reservations')
  @response(200, {
    description: 'Reservation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservation',
            exclude: ['id'],
          }),
        },
      },
    })
    reservation: Omit<Reservation, 'id'>,
  ): Promise<Reservation> {
    return this.reservationRepository.create(reservation);
  }

  @get('/reservations/count')
  @response(200, {
    description: 'Reservation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reservation) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.reservationRepository.count(where);
  }

  @get('/reservations')
  @response(200, {
    description: 'Array of Reservation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reservation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reservation) filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.reservationRepository.find(filter);
  }

  @patch('/reservations')
  @response(200, {
    description: 'Reservation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
    @param.where(Reservation) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.reservationRepository.updateAll(reservation, where);
  }

  @get('/reservations/{id}')
  @response(200, {
    description: 'Reservation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reservation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reservation, {exclude: 'where'}) filter?: FilterExcludingWhere<Reservation>
  ): Promise<Reservation> {
    return this.reservationRepository.findById(id, filter);
  }

  @patch('/reservations/{id}')
  @response(204, {
    description: 'Reservation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.updateById(id, reservation);
  }

  @put('/reservations/{id}')
  @response(204, {
    description: 'Reservation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.replaceById(id, reservation);
  }

  @del('/reservations/{id}')
  @response(204, {
    description: 'Reservation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reservationRepository.deleteById(id);
  }

  @get('/reservations/filter')
  async findByDateAndStatus(
    @param.query.string('date') date: string,
    @param.query.string('status') status: string,
  ): Promise<Reservation[]> {
    if (!date || !status) {
      throw new Error('Both date and status parameters are required');
    }
    return this.reservationRepository.findByDateAndStatus(date, status);
  }

  // Custom endpoint to update the status of a reservation
  @patch('/reservations/{id}/status')
  async updateStatus(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {type: 'string'},
            },
            required: ['status'],
          },
        },
      },
    })
    body: {status: string},
  ): Promise<{success: boolean}> {
    const validStatuses = ['pending', 'completed', 'canceled'];
    if (!validStatuses.includes(body.status)) {
      throw new Error(`Invalid status. Allowed values: ${validStatuses.join(', ')}`);
    }

    const success = await this.reservationRepository.updateStatus(id, body.status);
    if (!success) {
      throw new Error(`Reservation with ID ${id} not found`);
    }

    return {success};
  }
}
