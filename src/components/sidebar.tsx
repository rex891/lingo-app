import { cn } from '@/lib/utils'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarItem } from './sidebar-items'

type SidebarItemProps = {
  label: string
  href: string
  iconSrc: string
}
const sidebarItems: SidebarItemProps[] = [
  { label: 'Learn', href: '/learn', iconSrc: '/learn.svg' },
  { label: 'Leaderboard', href: '/leaderboard', iconSrc: '/leaderboard.svg' },
  { label: 'Quests', href: '/quests', iconSrc: '/quests.svg' },
  { label: 'Shop', href: '/shop', iconSrc: '/shop.svg' },
]

type Props = {
  className?: string
}

export function Sidebar({ className }: Props) {
  return (
    <div className={cn('flex h-full lg:w-[256px] lg:fixed left-0 top-0 border-r-2 flex-col px-4', className)}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Lingo</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {sidebarItems.map(sidebarItem => (
          <SidebarItem key={sidebarItem.label} {...sidebarItem} />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  )
}
