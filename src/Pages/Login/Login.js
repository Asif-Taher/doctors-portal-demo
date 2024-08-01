import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hook/useToken';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user || gUser);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(()=>{
        if (token) {
            console.log('Navigating to:', from);
            navigate(from, { replace: true });
        }
    },[token,from,navigate])

    let signInError;

    const onSubmit = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
    }

 
    
    if (loading || gLoading) {
        return <Loading></Loading>; 
    }

    if (error || gError) {
        signInError = <p className='text-red-500'>{error?.message || gError?.message}</p>
        console.log(error, gError);
    }

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: 'Provide a valid email'
                                    }
                                })}
                            />
                            <div className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt">{errors.email.message}</span>}
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <div className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt">{errors.password.message}</span>}
                            </div>
                        </label>
                        {signInError}
                        <input className='btn btn-secondary w-full max-w-xs' type="submit" value="Login" />
                    </form>
                    <p>New to doctors portal? <Link className='text-primary' to='/signup'>Create New Account</Link></p>
                    <div className='divider'>OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-success">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
