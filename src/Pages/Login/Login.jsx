import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {signInWithGoogle, loading, user } = useContext(AuthContext)
    const navigate = useNavigate()
    // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle()
       navigate ('/')
    } catch (err) {
    //   console.log(err)
    }
}
    return (
        <div className="w-full mx-auto mt-32 max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
	<div className="my-6 space-y-4">
		<button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
        <FcGoogle size={32} />
			<p>Login with Google</p>
		</button>
	</div>
</div>
    );
};

export default Login;