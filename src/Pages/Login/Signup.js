import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hook/useToken';

export default function Signup() {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();
    //hook 
    const [token] = useToken(user || gUser);

    let signInError;
    
 
    
    if (token) {
      
        navigate('/appointment');
    }
    
    if (loading || gLoading || updating) {
        return <Loading />;
    }
    
    if (error || gError || updateError) {
        signInError = <p className='text-red-500'>{error?.message || gError?.message || updateError.message}</p>;
        console.log(error, gError);
    }
    const onSubmit = async (data) => {
        console.log(data);
       await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log("update done");
    };
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    }
                                })}
                            />
                            <div className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt">{errors.name.message}</span>}
                            </div>
                        </label>
                        
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
                        <input className='btn btn-secondary w-full max-w-xs' type="submit" value="Sign Up" />
                    </form>
                    
                    <p>Already have an account? <Link className='text-primary' to='/login'>Please log in</Link></p>
                    
                    <div className='divider'>OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-success">Continue With Google</button>
                </div>
            </div>
        </div>
    );
}
