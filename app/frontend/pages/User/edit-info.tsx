import {  useForm, usePage } from '@inertiajs/react'
import { Label } from '@/components/forms/motion-label'
import { Input } from '@/components/forms/motion-input'
import LabelInputContainer from '@/components/ui/label-input-container'
import { Button } from '@/components/ui/button'
import BottomGradient from '@/components/ui/bottom-gradient'
import { InputWithTags } from '@/components/ui/input-with-tags'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TextareaInput } from '@/components/ui/textarea-with-characters-left'
import UserAvatarEdit from '@/components/pages/user/UserAvatarEdit'

const EditInfo = ({ userProfile }) => {
  const {
    auth: {  profile_picture_url, currentUser }
  } = usePage().props as any
  const form = useForm({
    name: userProfile?.name || '',
    full_name: userProfile?.full_name || '',
    profile_bio: userProfile?.profile_bio || '',
    profile_tagline: userProfile?.profile_tagline || '',
    location: userProfile?.location || '',
    social_profiles: userProfile?.social_profiles || [],
    tech_stacks: userProfile?.tech_stacks || [],
    available_for: userProfile?.available_for || ''
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.patch('/update_profile', {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {

      },
      onError: (errors) => {
        console.error('Profile update failed:', errors)
      }
    })
  }

  return (
    <>
      <Avatar>
        <AvatarImage src={profile_picture_url} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='w-full max-w-xs p-4 mx-auto mb-4 bg-white border border-dashed rounded-lg dark:bg-black border-neutral-200 dark:border-neutral-800'>
        <UserAvatarEdit userId={currentUser.id} />
      </div>
      <form onSubmit={handleSubmit} className='contents'>

        <div className='grid grid-cols-2 gap-4'>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='name' className='text-left text-white'>
              名称
            </Label>
            <Input id='name' onChange={(e) => setData('name', e.target.value)} value={data.name} className='w-80' />
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.name && (
                <div className='px-3 py-2 font-medium text-red-500'>
                  {errors.name.join(', ')}
                </div>
              )}
            </div>
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='full_name' className='text-left text-white'>
              全名
            </Label>
            <Input id='full_name' onChange={(e) => setData('full_name', e.target.value)} value={data.full_name} className='col-span-2' />
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.full_name && (
                <div className='px-3 py-2 font-medium text-red-500'>
                  {errors.full_name.join(', ')}
                </div>
              )}
            </div>
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='profile_tagline' className='text-left text-white'>
              个性签名
            </Label>
            <Input id='profile_tagline' onChange={(e) => setData('profile_tagline', e.target.value)} value={data.profile_tagline} className='col-span-2' />
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.profile_tagline && (
                <div className='px-3 py-2 font-medium text-red-500'>
                  {errors.profile_tagline.join(', ')}
                </div>
              )}
            </div>
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='location' className='text-left text-white'>
              地址
            </Label>
            <Input id='location' onChange={(e) => setData('location', e.target.value)} value={data.location} className='w-80' />
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.location && (
                <div className='px-3 py-2 font-medium text-red-500'>
                  {errors.location.join(', ')}
                </div>
              )}
            </div>
          </LabelInputContainer>
          <div className='col-span-2 my-5'>
            <Label htmlFor='tech_stacks'>技术栈</Label>
            <InputWithTags
              name='tech_stacks'
              value={data.tech_stacks} // Convert to [{ id: "1", text: "js" }, { id: "2", text: "ruby" }]
              onChange={(value) => {
                setData('tech_stacks', value)
              }}
            />
          </div>
          <div className='col-span-2 my-5'>
            <Label htmlFor='social_profiles'>社交资料</Label>
            <InputWithTags
              name='social_profiles'
              value={data.social_profiles} // Convert to [{ id: "1", text: "js" }, { id: "2", text: "ruby" }]
              onChange={(value) => setData('social_profiles', value)}
            />
          </div>
        </div>
        <div className='my-5'>
          <Label htmlFor='available_for'>个人技能</Label>
          <TextareaInput
            name='available_for'
            id='available_for'
            value={data.available_for}
            rows={1}
            maxLength={180}
            className='block w-full px-3 py-2 mt-2 text-black border border-gray-400 rounded-md shadow outline-none'
            onChange={(e) => setData('available_for', e.target.value)}
          />
          {errors.available_for && (
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.available_for.join(', ')}
            </div>
          )}
        </div>
        <div className='my-5'>
          <Label htmlFor='profile_bio'>个人简介</Label>
          <TextareaInput
            name='profile_bio'
            id='profile_bio'
            value={data.profile_bio}
            rows={1}
            maxLength={180}
            className='block w-full px-3 py-2 mt-2 text-black border border-gray-400 rounded-md shadow outline-none'
            onChange={(e) => setData('profile_bio', e.target.value)}
          />
          {errors.profile_bio && (
            <div className='px-3 py-2 font-medium text-red-500'>
              {errors.profile_bio.join(', ')}
            </div>
          )}
        </div>

        <Button
          variant='secondary'
          type='submit'
          disabled={processing}
        >修改信息
        </Button>
        <BottomGradient />
      </form>
    </>
  )
}

export default EditInfo
