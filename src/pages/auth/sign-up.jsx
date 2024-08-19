import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useUsers } from "@/store/context/UserContext";
import { toast } from 'react-toastify'
import { db } from "@/api/firebase";

export function SignUp() {
  const { registerUser, clearErrors, toasts, isAuthenticated, token } = useUsers();
  const navigate = useNavigate()


  const [newUser, setNewUser] = React.useState({
    username: '',
    // fullName: '',
    email: '',
    // number: '',
    // address: '',
    password: '',
    confirmPassword: ''
  });


  React.useEffect(() => {
    if (isAuthenticated) navigate('/auth/home')

    if (toasts) {
      toasts.forEach(ele => {
        toast(ele.message, {
          type: ele.type
        })
      });
      clearErrors()
    }
  }, [toasts, isAuthenticated, clearErrors, navigate])


  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = newUser
    if (!username || !email || !password || !confirmPassword) {
      toast('Please fill all the fields', { type: 'error' })
      return
    }

    if (password !== confirmPassword) {
      toast('Passwords do not match', { type: 'error' })
      return
    }
    // await db.collection('users').add(newUser);
    registerUser(newUser)
    navigate('/auth/home')
  }

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4 mb-8">
        <Card className=" w-full max-w-[24rem] mx-auto">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" c olor="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="User Name" size="lg"
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            {/* <Input label="Full name" size="lg"
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
            /> */}
            <Input type="email" label="Email" size="lg"
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            {/* <Input type="number" label="Number" size="lg"
              onChange={(e) => setNewUser({ ...newUser, number: e.target.value })}
            />
            <Input label="Address" size="lg"
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            /> */}
            <Input type="password" label="Password" size="lg"
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <Input type="password" label="Confirm Password" size="lg"
              onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
            />
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleRegister} variant="gradient" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
