import { useForm } from "react-hook-form"

export function LoginSignupPage() {
        // LoginFormComponent
        // SignupFormComponent

        // State for both
        const [loginOrSignup, setLoginOrSignup ] = useState('login')

        // State for submitted

    return (
        loginOrSignup === 'login' ? 
        <>
            <h1>Login</h1>
            <form action="">
            </form>
            <p>New here? Signup</p>
        </>

        :

        <>
            <h1>Signup</h1>
            <form action="">
            </form>
            <p>Got an account? Login</p>
        </>

    )
}