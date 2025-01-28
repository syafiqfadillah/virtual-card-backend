function baseService(repository) {
    const getAll = async (query) => {
        const items = await repository.findAll(query);
        const countAll = await repository.countAll(query);
        const result = {
            items,
            total: items.length,
            totalAll: countAll
        };

        return result;
    };

    const getOne = async (id) => {
        const item = await repository.findById(id);

        return item;
    };

    const create = async (body) => {
        const newItem = await repository.add(body);

        return newItem;
    };

    const update = async (id, body) => {
        const updatedItem = await repository.updateById(id, body);

        return updatedItem;
    };

    const remove = async (id) => {
        const deletedItem = await repository.deleteById(id);

        return deletedItem;
    };

    return {
        getAll,
        getOne,
        create,
        update,
        remove,
    };
}

module.exports = baseService;
