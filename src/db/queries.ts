import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import db from './drizzle'
import { courses, userProgress } from './schema'

export const getUserProgress = cache(async () => {
  const { userId } = auth()
  if (!userId) {
    return null
  }
  return await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: { activeCourse: true },
  })
})

export const getCourses = cache(async () => {
  return await db.query.courses.findMany()
})

export const getCourseById = cache(async (courseId: number) => {
  return await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  })
})
