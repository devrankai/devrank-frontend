import { ClientCreateSection } from '../../components/sections/client-create-section/ClientCreateSection'
import { AuthLayout } from '../../layouts/auth-layout/AuthLayout'

export const ClientCreate = () => {
  return (
    <AuthLayout>
      <ClientCreateSection />
    </AuthLayout>
  )
}
