import { Transaction } from 'sequelize';
import Club from '../../db/models/club';
import ClubRepository from '../../db/repositories/clubRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import TeamRepository from '../../db/repositories/teamRepository';
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

        const team = await TeamRepository.createTeam(
            {
                name: 'Admin',
                isSystemTeam: true,
                clubId: club.id
            },
            transaction
        );

        await TeamRepository.addMemberToTeam(member, team, transaction);

        return { club, member, team };
    }

    static async getClubsByUserId(userId: UserAttributes['id']) {
        return await ClubRepository.getClubsByUserId(userId);
    }

    static async deleteClub(clubId: ClubAttributes['id']) {
        await ClubRepository.deleteClub(clubId);
    }

    static async getClubById(clubId: ClubAttributes['id']) {
        const club = await ClubRepository.getClubById(clubId);

        if (!club) {
            throw new Error('Club not found');
        }

        const { clubModules, ...rest } = club.toJSON<Club>();

        return {
            ...rest,
            modules: club.clubModules?.map(({ moduleId }) => moduleId)
        };
    }
}

export default ClubService;
