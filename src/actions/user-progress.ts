'use server'

import db from '@/db/drizzle'
import { getCourseById, getUserProgress } from '@/db/queries'
import { userProgress } from '@/db/schema'
import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertUserProgress(courseId: number) {
  const { userId } = auth()
  const user = await currentUser()
  if (!userId || !user) {
    throw new Error('Unauthorized')
  }
  const course = await getCourseById(courseId)
  if (!course) {
    throw new Error('Course not found')
  }
  // TODO: Enable once units and lessons are added
  // if (!course.units.length || !course.units[0].lessons.length){
  //   throw new Error('Course is empty')
  // }
  const existingUserProgress = await getUserProgress()
  const userName = user.firstName || 'User'
  const userImageSrc = user.imageUrl || '/mascot.svg'

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName,
      userImageSrc,
    })
  } else {
    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName,
      userImageSrc,
    })
  }
  revalidatePath('/courses')
  revalidatePath('/learn')
  redirect('/learn')
}
