const { getUserId } = require('../../utils')
// createCourse(template: ID!, name: String!, start: DateTime!): Course!
// updateCourse(template: ID!, name: String!, start: DateTime!, start: DateTime!, events: [ID!]!, isFinished: Boolean!): Course!
// deleteCourse(id: ID!): Course!

const courses = {
    async createCourse(parent, { name, start, template }, ctx, info) {
        return ctx.db.mutation.createCourse(
            {
                data: {
                    name,
                    start,
                    template: {
                        connect: { id: template},
                    }
                    },
                },
            info
            );
        },

    async updateCourse(parent, { id, name, start, isFinished, eventId }, ctx, info) {
        const courseExists = await ctx.db.exists.Course({
            id,
        })

        if (!courseExists) {
            throw new Error(`Course not found`)
        }

        return ctx.db.mutation.updateCourse(
            {
                where: {id},
                data: {
                    name,
                    start,
                    isFinished: false,
                    eventId: {
                        set: { eventId }
                    }
                },
            },
            info,
        );
    },

    async deleteCourse(parent, { id }, ctx) {
        const courseExists = await ctx.db.exists.Course({
            id,
        })

        if (!courseExists) {
            throw new Error(`Course not found`)
        }

        return ctx.db.mutation.deleteCourse({ where: { id } })
    },
};



module.exports = { courses }