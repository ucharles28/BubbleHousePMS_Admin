import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { ArrowLeft2 } from 'iconsax-react';

function RequestDetails() {
    const goBack = () => {
        router.back()
    }

    const router = useRouter()

    return (
        <div className='h-full font-poppins'>
            <Layout>
                <div className='w-full h-screen py-6 flex flex-col gap-6'>

                    <div className='flex justify-between w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Request Details for BKN
                        </p>

                        <div className='flex item-center justify-end gap-2 w-full'>
                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={17} />
                                <span className="text-sm font-medium leading-6">Back</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-3 justify-between gap-6 md:gap-8 w-full h-auto bg-white border border-[#E4E4E4] p-4 py-5 rounded-lg'>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Booking Number</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>BKN-0001</p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Guest Name</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>Uzoma Charles </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Guest Phone</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>+1 234 567 890</p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Guest Email</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                Uzoma
                                <span className='text-[#1A1A1A]'>@</span>
                                example.com
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Room Type</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                1 Mini, 2 Executive
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Number of Rooms</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                2
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Check-In</p>
                            <p className='text-sm tracking-widest font-medium text-[#1A1A1A]'>
                                01-03-2023
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Check-Out</p>
                            <p className='text-sm tracking-widest font-medium text-[#1A1A1A]'>
                                03-03-2023
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Adults</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                02
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Children</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                00
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Total</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                NGN 300,456
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Total Paid</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                None
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Payment Method</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                Premise
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Payment Status</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                Not paid
                            </p>
                        </div>

                    </div>

                </div>
            </Layout>
        </div>
    )
}

export default RequestDetails