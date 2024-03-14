import { Attributes, CreationAttributes } from 'sequelize';
import Team from '../db/models/team';
import Member2Team from '../db/models/member2team';

export type TeamAttributes = Attributes<Team>
export type CreationTeamAttributes = CreationAttributes<Team>

export type Member2TeamAttributes = Attributes<Member2Team>
export type CreationMember2TeamAttributes = CreationAttributes<Member2Team>