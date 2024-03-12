import { Attributes, CreationAttributes } from 'sequelize';
import Club from '../db/models/club.model';

export type ClubAttributes = Attributes<Club>
export type CreationClubAttributes = CreationAttributes<Club>