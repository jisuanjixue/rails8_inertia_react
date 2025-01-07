import PostType from '../../types/serializers/Post'
import DefaultLayout from '../DefaultLayout'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway, useDeepCompareEffect, useSafeState } from 'ahooks'
import { useEffect, useId, useRef } from 'react'
import { Link, router } from '@inertiajs/react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { convertToQueryParams } from '@/lib/utils'

const List = ({ posts, total, meta }: { posts: PostType[], total: number, meta: any }) => {
console.log("🚀 ~ List ~ meta:", meta)

  const [initQuery, setInitQuery] = useSafeState(true)
  const pageCount = Math.ceil(total / meta.limit)
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)
  const [active, setActive] = useSafeState<(typeof cards)[number] | boolean | null>(
    null
  )
  const [queryParams, setQueryParams] = useSafeState({ page: 1, pageSize: meta.limit, filters: undefined, sorts: undefined })
  const refresh = () => {
    router.get(
      '/all_posts',
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
  const cards = (posts || [])?.map(v => ({ id: v.id, description: v.body, title: v.title, src: v.user.avatar_url, ctaLink: `/posts/${v.id}`, ctaText: '查看更多', content: () => { return (<p>{v?.content?.body}</p>) } }))
  
  return (
    <>
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
              key={`button-${active.title}-${id}`}
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
              layoutId={`card-${active.title}-${id}`}
              className='w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden'
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  className='object-cover object-top w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg'
                />
              </motion.div>

              <div>
                <div className='flex items-start justify-between p-4'>
                  <div className=''>
                    <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className='font-bold text-neutral-700 dark:text-neutral-200'
                      >
                        {active.title}
                      </motion.h3>
                    <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className='text-neutral-600 dark:text-neutral-400'
                      >
                        {active.description}
                      </motion.p>
                  </div>
                  <Link
                                        // layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    className='px-4 py-3 text-sm font-bold text-white bg-green-500 rounded-full'
                  >
                    {active.ctaText}
                  </Link>
                  {/* <motion.div
                                        layoutId={`button-${active.title}-${id}`}
                                        className="px-4 py-3 text-sm font-bold text-white bg-green-500 rounded-full"
                                        onClick={() => router.get(`/posts/${active.id}`)}
                                    >
                                        {active.ctaText}
                                    </motion.div> */}
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
      <div ref={ref} className='min-h-screen bg-black'>
        <ul className='max-w-4xl gap-4 mx-auto mt-10 translate-y-10 '>
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${card.id}`}
              key={`card-${card.title}-${card.id}`}
              onClick={() => {
                setActive(card)
              }}
              className='flex flex-col items-center justify-between p-4 cursor-pointer md:flex-row hover:bg-neutral-800 rounded-xl'
            >
              <div className='flex flex-col gap-4 md:flex-row '>
                <motion.div layoutId={`image-${card.title}-${card.id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    className='object-cover object-top w-40 h-40 rounded-lg md:h-14 md:w-14'
                  />
                </motion.div>
                <div className='hover:text-neutral-200'>
                  <motion.h3
                    layoutId={`title-${card.title}-${card.id}`}
                    className='font-medium text-center text-neutral-100 md:text-left hover:text-neutral-200'
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${card.id}`}
                    className='text-center text-neutral-300 md:text-left'
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.title}-${card.id}`}
                className='px-4 py-2 mt-4 text-sm font-bold text-white bg-green-600 rounded-full hover:bg-green-500 md:mt-0'
              >
                {card.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </ul>
        <Pagination className='relative mt-10 text-white'>
          <PaginationContent>
            <PaginationItem onClick={() => setQueryParams({ ...queryParams, page: 1 })}>
              <PaginationPrevious />
            </PaginationItem>
            {pages.map(page => (
              <PaginationItem key={page} onClick={() => setQueryParams({ ...queryParams, page })}>
                <PaginationLink isActive={page === meta.page}>
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
    </>
  )
}

List.layout = (page: any) => <DefaultLayout children={page} />
export default List
