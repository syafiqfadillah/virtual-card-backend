function baseRepo(model) {
    function omit(obj, ...props) {
        const result = { ...obj };
        props.forEach((prop) => delete result[prop]);
        return result;
    }

    // Find all posts with pagination
    const findAll = async (params) => {
        const posts = await model.findMany({
            where: omit(params, 'page', 'perPage'),
            skip: Number(params.perPage) * (params.page - 1),
            take: Number(params.perPage),
        });
        return posts;
    };

    // Count total number of posts
    const countAll = async (params) => {
        const count = await model.count({
            where: omit(params, 'page', 'perPage'),
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

export default baseRepo;
