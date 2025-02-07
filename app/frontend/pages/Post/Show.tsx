import { Link, Head, router, usePage } from '@inertiajs/react'
import Post from './Post'
import DefaultLayout from '../DefaultLayout'
import { BookmarkIcon, EllipsisVertical, HeartIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useSafeState } from 'ahooks'
import { TextareaInput } from '@/components/ui/textarea-with-characters-left'
interface Flash {
  alert: string | undefined
  notice: string | undefined
}



const Show = ({ post }) => {
  console.log("🚀 ~ Show ~ post:", post)
  const { auth: { currentUser }, flash } = usePage().props as unknown as { auth: { currentUser: any }, flash: Flash }
  const showProfile = post.likers_info.map(m => ({ id: m.id, name: m.name, designation: m.profile_tagline, image: m.avatar_url }))

  const CommentItem = ({ comment, currentUser, handleCommentSubmit, handleCommentDelete }) => {
    const [showReply, setShowReply] = useSafeState(false)
    const [replyContent, setReplyContent] = useSafeState('')

    const handleReplySubmit = () => {
      handleCommentSubmit(replyContent, comment.id)
      setReplyContent('')
      setShowReply(false)
    }

    return (
      <div key={comment.id} className="p-4 ml-4 border rounded-lg" style={{ marginLeft: `${comment.depth * 20}px` }}>
        {/* ... existing comment content ... */}
        <div key={comment.id} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {comment.user.avatar_url ? (
                <img
                  src={comment.user.avatar_url}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  {comment.user.name[0]}
                </div>
              )}
              <div>
                <p className="font-medium">{comment.user.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            {comment.user.id === currentUser.id && (
              <button
                onClick={() => handleCommentDelete(comment.id)}
                className="text-red-500 hover:text-red-600"
              >
                删除
              </button>
            )}
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            {comment.current_user_like_id ? (
              <button
                onClick={() => handleCommentUnlike(comment.id, comment.current_user_like_id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <HeartIcon className="w-4 h-4 fill-current" />
                <span>{comment.likes_count}</span>
              </button>
            ) : (
              <button
                onClick={() => handleCommentLike(comment.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-600"
              >
                <HeartIcon className="w-4 h-4" />
                <span>{comment.likes_count}</span>
              </button>
            )}
          </div>
        </div>
        {comment.user.id !== currentUser.id && (
          <button
            onClick={() => setShowReply(!showReply)}
            className="mt-2 text-blue-500 hover:text-blue-600"
          >
            回复
          </button>
        )}

        {showReply && (
          <div className="mt-2">
            <TextareaInput
              id=''
              name=''
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={1}
              maxLength={180}
              className="w-full"
            />
            <button
              onClick={handleReplySubmit}
              disabled={!replyContent.trim()}
              className="px-2 py-1 mt-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              提交回复
            </button>
          </div>
        )}

        {/* Render replies */}
        {comment.replies?.map(reply => (
          <CommentItem
            key={reply.id}
            comment={reply}
            currentUser={currentUser}
            handleCommentSubmit={handleCommentSubmit}
            handleCommentDelete={handleCommentDelete}
          />
        ))}
      </div>
    )
  }

  const handleLike = () => {
    router.post(`/posts/${post.id}/likes`)
  }

  const handleUnlike = () => {
    router.delete(`/posts/${post.id}/likes/${post.current_user_like_id}`)
  }


  const handleBookmark = () => {
    router.post(`/posts/${post.id}/book_marks`)
  }

  const handleUnbookmark = () => {
    router.delete(`/posts/${post.id}/book_marks/${post.current_user_bookmark_id}`)
  }

  const [newComment, setNewComment] = useSafeState('')

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return
    router.post(`/posts/${post.id}/comments`, {
      content: newComment
    })

  }

  const handleCommentDelete = async (commentId: number) => {
    router.delete(`/posts/${post.id}/comments/${commentId}`)
  }

  const handleCommentLike = (commentId: number) => {
    router.post(`/posts/${post.id}/comments/${commentId}/likes`)
  }

  const handleCommentUnlike = (commentId: number, likeId: number) => {
    router.delete(`/posts/${post.id}/comments/${commentId}/likes/${likeId}`)
  }

  return (
    <>
      <Head title={`文章 #${post.id}`} />
      <div className='w-full px-4 pt-6 mx-auto md:w-2/3 lg:px-8'>
        <div className='space-y-4'>
          <Post post={post} />
          <div className='flex justify-between'>
            <div className='flex items-center gap-6'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {post.current_user_like_id ? (
                      <button
                        onClick={handleUnlike}
                        className='flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors'
                      >
                        <HeartIcon className='w-5 h-5 fill-current' />
                        <span className='text-base'>{post.likes_count}个赞</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleLike}
                        className='flex items-center gap-1.5 text-gray-400 hover:text-gray-500 transition-colors'
                      >
                        <HeartIcon className='w-5 h-5 fill-current' />
                        <span className='text-base'>{post.likes_count}个赞</span>
                      </button>
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="p-4">
                    <AnimatedTooltip items={showProfile} avatarSize={32} />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {post.current_user_bookmark_id ? (
                <button
                  onClick={handleUnbookmark}
                  className='flex items-center gap-1.5 text-yellow-500 hover:text-yellow-600 transition-colors'
                >
                  <BookmarkIcon className='w-5 h-5 fill-current' />
                  <span className='text-base'>{post.bookmarks_count}收藏</span>
                </button>
              ) : (
                <button
                  onClick={handleBookmark}
                  className='flex items-center gap-1.5 text-gray-400 hover:text-gray-500 transition-colors'
                >
                  <BookmarkIcon className='w-5 h-5 fill-current' />
                  <span className='text-base'>{post.bookmarks_count}收藏</span>
                </button>
              )}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className='flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors'
                  >
                    <EllipsisVertical className='w-5 h-5 fill-current' />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="p-4">
                  <div className='flex flex-wrap gap-2'>
                    {post.can_edit &&
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className='inline-block px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50'
                      >
                        编辑
                      </Link>}
                    <Link
                      href='/posts'
                      className='inline-block px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50'
                    >
                      返回列表
                    </Link>
                    {post.can_destroy && <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant='destructive' className='px-5 py-3'>删除</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>您确定要删除吗？</AlertDialogTitle>
                          <AlertDialogDescription>
                            删除这篇文章后其他人无法查看。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => router.delete(`/posts/${post.id}`, {
                            preserveScroll: true,
                            preserveState: true,
                            onSuccess: () => {
                              router.reload({ only: ['posts'] })
                              flash.notice = '分类删除成功'
                            },
                            onError: () => {
                              flash.alert = '分类删除失败'
                            }
                          })}
                          >确定
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">评论 ({post.comments.length})</h3>
        {/* Comments list */}
        <div className="space-y-4">
          {post?.comments?.filter(comment => !comment.parent_id)?.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              handleCommentSubmit={handleCommentSubmit}
              handleCommentDelete={handleCommentDelete}
            />
          ))}
        </div>

        {/* Comment form */}
        <div className="mb-6">
          <TextareaInput
            name=''
            id=''
            value={newComment}
            rows={1}
            maxLength={180}
            className='block w-full px-3 py-2 mt-2 border border-gray-400 rounded-md shadow outline-none'
            onChange={(e) => setNewComment?.(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            disabled={!newComment.trim()}
            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            提交评论
          </button>
        </div>
      </div>
    </>
  )
}

Show.layout = (page: any) => <DefaultLayout children={page} />
export default Show