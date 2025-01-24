function baseController(service) {
    const getAll = async (req, res, next) => {
        try {
            const result = await service.getAll(req.query);
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    const getOne = async (req, res, next) => {
        try {
            const item = await service.getOne(req.query.id);
            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: 'Item not found',
                });
            }
            res.status(200).json({
                success: true,
                data: item,
            });
        } catch (error) {
            next(error);
        }
    };

    const create = async (req, res, next) => {
        try {
            const newItem = await service.create(req.body);
            res.status(201).json({
                success: true,
                data: newItem,
            });
        } catch (error) {
            next(error);
        }
    };

    const update = async (req, res, next) => {
        try {
            const updatedItem = await service.update(req.query.id, req.body);
            if (!updatedItem) {
                return res.status(404).json({
                    success: false,
                    message: 'Item not found',
                });
            }
            res.status(200).json({
                success: true,
                data: updatedItem,
            });
        } catch (error) {
            next(error);
        }
    };

    const remove = async (req, res, next) => {
        try {
            const deleted = await service.remove(req.query.id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Item not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Item successfully deleted',
            });
        } catch (error) {
            next(error);
        }
    };

    return {
        getAll,
        getOne,
        create,
        update,
        remove,
    };
}

export default baseController;