
import { Tabs } from '@/components/ui/motion-tabs'
import DefaultLayout from '../DefaultLayout'
import ChangePassword from './change-password'
// import useChangeEmail from './use-change-email'
import EditInfo from './edit-info'
// import { usePage } from "@inertiajs/react";

const UserSetting = ({ user, user_profile }) => {
  console.log('🚀 ~ UserSetting ~ user_profile:', user_profile)

  const tabs = [
    {
      title: '密码',
      value: 'password_change',
      content: (
        <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
          <p>注意！更新密码以后需要重新登录。</p>
          <ChangePassword />
        </div>
      )
    },
    {
      title: '个人信息',
      value: 'user_info',
      content: (
        <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
          <div className='h-full overflow-y-auto'>
            <EditInfo userProfile={user_profile} />
          </div>
        </div>
      )
    },
    // {
    //     title: "邮箱",
    //     value: "email_change",
    //     content: (
    //         <div className="relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]">
    //             <p>Playground tab</p>
    //             {renderEmailForm.render()}
    //         </div>
    //     ),
    // },
    {
      title: 'Content',
      value: 'content',
      content: (
        <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
          <p>Content tab</p>
          <DummyContent />
        </div>
      )
    },
    {
      title: 'Random',
      value: 'random',
      content: (
        <div className='relative w-full h-full p-10 overflow-hidden text-xl font-bold text-white rounded-2xl md:text-4xl bg-gradient-to-br from-[#171717] to-[#171717]'>
          <p>Random tab</p>
          <DummyContent />
        </div>
      )
    }
  ]

  return (
    <div className='h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-6xl mx-auto w-full items-start justify-start my-20'>
      <Tabs tabs={tabs} />
    </div>
  )
}

UserSetting.layout = (page: any) => <DefaultLayout children={page} />
export default UserSetting

const DummyContent = () => {
  return (
    <div
      className='object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto'
    />
  )
}
