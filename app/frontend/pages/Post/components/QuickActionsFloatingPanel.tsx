
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingPanelRoot, FloatingPanelTrigger, FloatingPanelContent, FloatingPanelBody, FloatingPanelButton, FloatingPanelFooter, FloatingPanelCloseButton } from '@/components/ui/floating-panel'
import { AnimatePresence, motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FocusCards } from '@/components/ui/focus-cards'
import PostCoverEdit from '@/components/pages/post/PostCoverEdit'
import { ImageIcon } from 'lucide-react'


const QuickActionsFloatingPanel = ({ postId, postCoverUrl }: { postId: string, postCoverUrl?: string, onUploadSuccess?: (url: string) => void }) => {

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
          className='flex items-center px-4 py-2 space-x-4 transition-colors rounded-md bg-accent text-accent-foreground hover:bg-accent/90'
        >
          <ImageIcon className='w-6 h-6' />
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
                        通过搜索查找你想要的的封面图
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