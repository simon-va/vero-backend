import fs from 'fs';
import path from 'path';
import sequelize from '../config';
import Club from '../models/club';
import ClubModule from '../models/clubModule';
import Member from '../models/member';
import Module from '../models/module';
import Team from '../models/team';
import User from '../models/user';

const userMocks = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'userMocks.json'), 'utf-8')
);
const clubMocks = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'clubMocks.json'), 'utf-8')
);
const memberMocks = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'memberMocks.json'), 'utf-8')
);
const teamMocks = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'teamMocks.json'), 'utf-8')
);
const moduleMocks = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'moduleMocks.json'), 'utf-8')
);
const clubModuleMocks = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'clubModuleMocks.json'), 'utf-8')
);

const populateDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(userMocks);
        await Club.bulkCreate(clubMocks);
        await Member.bulkCreate(memberMocks);
        await Team.bulkCreate(teamMocks);
        await Module.bulkCreate(moduleMocks);
        await ClubModule.bulkCreate(clubModuleMocks);

        console.log('Database populated successfully!');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        await sequelize.close();
    }
};

void populateDatabase();
