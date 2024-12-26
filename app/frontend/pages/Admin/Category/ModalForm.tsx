import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from '@/components/ui/animated-modal'
import Form from './Form'
import BottomGradient from '@/components/ui/bottom-gradient'
import { router, useForm } from '@inertiajs/react'

const ModalForm = ({ category, children }) => {
  const form = useForm({
    name: category?.name || '',
    id: category?.id || null
  })

  const reload = () => {
    form.reset('name')
    router.reload()
  }
  const handleSubmit = (form: any) => {
    if (category.id) {
      form.patch(`/admin/categories/${category.id}`, {
        onSuccess: () => {
          reload()
        },
        onError: (errors: any) => {
          console.log(errors)
        }
      })
    } else {
      form.post('/admin/categories', {
        onSuccess: () => {
          reload()
        },
        onError: (errors: any) => {
          console.log(errors)
        }
      })
    }
  }
  return (
    <Modal>
      <ModalTrigger className='flex justify-center text-white '>
        {children}
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className='flex items-center justify-center'>
            <Form form={form} />
          </div>
        </ModalContent>
        <ModalFooter className='gap-4'>
          {setOpen => (
            <>
              <button
                className='px-2 py-1 text-sm text-black bg-gray-200 border border-gray-300 rounded-md dark:bg-black dark:border-black dark:text-white w-28'
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className='px-2 py-1 text-sm text-white bg-black border border-black rounded-md dark:bg-white dark:text-black w-28'
                onClick={() => {
                  setOpen(false)
                  handleSubmit(form)
                }}
              >
                确定
              </button>
              <BottomGradient />
            </>
          )}
        </ModalFooter>
      </ModalBody>
    </Modal>
  )
}

export default ModalForm
