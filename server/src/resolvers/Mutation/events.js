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
        )
    },
}

module.exports = { events }