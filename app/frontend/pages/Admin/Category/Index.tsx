import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import CategoryType from '../../../types/serializers/Category'
import { Head, router } from '@inertiajs/react'
import DefaultLayout from '../DefaultLayout'
import { Card } from '@/components/ui/card'
import ModalForm from './ModalForm'
import { Button } from '@/components/ui/button'
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

const CategoryIndex = ({ categories, flash }: { categories: CategoryType[], flash: any }) => {
  return (
    <DefaultLayout>
      <div className='relative flex flex-col items-start justify-start min-h-screen mt-8'>
        <Head title='Posts' />
        <Drawer>
          <DrawerTrigger>打开</DrawerTrigger>
          <DrawerContent side='right'>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>确定</Button>
              <DrawerClose>
                <Button variant='outline'>取消</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <div className='w-full px-8 pt-8 mx-auto md:w-2/3'>
          {flash.notice && (
            <Card className='p-3 mb-4 rounded-lg bg-green-50'>
              <p className='text-sm'>{flash.notice}</p>
            </Card>
          )}
          <div className='flex items-center justify-between'>
            <h1 className='text-4xl font-bold'>文章</h1>
            <ModalForm category={{ name: '' }}>
              <Button variant='default' className='px-5 py-3 text-white bg-blue-700 hover:bg-blue-800'>
                创建
              </Button>
            </ModalForm>
          </div>

          <div className='min-w-full'>
            <Table>
              <TableCaption>文章分类列表</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>名称</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium'>{item.name}</TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                        <div className='flex items-center justify-center space-x-2'>
                            <ModalForm category={item}>
                                <Button variant='secondary' className='px-5 py-3'>编辑</Button>
                              </ModalForm>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant='destructive' className='px-5 py-3'>删除</Button>
                                  </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>您确定要删除吗？</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            删除这个分类，将删除所有关联的文章。
                                                            </AlertDialogDescription>
                                      </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>取消</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => router.delete(`/admin/categories/${item.id}`, {
                                            preserveScroll: true,
                                            preserveState: true,
                                            onSuccess: () => {
                                              router.reload({ only: ['categories'] })
                                              flash.notice = '分类删除成功'
                                            },
                                            onError: () => {
                                              flash.error = '分类删除失败'
                                            }
                                          })}
                                          >确定
                                          </AlertDialogAction>
                                      </AlertDialogFooter>
                                  </AlertDialogContent>
                              </AlertDialog>
                          </div>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
export default CategoryIndex
