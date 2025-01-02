
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingPanelRoot, FloatingPanelTrigger, FloatingPanelContent, FloatingPanelBody, FloatingPanelButton, FloatingPanelFooter, FloatingPanelCloseButton } from '@/components/ui/floating-panel'
import { AnimatePresence, motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FocusCards } from '@/components/ui/focus-cards'
import PostCoverEdit from '@/components/pages/post/PostCoverEdit'


const QuickActionsFloatingPanel = ({ postId, postCoverUrl }: { postId: number, postCoverUrl?: string }) => {

    const cards = [
      {
        title: 'Forest Adventure',
        src: 'https://assets.aceternity.com/the-first-rule.png'
      },
      {
        title: 'Valley of life',
        src: 'https://assets.aceternity.com/the-first-rule.png'
      },
      {
        title: 'Sala behta hi jayega',
        src: 'https://assets.aceternity.com/the-first-rule.png'
      },
      {
        title: 'Camping is for pros',
        src: 'https://assets.aceternity.com/the-first-rule.png'
      },
      {
        title: 'The road not taken',
        src: 'https://assets.aceternity.com/the-first-rule.png'
      },
      {
        title: 'The First Rule',
        src: 'https://assets.aceternity.com/the-first-rule.png'
      }
    ]

    return (
      <div>
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title='添加封面图'
          className='flex items-center px-4 py-2 space-x-2 transition-colors rounded-md bg-accent text-accent-foreground hover:bg-accent/90'
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
          </svg>
          <span>添加封面图</span>
        </FloatingPanelTrigger>
        <FloatingPanelContent className='w-[800px]'>
          <FloatingPanelBody>
            <AnimatePresence>
              <Tabs defaultValue='upload' className='w-[800px]'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='upload'>
                    <motion.div
                      key={1}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 1 * 0.1 }}
                    >
                      <FloatingPanelButton
                        className='flex items-center w-full px-2 py-1 space-x-2 transition-colors rounded-md hover:bg-muted'
                      >
                        <span>上传</span>
                      </FloatingPanelButton>
                    </motion.div>
                  </TabsTrigger>
                  <TabsTrigger value='select'>
                    <motion.div
                      key={1}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 1 * 0.1 }}
                    >
                      <FloatingPanelButton
                        className='flex items-center w-full px-2 py-1 space-x-2 transition-colors rounded-md hover:bg-muted'
                      >
                        <span>选择</span>
                      </FloatingPanelButton>
                    </motion.div>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='upload'>
                  <Card>
                    <CardHeader>
                      <CardTitle>点击上传图片</CardTitle>
                      <CardDescription>
                        Recommended dimension is 1600 x 840
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                      <PostCoverEdit postId={postId} postCoverUrl={postCoverUrl} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value='select'>
                  <Card>
                    <CardHeader>
                      <CardTitle>选择</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                      <FocusCards cards={cards} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </AnimatePresence>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>
      </div>
    )
  }

  export default QuickActionsFloatingPanel