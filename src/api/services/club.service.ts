import { CreateClubBody } from '../../types/club';
import Club, { ClubOutput } from '../../db/models/club.model';

class ClubService {
    static async createClub(payload: CreateClubBody): Promise<ClubOutput> {
        return await Club.create(payload);
    }
}

export default ClubService;
