const { getUserId } = require('../../utils')
// createEvent(name: String!, desc: String, eventKing: EventKind!, date: DateTime!): Event!
// updateEvent(name: String!, desc: String, eventKind: EventKind!, date: DateTime!): Event!
// deleteEvent(id: ID!): Event!

const events = {
    async createEvent(parent, { name, desc, eventKind, date }, ctx, info) {
        return ctx.db.mutation.createEvent(
            {
                data: {
                    name,
                    desc,
                    eventKind,
                    date
                },
            },
            info
        );
    },

    async updateEvent(parent, { id, name, desc, eventKind, date }, ctx, info) {
        const eventExists = await ctx.db.exists.Event({
            id,
        })

        if (!eventExists) {
            throw new Error(`Event not found`)
        }

        return ctx.db.mutation.updateEvent(
            {
                where: { id },
                data: {
                    name,
                    desc,
                    eventKind,
                    date
                },
            },
            info,
        );
    },

    async deleteEvent(parent, { id }, ctx) {
        const eventExists = await ctx.db.exists.Event({
            id,
        })

        if (!eventExists) {
            throw new Error(`Event not found`)
        }

        return ctx.db.mutation.deleteEvent({ where: { id } })
    },
};

module.exports = { events }