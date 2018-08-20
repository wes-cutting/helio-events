const { getUserId } = require('../../utils')
// createCourseTemplate(name: String!, courseKind: CourseKind!, campus: Location!, days: [Day!], hours: Int!): CourseTemplate!
// updateCourseTemplate(id: ID!, name: String!, courseKind: CourseKind!, campus: Location!, days: [Day!], hours: Int!): CourseTemplate!
// deleteCourseTemplate(id: ID!): CourseTemplate!


const courseTemplates = {
   async createCourseTemplate(parent, { name, courseKind, campus, hours, days }, ctx, info) {
      return ctx.db.mutation.createCourseTemplate(
         {
            data: {
               name,
               courseKind,
               campus,
               hours,
               days: {
                  set: days
               },
            },
         },
         info
      );
   },
   
   async updateCourseTemplate(parent, { id, name, courseKind, campus, hours, days }, ctx, info) {
      const courseTemplateExists = await ctx.db.exists.CourseTemplate({
         id,
      })
      
      if (!courseTemplateExists) {
         throw new Error(`Template not found`)
      }
      
      return ctx.db.mutation.updateCourseTemplate(
         {
            where: { id },
            data: {
               name,
               courseKind,
               campus,
               hours,
               days
            },
         },
         info,
      );
   },
   
   async deleteCourseTemplate(parent, { id }, ctx) {
      const courseTemplateExists = await ctx.db.exists.CourseTemplate({
         id,
      })
      
      if (!courseTemplateExists) {
         throw new Error(`Template not found`)
      }
      
      return ctx.db.mutation.deleteCourseTemplate({ where: { id } })
   },
};

module.exports = { courseTemplates }