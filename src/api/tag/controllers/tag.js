'use strict';

/**
 *  tag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tag.tag',({strapi})=>({
    
    async findOneByTagID(ctx){
        try {
            const result = await strapi
            .service('api::tag.tag')
            .findOneByTagID(ctx);
            
            return result
        } catch (error) {
            console.log(error);
            // ctx.throw(error,500)
        }
    },

    async syncTags(ctx){
        try {
            const result = await strapi
            .service('api::tag.tag')
            .syncTags(ctx);
            return result
        } catch (error) {
            console.log(error);
            return ctx.internalServerError(error.toString());
        }
    },
    
    async createOneTag(ctx){
        try {
            const result = await strapi
            .service('api::tag.tag')
            .createOneTag(ctx);
            return result
        } catch (error) {
            console.log('create controller error',error);
            return ctx.internalServerError(error.toString());
        }
    },

    async updateOneByTagID(ctx){
        try {
            const result = await strapi
            .service('api::tag.tag')
            .updateOneByTagID(ctx);
            return result;
        } catch (error) {
            console.log('update controller error',error);

            return ctx.internalServerError(error.toString());
        }
    },

    async deleteOneByTagID(ctx){
        try {
            const result = await strapi
            .service('api::tag.tag')
            .deleteOneByTagID(ctx);
            
            return result
        } catch (error) {
            console.log('delete controller error',error);
            return ctx.internalServerError(error.toString());
            
        }
    },

    async deleteAllSyncedTags(){
        try {
            console.log("deleting all tags");
            const result = await strapi
            .service('api::tag.tag')
            .deleteAllSyncedTags();
            return result
        } catch (error) {
            console.log("sync controller error",error);
            return ctx.internalServerError(error.toString());
            // ctx.throw(error,500)
        }
    },

}));
