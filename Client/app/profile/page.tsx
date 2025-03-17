import ProfileForm from "@/components/profile-form"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        <ProfileForm />
      </div>
    </div>
  )
}

