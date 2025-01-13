import UserType from '../../../types/serializers/User'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway, useDeepCompareEffect, useSafeState } from 'ahooks'
import { useEffect, useId, useRef } from 'react'
import { Link, router } from '@inertiajs/react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { convertToQueryParams } from '@/lib/utils'
import DefaultLayout from '../DefaultLayout'

const List = ({ users, total, meta }: { users: UserType[], total: number, meta: any }) => {

  const [initQuery, setInitQuery] = useSafeState(true)
  const pageCount = Math.ceil(total / meta.limit)
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)
  const [active, setActive] = useSafeState<(typeof cards)[number] | boolean | null>(
    null
  )
  const [queryParams, setQueryParams] = useSafeState({ page: 1, pageSize: meta.limit, filters: undefined, sorts: undefined })
  const refresh = () => {
    router.get(
      '/admin/users',
      {
        page: queryParams.page,
        items: queryParams.pageSize,
        q: { ...convertToQueryParams(queryParams.filters), sorts: queryParams.sorts }
      },
      {
        replace: false,
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setInitQuery(false)
        },
        onFinish: () => {
          // Additional cleanup or actions can be added here
        }
      }
    )
  }

  useDeepCompareEffect(() => {
    if (!initQuery) {
      refresh()
    } else {
      setInitQuery(false)
    }
  }, [queryParams, initQuery])

  useEffect(() => {
    function onKeyDown (event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false)
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  const ref = useRef<HTMLDivElement>(null)

  const id = useId()

  useClickAway(
    () => {
      setActive(null)
    },
    ref
  )

  const CloseIcon = () => {
    return (
      <motion.svg
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.05
          }
        }}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-4 h-4 text-black'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M18 6l-12 12' />
        <path d='M6 6l12 12' />
      </motion.svg>
    )
  }
  const cards = (users || [])?.map(v => ({ id: v.id, name: v.name, email: v.email, avatar_url: v.avatar_url, ctaLink: `/admin/users/${v.id}`, ctaText: '查看更多', content: () => { return (<p>{v?.profile_bio}</p>) } }))
  
  return (
  <DefaultLayout>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-10 w-full h-full bg-black/20'
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className='fixed inset-0  grid place-items-center z-[100]'>
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05
                }
              }}
              className='absolute flex items-center justify-center w-6 h-6 bg-white rounded-full top-2 right-2 lg:hidden'
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              className='w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-xl'
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.avatar_url}
                  className='object-cover object-top w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg'
                />
              </motion.div>

              <div>
                <div className='flex items-start justify-between p-4'>
                  <div className=''>
                    <motion.h3
                        layoutId={`name-${active.name}-${id}`}
                        className='font-bold text-neutral-800'
                      >
                        {active.name}
                      </motion.h3>
                    <motion.p
                        layoutId={`description-${active.email}-${id}`}
                        className='text-neutral-600 '
                      >
                        {active.email}
                      </motion.p>
                  </div>
                  {/* <Link
                                        // layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    className='px-4 py-3 text-sm font-bold text-white bg-green-500 rounded-full'
                  >
                    {active.ctaText}
                  </Link> */}
                  <motion.div
                                        layoutId={`button-${active.name}-${id}`}
                                        className="px-4 py-3 text-sm font-bold text-white bg-green-500 rounded-full"
                                        onClick={() => router.get(`/admin/users/${active.id}`)}
                                    >
                                        {active.ctaText}
                                    </motion.div>
                </div>
                <div className='relative px-4 pt-4'>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]'
                  >
                    {typeof active.content === 'function'
                        ? active?.content()
                        : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div ref={ref} className='min-h-screen bg-white'>
        <ul className='max-w-4xl gap-4 mx-auto mt-10 translate-y-10 '>
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.name}-${card.id}`}
              key={`card-${card.name}-${card.id}`}
              onClick={() => {
                setActive(card)
              }}
              className='flex flex-col items-center justify-between p-4 cursor-pointer md:flex-row hover:bg-neutral-100 rounded-xl border-neutral-200'
            >
              <div className='flex flex-col gap-4 md:flex-row '>
                <motion.div layoutId={`image-${card.name}-${card.id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.avatar_url}
                    className='object-cover object-top w-40 h-40 rounded-lg md:h-14 md:w-14'
                  />
                </motion.div>
                <div className='hover:text-neutral-200'>
                  <motion.h3
                    layoutId={`name-${card.name}-${card.id}`}
                    className='font-medium text-center text-neutral-800 md:text-left hover:text-neutral-200'
                  >
                    {card.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.email}-${card.id}`}
                    className='text-center text-neutral-600 md:text-left'
                  >
                    {card.email}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.name}-${card.id}`}
                className='px-4 py-2 mt-4 text-sm font-bold text-white bg-green-600 rounded-full hover:bg-green-500 md:mt-0'
              >
                {card.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </ul>
        <Pagination className='relative mt-10 '>
          <PaginationContent>
            <PaginationItem onClick={() => setQueryParams({ ...queryParams, page: 1 })}>
              <PaginationPrevious />
            </PaginationItem>
            {pages.map(page => (
              <PaginationItem key={page} onClick={() => setQueryParams({ ...queryParams, page })}>
                <PaginationLink isActive={page === meta.page} className='text-neutral-800 hover:bg-neutral-100'>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pages.length > 10 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            { meta.page !== meta.last && <PaginationItem onClick={() => setQueryParams({ ...queryParams, page: meta.page + 1 })}>
              <PaginationNext />
            </PaginationItem>}
          </PaginationContent>
        </Pagination>
      </div>
    </DefaultLayout>
  )
}

export default List
