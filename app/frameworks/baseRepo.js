const { Prisma } = require("@prisma/client");

function baseRepo(model) {
    function search(value) {
        const filters = [];
        const fields = Prisma.dmmf.datamodel.models.find(mn => mn.name === model.name).fields;

        fields.forEach((field) => {
            if (field.name != "id") {
                const returns = { };
                returns[field.name] = { contains: value };
    
                filters.push(returns);
            }
        });

        return filters;
    }

    // Find all posts with pagination
    const findAll = async (params) => {
        const posts = await model.findMany({
            where: params.search ? { OR: search(params.search) } : { },
            skip: Number(params.perPage) * (params.page - 1),
            take: Number(params.perPage),
        });
        return posts;
    };

    // Count total number of posts
    const countAll = async (params) => {
        const count = await model.count({
            where: params.search ? { OR: search(params.search) } : { },
        });
        return count;
    };

    // Find a post by its ID
    const findById = async (id) => {
        const post = await model.findUnique({
            where: { id: Number(id) },
        });
        return post;
    };

    // Add a new post
    const add = async (data) => {
        const newPost = await model.create({
            data
        });
        return newPost;
    };

    // Update a post by its ID
    const updateById = async (id, data) => {
        const updatedPost = await model.update({
            where: { id: Number(id) },
            data
        });
        return updatedPost;
    };

    // Delete a post by its ID
    const deleteById = async (id) => {
        await model.delete({
            where: { id: Number(id) },
        });
        return true;
    };

    return {
        findAll,
        countAll,
        findById,
        add,
        updateById,
        deleteById
    };
}

module.exports = baseRepo;