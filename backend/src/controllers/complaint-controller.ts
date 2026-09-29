export class ComplaintController {
  async createTicket(req: any, res: any) {
    res.status(201).json({ status: 'CREATED' });
  }
}
