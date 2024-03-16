import { Transaction } from 'sequelize';
import ClubRepository from '../../db/repositories/clubRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import { ClubAttributes, CreationClubAttributes } from '../../types/club';
import { UserAttributes } from '../../types/user';

interface CreateClubPayload {
    clubPayload: CreationClubAttributes;
    user: UserAttributes;
    transaction: Transaction;
}

class ClubService {
    static async createClub({
        user,
        clubPayload,
        transaction
    }: CreateClubPayload) {
        const club = await ClubRepository.createClub(clubPayload, transaction);

        const member = await MemberRepository.createMember(
            {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                clubId: club.id,
                isAdmin: true,
                ...clubPayload
            },
            transaction
        );

        return { club, member };
    }

    static async getClubsByUserId(userId: UserAttributes['id']) {
        return await ClubRepository.getClubsByUserId(userId);
    }

    static async deleteClub(clubId: ClubAttributes['id']) {
        await ClubRepository.deleteClub(clubId);
    }
}

export default ClubService;
