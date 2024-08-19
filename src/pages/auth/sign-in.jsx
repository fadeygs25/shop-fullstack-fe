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
GOOGLE_AUTH_LINK
import { toast } from 'react-toastify'
import { useUsers } from "@/store/context/UserContext";
import { GOOGLE_AUTH_LINK } from "@/api/urls";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from "@/api/firebase";


export function SignIn() {
  const { loginUser, registerUser, loginGoogleUser, clearErrors, toasts, isAuthenticated } = useUsers();
  const navigate = useNavigate()
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })
  const [userGoogle, seUserGoogle] = React.useState(null)

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


  const handleLogin = () => {
    const { email, password } = user
    if (!email || !password) {
      toast('Please fill all the fields', { type: 'error' })
      return
    }
    loginUser(user)
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider)
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      seUserGoogle(currentUser);
      console.log(currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const handleGoogleSignIn = async () => {
    googleSignIn();
    loginGoogleUser(userGoogle)

  };

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
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <div
              // href={GOOGLE_AUTH_LINK}
              onClick={handleGoogleSignIn}
            >
              <Button
                size="lg"
                variant="outlined"
                color="blue-gray"
                className="flex items-center gap-3"
                fullWidth
              >
                <img src="https://www.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                Continue with Google
              </Button>
            </div>
          </CardBody>
          <CardBody className="flex flex-col gap-4">
            <Input type="email" label="Email" size="lg"
              onChange={(e) => setUser({ ...user, email: e.target.value })}

            />
            <Input type="password" label="Password" size="lg"
              onChange={(e) => setUser({ ...user, password: e.target.value })}

            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleLogin} variant="gradient" fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
