import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import useApi from '@/hooks/useApi';
import useDebounce from '@/hooks/useDebounce';
import { SIGN_IN, SIGN_UP } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/store';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Form = () => {
    const [newRegister, setNewRegister] = useState(false);
    const [show, setShow] = useState(false);
    const [formValues, setformValues] = useState({
        email: "",
        password: ""
    });

    const [confirmPass, setconfirmPass] = useState("");
    const [error, seterror] = useState("");

    const { post } = useApi()
    const { setUserInfo } = useAppStore()

    const debounceConfirmPass = useDebounce(confirmPass, 1000)

    useEffect(() => {
        if (debounceConfirmPass && debounceConfirmPass !== formValues.password) {
            seterror("Password and ConfirmPassword are not matching")
        } else {
            seterror("")
        }
    }, [debounceConfirmPass, formValues.password])

    const handleInputFieldChange = (e) => {
        const { name, value } = e.target;
        setformValues(prevVal => ({ ...prevVal, [name]: value }))
    }

    const resetFields = () => {
        setformValues({ email: "", password: "", contact: "" })
        setconfirmPass("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let result;
        if (newRegister) {
            result = await post(SIGN_UP, formValues, "Registration Complete")
        } else {
            result = await post(SIGN_IN, formValues, "Logged In")
        }

        if (result?.success) {
            setUserInfo(result.data.user)
        }
    }

    return (
        <Card className={`w-full max-w-md ${cn(newRegister && "max-w-lg")} transition-all duration-50`}>
            <CardHeader>
                <CardTitle>{newRegister ? "Register to get start with Grabit" : "Login to your account"}</CardTitle>
                <CardDescription>{newRegister ? "Fill the details to complete registration process" : "Enter your email and password to login to your account"}</CardDescription>
                <CardAction>
                    <Button variant="link" onClick={() => setNewRegister(!newRegister)}>{newRegister ? "Sign In" : "Sign Up"}</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className='flex flex-col gap-6'>
                        <div className='grid gap-2'>
                            <Label>Email</Label>
                            <Input id="email" name="email" type="email" placeholder="yashshetye@gmail.com" required value={formValues.email} onChange={handleInputFieldChange} />
                        </div>
                        {
                            newRegister && (
                                <div className='grid-cols-2 grid gap-1'>
                                    <div className='grid gap-2'>
                                        <Label htmlFor='fname'>First Name</Label>
                                        <Input id="fname" name="firstName" type="text" value={formValues.firstName} onChange={handleInputFieldChange} />
                                    </div>
                                    <div className='grid gap-2'>
                                        <Label htmlFor='lname'>Last Name</Label>
                                        <Input id="lname" name="lastName" type="text" value={formValues.lastName} onChange={handleInputFieldChange} />
                                    </div>
                                </div>
                            )
                        }
                        {
                            newRegister && (
                                <div className='grid gap-2'>
                                    <Label htmlFor='contact'>Contact</Label>
                                    <Input id="contact" name="contact" type="text" value={formValues.contact} onChange={handleInputFieldChange} />
                                </div>
                            )
                        }
                        <div className='grid gap-2'>
                            <div className='flex items-center'>
                                <Label htmlFor='password'>Password</Label>
                                {!newRegister ? <Link href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                                    Forget your password?
                                </Link> : <span className="ml-auto text-amber-600 font-semibold mr-2 cursor-pointer" onClick={() => setShow(!show)} type="">{show ? "Hide" : "Show"}</span>}
                            </div>
                            <div>
                                <Input id="password" type={show ? "text" : "password"} name="password" required value={formValues.password} onChange={handleInputFieldChange} />
                            </div>
                        </div>
                        {
                            newRegister && (
                                <div className='grid gap-2'>
                                    <Label htmlFor='cnfpass'>Confirm password</Label>
                                    <Input id="cnfpass" type="password" name="cnfpass" value={confirmPass} onChange={(e) => { setconfirmPass(e.target.value) }} />
                                    <span className='text-red-500 text-sm'>{error}</span>
                                </div>
                            )
                        }
                        <div className='flex gap-2 items-center justify-center'>
                            <Button className="bg-primary w-1/2" onClick={handleSubmit} type="button" >{newRegister ? "Register" : "Login"}</Button>
                            <Button className="bg-black text-white w-1/2 hover:bg-blacks" onClick={resetFields} type="button">Reset</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Form
