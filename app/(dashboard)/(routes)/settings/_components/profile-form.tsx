"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { User } from "@prisma/client"
import * as z from "zod"

import { toast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import AvatarUpload from "./AvatarUpload"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  user: User;
}

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  imageUrl: z.string()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({
  user
}: ProfileFormProps) {
  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name || '',
      imageUrl: user.imageUrl || ''
    }
  })

  const onSubmit = async (data: ProfileFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify(data)
      })

      const profile = await res.json()
      console.log(profile)
      router.refresh()
    } catch (error) {
      
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField 
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
                <AvatarUpload
                  value={field.value}
                  onChange={field.onChange}
                />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}