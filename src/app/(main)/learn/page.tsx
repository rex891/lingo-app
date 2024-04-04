import { FeedWrapper } from '@/components/feed-wrapper'
import StickyWrapper from '@/components/sticky-wrapper'
import { UserProgress } from '@/components/user-progress'
import { getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'
import { Header } from './header'

export default async function page() {
  const [userProgress] = await Promise.all([getUserProgress()])
  if (!userProgress?.activeCourse) {
    redirect('/courses')
  }
  return (
    <div className="relative flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  )
}
