import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const drawerVariants = cva(
  "fixed z-50 bg-background transition-transform duration-300",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-3/4 sm:w-1/3 data-[state=closed]:translate-x-[-100%] data-[state=open]:translate-x-0",
        right: "inset-y-0 right-0 h-full w-3/4 sm:w-1/3 data-[state=closed]:translate-x-[100%] data-[state=open]:translate-x-0",
        top: "inset-x-0 top-0 h-fit w-full data-[state=closed]:translate-y-[-100%] data-[state=open]:translate-y-0",
        bottom: "inset-x-0 bottom-0 h-fit w-full data-[state=closed]:translate-y-[100%] data-[state=open]:translate-y-0",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
)

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      backdropFilter: "blur(10px)",
    }}
    exit={{
      opacity: 0,
      backdropFilter: "blur(0px)",
    }}
    className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
  >
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  </motion.div>
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName


interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ side = "left", className, children, ...props }, ref) => (
<AnimatePresence>
  <DrawerPortal>
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
    >
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(drawerVariants({ side }), className)}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        <motion.div
          className={cn(
            "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
            className
          )}
          initial={
            side === "left"
              ? { opacity: 0, x: -100 }
              : side === "right"
              ? { opacity: 0, x: 100 }
              : side === "top"
              ? { opacity: 0, y: -100 }
              : { opacity: 0, y: 100 }
          }
          animate={
            side === "left" || side === "right"
              ? { opacity: 1, x: 0 }
              : { opacity: 1, y: 0 }
          }
          exit={
            side === "left"
              ? { opacity: 0, x: -100 }
              : side === "right"
              ? { opacity: 0, x: 100 }
              : side === "top"
              ? { opacity: 0, y: -100 }
              : { opacity: 0, y: 100 }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 15,
          }}
        >
          {children}
        </motion.div>
      </DrawerPrimitive.Content>
    </motion.div>
  </DrawerPortal>
</AnimatePresence>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
