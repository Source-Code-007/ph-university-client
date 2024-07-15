import { useAppSelector } from "../redux/hook";

const Signup = () => {
    const {user} = useAppSelector(state => state.auth)
    console.log(user);
    return (
        <div>
            Signup page
        </div>
    );
};

export default Signup;