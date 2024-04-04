import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
