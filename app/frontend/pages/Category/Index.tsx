import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CategoryType from '../../types/serializers/Category'
import { Head } from "@inertiajs/react"
import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import ModalForm from "./ModalForm"
import { Button } from "@/components/ui/button"

const CategoryIndex = ({ categories, flash }: { categories: CategoryType[], flash: any }) => {
    console.log("🚀 ~ CategoryIndex ~ categories:", categories)
    return (
        <div className='relative flex flex-col items-start justify-start min-h-screen mt-8'>
            <Head title="Posts" />
            <div className="w-full px-8 pt-8 mx-auto md:w-2/3">
                {flash.notice && (
                    <Card className="p-3 mb-4 rounded-lg bg-green-50">
                        <p className="text-sm">{flash.notice}</p>
                    </Card>
                )}
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">文章</h1>
                    <ModalForm category={{ name: '' }}>
                        <Button variant="destructive" className='px-5 py-3'>
                            创建
                        </Button>
                    </ModalForm>

                </div>

                <div className="min-w-full">
                    <Table>
                        <TableCaption>A list of your recent items.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">名称</TableHead>
                                <TableHead>创建时间</TableHead>
                                <TableHead>操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                    <ModalForm category={item}>
                                        <Button variant="destructive" className='px-5 py-3' >编辑</Button>
                                    </ModalForm>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default CategoryIndex
