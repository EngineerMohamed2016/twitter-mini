import { redirectIfAuthenticated } from "@/actions/auth";
import Login from "@/components/auth/Login"

const Page = async () => {
  await redirectIfAuthenticated();

  return (
    <Login />
  )
}

export default Page