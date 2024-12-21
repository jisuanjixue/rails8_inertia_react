import { router, useForm } from '@inertiajs/react'
import { ReactTrixRTEInput } from "react-trix-rte";
import PostType from '../../types/serializers/Post';
import { Input } from "@/components/ui/motion-input";
import { Label } from "@/components/ui/motion-label";
import { TextareaInput } from "@/components/ui/textarea-with-characters-left";
import LabelInputContainer from "@/components/ui/label-input-container";
import BottomGradient from "@/components/ui/bottom-gradient";
import { useCreation, useSafeState } from 'ahooks';
import { AutoComplete, type Option } from "@/components/ui/autocomplete";
import CategoryType from '../../types/serializers/Category'
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FloatingPanelRoot, FloatingPanelTrigger, FloatingPanelContent, FloatingPanelBody, FloatingPanelButton, FloatingPanelFooter, FloatingPanelCloseButton } from '@/components/ui/floating-panel';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FocusCards } from '@/components/ui/focus-cards';

export default function Form({ post, categories, onSubmit, submitText }: { post: PostType, categories?: CategoryType[], onSubmit: (form: any, categoryId: string | undefined, content?: string) => void, submitText: string }) {
  const factory = useCreation(
    () => ({
      content: '',
    }),
    [],
  );
  const form = useForm({
    title: post.title || '',
    body: post.body || '',
    sub_title: post.sub_title || ''
  })

  const [item, setItem] = useSafeState<Option | undefined>()
  const [showSubTitle, setShowSubTitle] = useSafeState(false)

  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form, item?.value, factory.content)
  }

  const handleFileUpload = (files: File[]) => {
    const formData = new FormData()
    formData.append('cover', files[0])
    router.post(`/upload_cover`, formData, {
      forceFormData: true,
    })
  };

  const addSubTitle = () => {
    setShowSubTitle(true)
  }

  const QuickActionsFloatingPanel = () => {
    const cards = [
      {
        title: "Forest Adventure",
        src: "https://assets.aceternity.com/the-first-rule.png",
      },
      {
        title: "Valley of life",
        src: "https://assets.aceternity.com/the-first-rule.png",
      },
      {
        title: "Sala behta hi jayega",
        src: "https://assets.aceternity.com/the-first-rule.png",
      },
      {
        title: "Camping is for pros",
        src: "https://assets.aceternity.com/the-first-rule.png",
      },
      {
        title: "The road not taken",
        src: "https://assets.aceternity.com/the-first-rule.png",
      },
      {
        title: "The First Rule",
        src: "https://assets.aceternity.com/the-first-rule.png",
      },
    ];

    return (
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title="添加封面图"
          className="flex items-center px-4 py-2 space-x-2 transition-colors rounded-md bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span>添加封面图</span>
        </FloatingPanelTrigger>
        <FloatingPanelContent className="w-[800px]">
          <FloatingPanelBody>
            <AnimatePresence>
              <Tabs defaultValue="upload" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">
                    <motion.div
                      key={1}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 1 * 0.1 }}
                    >
                      <FloatingPanelButton
                        className="flex items-center w-full px-2 py-1 space-x-2 transition-colors rounded-md hover:bg-muted"
                      >
                        <span>上传</span>
                      </FloatingPanelButton>
                    </motion.div>
                  </TabsTrigger>
                  <TabsTrigger value="select">
                    <motion.div
                      key={1}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 1 * 0.1 }}
                    >
                      <FloatingPanelButton
                        className="flex items-center w-full px-2 py-1 space-x-2 transition-colors rounded-md hover:bg-muted"
                      >
                        <span>选择</span>
                      </FloatingPanelButton>
                    </motion.div>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <Card>
                    <CardHeader>
                      <CardTitle>点击上传图片</CardTitle>
                      <CardDescription>
                        Recommended dimension is 1600 x 840
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <FileUpload onChange={handleFileUpload} id="cover" />
                    </CardContent>
                    {/* <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter> */}
                  </Card>
                </TabsContent>
                <TabsContent value="select">
                  <Card>
                    <CardHeader>
                      <CardTitle>选择</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <FocusCards cards={cards} />
                    </CardContent>
                    {/* <CardFooter>
                      <Button>Save password</Button>
                    </CardFooter> */}
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
    )
  }

  return (
    <>
      <div className="flex items-center justify-start w-full mb-4">
        <QuickActionsFloatingPanel />
        <Button variant="outline" onClick={() => addSubTitle()}>添加副标题</Button>
      </div>
      <form onSubmit={handleSubmit} className="contents">
        {showSubTitle &&
          <div className="flex items-center justify-start w-full mb-4">
            <div className="w-4/5">
              <Input
                name="sub_title"
                id="sub_title"
                value={data.sub_title}
                maxLength={180}
                placeholder=''
                onChange={(e) => setData('sub_title', e.target.value)}
              />
              {errors.sub_title && (
                <div className="px-3 py-2 font-medium text-red-500">
                  {errors.sub_title.join(', ')}
                </div>
              )}
            </div>
            <button type="button" onClick={() => setShowSubTitle(false)} className="w-1/5 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>}
        <div className="flex items-center justify-start w-full mb-4">
          <div className="w-1/3">
            <div className="flex flex-col gap-4 not-prose">
              <AutoComplete
                options={categories?.map(v => ({ label: v.name, value: v.id.toString() })) || []}
                emptyMessage="没有结果."
                placeholder="选择话题或输入关键字查询"
                onValueChange={setItem}
                value={item}
              />
            </div>
          </div>
          <div className="w-2/3">
            <LabelInputContainer>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder='在这里输入标题'
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
              {errors.title && (
                <div className="px-3 py-2 font-medium text-red-500">
                  {errors.title.join(', ')}
                </div>
              )}
            </LabelInputContainer>
          </div>
        </div>

        <div className="my-5">
          <Label htmlFor="body">概述</Label>
          <TextareaInput
            name="body"
            id="body"
            value={data.body}
            rows={1}
            maxLength={180}
            className="block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none"
            onChange={(e) => setData('body', e.target.value)}
          />
          {errors.body && (
            <div className="px-3 py-2 font-medium text-red-500">
              {errors.body.join(', ')}
            </div>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="body">正文</label>
          <ReactTrixRTEInput
            name="content"
            id="content"
            defaultValue={post?.content?.body}
            isRailsDirectUpload={true}
            onChange={(_, newValue: string) => {
              factory.content = newValue
            }}
          />
        </div>

        <div className="inline">
          <button
            type="submit"
            disabled={processing}
            className="inline-block px-5 py-3 font-medium text-white bg-blue-600 rounded-lg cursor-pointer"
          >
            {submitText}
            <BottomGradient />
          </button>
        </div>
      </form>
    </>
  )
}
