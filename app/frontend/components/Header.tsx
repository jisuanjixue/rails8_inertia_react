import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NoProfilePicture from '../assets/user/no-profile-picture.svg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger
} from '@/components/ui/animated-modal'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import { Link, router, usePage } from '@inertiajs/react'
import { useDebounceFn, useSafeState } from 'ahooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import Logo from './Logo'
import { MenuItem, HoveredLink, ProductItem, Menu } from './ui/navbar-menu'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const [active, setActive] = useSafeState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSafeState('');
  const { run } = useDebounceFn(
    (value) => {
      setSearchTerm(value);
      router.get('/', { q: value }, {
        preserveState: true,
        replace: true,
        only: ['global_search_results']
      });
    },
    {
      wait: 500,
    },
  );

  const {
    auth: { session, currentUser, profile_picture_url, recent_posts },
    global_search_results,
  } = usePage().props as any

  const placeholders = [
    '输入文章标题关键字查询',
    '输入文章标题关键字查询'
  ]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    run(e.target.value);
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  const { theme, setTheme } = useTheme()

  return (
    <>
      <header className='fixed top-5 left-1/2 -translate-x-1/2 z-10 w-[80vw] bg-background/50 backdrop-blur-md rounded-3xl border border-border/50 shadow-md transition-colors duration-300 hover:bg-background/80'>
        <div className='px-4 mx-auto sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex-1 md:flex md:items-center md:gap-12'>
              <div className='block text-teal-600'>
                <Link href='/'>
                  <span className='sr-only'>首页</span>
                  <Logo className='h-8 text-teal-600' />
                </Link>
              </div>
              <Menu setActive={setActive}>
                {/* <MenuItem setActive={setActive} active={active} item="Services">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/web-dev">默认</HoveredLink>
                    <HoveredLink href="/interface-design">最新</HoveredLink>
                    <HoveredLink href="/seo">精华帖 </HoveredLink>
                    <HoveredLink href="/branding">优质讨论</HoveredLink>
                  </div>
                </MenuItem> */}
                <MenuItem setActive={setActive} active={active} item="文章">
                  <div className="grid grid-cols-2 gap-10 p-4 text-sm">
                    {recent_posts?.map((post) => (
                      <ProductItem
                        key={post.id}
                        title={post.title}
                        href={`/posts/${post.id}`}
                        src={post.post_cover_url}
                        description={post.sub_title}
                      />
                    ))}
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      <HoveredLink href="/all_posts">默认</HoveredLink>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                        <circle cx="17" cy="7" r="5" />
                      </svg>
                      <span>最新</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      <span>精华帖</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      <span>优质讨论</span>
                    </div>
                  </div>
                  {/* <div className="mt-4 text-center">
                    <Link
                      href="/all_posts"
                      className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      查看全部文章
                    </Link>
                  </div> */}
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Pricing">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/hobby">Hobby</HoveredLink>
                    <HoveredLink href="/individual">Individual</HoveredLink>
                    <HoveredLink href="/team">Team</HoveredLink>
                    <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                  </div>
                </MenuItem>
              </Menu>
            </div>

            <div className='md:flex md:items-center md:gap-16'>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mr-4"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              <Modal>
                <ModalTrigger className='flex justify-center text-white '>
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                  />
                </ModalTrigger>
                <ModalBody className='fixed inset-0 flex items-center justify-center'>
                  <ModalContent className='relative'>
                    <>
                      <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                        value={searchTerm}
                      />
                      <Tabs defaultValue="posts" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="posts">文章</TabsTrigger>
                          <TabsTrigger value="profiles">用户</TabsTrigger>
                        </TabsList>

                        <TabsContent value="posts">
                          <div className="p-4">
                            {global_search_results?.filter((result: any) => result.type === 'post')
                              ?.map((result: any) => (
                                <Link
                                  key={result.id}
                                  href={result.url}
                                  className="block p-2 rounded hover:bg-gray-100"
                                >
                                  <div className="font-medium">{result.title}</div>
                                  <div className="text-sm text-gray-600">{result.sub_title}</div>
                                </Link>
                              ))}
                            {global_search_results?.filter((result: any) => result.type === 'post').length === 0 && (
                              <div className="text-gray-500">没有找到相关文章</div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="profiles">
                          <div className="p-4">
                            {global_search_results?.filter((result: any) => result.type === 'profile')?.map((result: any) => (
                              <Link
                                key={result.id}
                                href={result.url}
                                className="block p-2 rounded hover:bg-gray-100"
                              >
                                <div className="font-medium">{result.name}</div>
                                <div className="text-sm text-gray-600">
                                  {result.tech_stacks?.join(' • ')}
                                </div>
                              </Link>
                            ))}
                            {global_search_results.filter((result: any) => result.type === 'profile').length === 0 && (
                              <div className="text-gray-500">没有找到相关用户</div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </>
                  </ModalContent>
                </ModalBody>
              </Modal>
              <div className='hidden md:relative md:block'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src={profile_picture_url ?? NoProfilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onSelect={() => router.visit('/posts')}>
                        我的文章
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => router.visit('/my_collections')}>
                        我的收藏
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => router.visit('/user_setting')}>
                        个人设置
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {currentUser.admin && <DropdownMenuItem onSelect={() => router.visit('/admin/dashboard')}>
                        后台管理
                      </DropdownMenuItem>}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => {
                      e.preventDefault()
                      if (session) {
                        router.delete(`/sign_out/${session.id}`, {
                          preserveScroll: true,
                          preserveState: true,
                          onSuccess: () => {
                            router.reload()
                          },
                        })
                      } else {
                        router.get('/sign_in')
                      }
                    }}
                    >
                      {session
                        ? (
                          <>
                            <div>登出</div>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                          </>
                        )
                        : (
                          <div>登录</div>
                        )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
