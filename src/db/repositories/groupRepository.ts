import { Transaction } from 'sequelize';
import { CreationGroupAttributes, GroupAttributes } from '../../types/group';
import Group from '../models/group';
import Member from '../models/member';
import SystemGroup from '../models/systemGroup';

class GroupRepository {
    static async createGroup(
        payload: CreationGroupAttributes,
        t?: Transaction
    ) {
        return await Group.create(payload, { transaction: t });
    }

    static async getGroupById(groupId: GroupAttributes['id']) {
        return await Group.findByPk(groupId);
    }

    static async addMemberToGroup(
        member: Member,
        group: Group,
        t?: Transaction
    ) {
        await member.addGroup(group, { transaction: t });
    }

    static async addMemberToSystemGroup(member: Member, t?: Transaction) {
        const group = await SystemGroup.findByPk(1);

        if (!group) {
            throw new Error('System group not found');
        }

        await member.addSystemGroup(group, { transaction: t });
    }

    static async removeMemberFromGroup(
        group: Group,
        member: Member
    ): Promise<void> {
        await member.removeGroup(group);
    }

    static async getMembersBySystemGroupAndClubId(clubId: number) {
        return await SystemGroup.findOne({
            where: { id: 1 },
            include: [
                {
                    model: Member,
                    as: 'members',
                    where: { clubId },
                    attributes: ['id']
                }
            ]
        });
    }

    static async getGroupsWithMembers(clubId: number) {
        return await Group.findAll({
            where: { clubId },
            include: [
                {
                    model: Member,
                    as: 'members',
                    attributes: ['id']
                }
            ]
        });
    }

    static async deleteGroup(groupId: GroupAttributes['id']) {
        await Group.destroy({ where: { id: groupId } });
    }
}

export default GroupRepository;
