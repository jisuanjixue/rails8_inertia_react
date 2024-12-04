"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import DefaultLayout from "../DefaultLayout";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconSignature, IconTableColumn } from "@tabler/icons-react";
import useRightCard from './use-right-card'
import useLeftCard from './use-left-card'


const UserSetting = () => {
const { render: renderRightCard } = useRightCard()
const { render: renderLeftCard } = useLeftCard()    
const BentoGridSecondDemo = () => {
    return (
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    );
  }
  const SkeletonLeft = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
        {renderLeftCard()}
    </div>
  );
  const SkeletonRight = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
        {renderRightCard()}
    </div>
  );
  const items = [
    {
      title: "列表",
      description: "",
      header: <SkeletonLeft />,
      className: "md:col-span-1",
      icon: <IconSignature className="w-4 h-4 text-neutral-500" />,
    },
    {
      title: "填写表单",
      description: "",
      header: <SkeletonRight />,
      className: "md:col-span-2",
      icon: <IconTableColumn className="w-4 h-4 text-neutral-500" />,
    },
  ];
  
  return (
    <div className="w-full h-screen py-20">
        <BentoGridSecondDemo />
    </div>
  );
}
UserSetting.layout = (page: any) => <DefaultLayout children={page} />
export default UserSetting;