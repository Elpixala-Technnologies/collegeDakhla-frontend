"use client"
import Carousel from "@/components/carousel/carousel";
import { sendOtp, verifyOtp } from "@/utils/sendOtp";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { OTPInput } from "@/components/otpInput/otp";
import { truncate } from "fs/promises";
import useSignup from "@/query/hooks/useSignup";
import { ID } from "@/types/global";
import { restUrl } from "@/utils/network";
import axios from "axios";
import { useAppDispatch } from "@/store";
import { setAuthState } from "@/store/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [userOtp, setUserOtp] = useState("");
	const [message, setMessage] = useState("");
	const [isOtp, setIsOtp] = useState(false);
	const [userId, setUserId] = useState<ID>();
	const { UserCheck, CheckOTP } = useSignup();
	const checkUser = UserCheck(phoneNumber);
	const otpchecker = CheckOTP(userId!, phoneNumber, userOtp)
	const dispatch = useAppDispatch();
	const router = useRouter()

	const sendLoginOtp = async (e: any) => {
		e.preventDefault();

		if (checkUser != false) {
			setUserId(checkUser?.userData?.data[0]?.id);
			setIsOtp(true);
			let data = JSON.stringify({
				"data": {}
			});

			let config = {
				method: 'put',
				maxBodyLength: Infinity,
				url: `${restUrl}/api/users-data/${checkUser?.userData?.data[0]?.id}`,
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			};

			axios.request(config)
				.then((response: any) => {
					console.log("otp sent");
				})
				.catch((error: any) => {
					console.log(error);
				});

		} else {
			console.log("user does not exists");
		}
	};

	const handleSignin = () => {
		if (otpchecker != false && checkUser != false) {
			dispatch(
				setAuthState({
					authState: true,
					userName: checkUser?.userData?.data[0]?.attributes?.name,
					email: checkUser?.userData?.data[0]?.attributes?.email,
					number: checkUser?.userData?.data[0]?.attributes?.number,
					userID: checkUser?.userData?.data?.[0]?.id,
				})
			);

			console.log(
				"user logged in successfully",
				checkUser?.userData?.data[0]?.attributes?.name
			);
			router.push("/")
		} else {
			console.log("wrong otp");
		}
	};

	return (
		<div className="flex justify-center my-20">
			<div className="flex flex-row w-1/2">
				<div className="left w-4/6 bg-primary pl-2">
					<Carousel
						slides={[
							<div className="text-white" key={"1"}>
								<div className="text-xl">Education Library</div>
								<p>Get detailed information about Colleges, Careers, Courses, and Exams at CollegeDekho. Register now and make informed decisions about your career.</p>
							</div>
							,
							<div className="text-white" key={"2"}>
								<div className="text-xl ">Counselling</div>
								<p>Sign up to get free counselling by CollegeDekho experts and find the best career path for yourself.</p>
							</div>,
							<div className="text-white" key={"3"}>
								<div className="text-xl ">Guaranteed Admissions</div>
								<p>Avail the chance of getting guaranteed admission to the best college for you. Register now and take a step towards your bright future.</p>
							</div>,
						]}
						showPagination={true}
						showButton={false}
						slidesDesktop={1}
						slideGap="gap-0"
						paginationAlignment="justify-left"
						borderColor="black"
					></Carousel>
				</div>
				<div className="w-3/4 relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border py-12 px-6">
					<div className="logo flex justify-center">
						<Image src="/logo.png" alt="" width={64} height={64} />
					</div>
					<div className="flex items-center flex-col">
						<h3 className="block font-sans text-2xl mb-2 antialiased font-semibold leading-snug tracking-normal text-black">
							OTP Verification
						</h3>
						<span className="block font-sans text-sm text-black text-center mb-4">
							We will send you an one time password on your mobile number
						</span>
					</div>

					<div className="flex flex-col gap-4 px-6 pb-6">
						<div className="relative h-11 w-full min-w-[200px]">
							<input
								className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 "
								placeholder=""
								name="Mobile No."
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								type="tel"
								pattern="[0-9]{10}"
								title="Please enter a valid phone number"
							/>
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary">
								Mobile No.
							</label>
						</div>
						{!isOtp ? (
							<button
								className="block w-full select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
								type="submit"
								onClick={sendLoginOtp}
							>
								Generate OTP
							</button>
						) :
							(
								<>
									<div className="relative h-11 w-full min-w-[200px]">
										<div className="flex text-xs mb-2">
											<OTPInput
												userOtp={userOtp}
												setUserOtp={setUserOtp}
												otpLength={6}
											/>
										</div>
										<div className="p-3 ">
											<button
												className="block w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md bg-primary transition-all"
												type="submit"
												onClick={handleSignin}
											>
												Sign In
											</button>
											<p>{message}</p>
										</div>
									</div>
								</>
							)
						}
					</div>
					<div className="p-6">
						<p className="flex justify-center font-sans text-sm antialiased font-light leading-normal text-inherit">
							Don't have an account?
							<Link
								href="/signup"
								className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 text-primary"
							>
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}