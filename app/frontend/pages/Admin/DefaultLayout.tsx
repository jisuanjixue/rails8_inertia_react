import { AppSidebar } from "@/components/app-sidebar"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"
import { AlertCircle } from "lucide-react"

type Flash = {
    alert: string | undefined
    notice: string | undefined
}

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const { flash } = usePage().props as unknown as { flash: Flash }
    return (
        <>
            {flash.alert &&
                <>
                    <Alert variant="destructive">
                        <AlertCircle className="w-4 h-4" />
                        <AlertTitle>错误消息</AlertTitle>
                        <AlertDescription>
                            {flash.alert}
                        </AlertDescription>
                    </Alert>
                </>
            }
            {flash.notice && <>
                <AlertTitle>警告消息</AlertTitle>
                <AlertDescription>
                    {flash.notice}
                </AlertDescription>
            </>}

            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="h-4 mr-2" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Building Your Application
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
                        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default DefaultLayout