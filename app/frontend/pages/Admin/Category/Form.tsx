// import { useForm } from '@inertiajs/react'
// import categoryType from '../../types/serializers/Category';
import { Input } from "@/components/ui/motion-input";
import { Label } from "@/components/ui/motion-label";
import LabelInputContainer from "@/components/ui/label-input-container";

export default function Form({ form }: { form: any }) {

  const { data, setData, errors } = form

  return (
    <form  className="contents">
      <LabelInputContainer className="mb-4">
        <Label htmlFor="name">名称</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && (
          <div className="px-3 py-2 font-medium text-red-500">
            {errors.name.join(', ')}
          </div>
        )}
      </LabelInputContainer>
    </form>
  )
}
