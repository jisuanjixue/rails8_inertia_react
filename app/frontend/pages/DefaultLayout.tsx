import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { usePage } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

type Flash = {
    alert: string | undefined
    notice: string | undefined
}

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const { flash } = usePage().props as unknown as { flash: Flash }
    return (
        <div className="inset-0 z-auto flex flex-col w-full h-full min-h-screen bg-neutral-800">
             <ShootingStars />
             <StarsBackground />
            <Header />
            <main className="flex-grow overflow-y-auto ">
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
                    <AlertTitle></AlertTitle>
                    <AlertDescription>
                        {flash.notice}
                    </AlertDescription>
                </>}
                <article>
                    <main className="relative">{children}</main>
                </article>
            </main>
            <Footer  />
        </div>
    )
}