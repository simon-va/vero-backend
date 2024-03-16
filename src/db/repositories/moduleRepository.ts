import Module from '../models/module';

class ModuleRepository {
    static async getModules() {
        return await Module.findAll({
            attributes: ['id', 'name']
        });
    }
}

export default ModuleRepository;
