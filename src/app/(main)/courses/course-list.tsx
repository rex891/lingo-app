'use client'

import { courses, userProgress } from '@/db/schema'

import { upsertUserProgress } from '@/actions/user-progress'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { CourseCard } from './course-card'

type Props = {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export function CourseList({ courses, activeCourseId }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const onClick = (id: number) => {
    if (pending) return
    if (id === activeCourseId) {
      return router.push('/learn')
    }
    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error('something went wrong'))
    })
  }

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}
