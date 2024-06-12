const { object,string,date} = require("yup");

const validate = (config, { strapi }) => {
    return async (ctx, next) => {
        try {
            let tagSchema = object({
                data:object({
                    tagid:string().required().strict(true),
                    label: string().required().strict(true),
                    type: string().required().strict(true),
                    category: string().required().strict(true),
                    updated_published_time:date().required().strict(false)
                })
            });
            await tagSchema.validate(ctx.request.body,{abortEarly:false})
            return next()
        } catch (error) {
            let errors = [];
            error.errors.forEach(e => {
                console.log(e);
                errors.push({ message: e.split(".")[1] });
            });
            ctx.badRequest('field is required',{errors})
        }

    }
}

module.exports = validate