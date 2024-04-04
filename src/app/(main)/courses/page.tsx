import { getCourses, getUserProgress } from '@/db/queries'
import { CourseList } from './course-list'

export default async function page() {
  const [courses, userProgress] = await Promise.all([
    getCourses(),
    getUserProgress(),
  ])

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <CourseList
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  )
}
