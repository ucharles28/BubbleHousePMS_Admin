import React from 'react';
import Layout from '../../../components/Layout';
import { Eye, ArrowLeft2 } from 'iconsax-react';
import { useRouter } from 'next/router';

function TotalPayments() {
    const goBack = () => {
        router.back()
    }
    const router = useRouter()

    return (
        <div className='min-h-screen font-poppins'>
            <Layout>
                <div className='w-full h-full py-6 flex flex-col gap-6'>

                    <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                            Total Payments
                        </p>

                        <div className='flex justify-end gap-2 w-full'>

                            <input
                                type='text'
                                placeholder='Search Payments'
                                className='w-1/2 h-9 border border-[#1a1a1a]/50 text-xs font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
                            />

                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={14} />
                                <span className="text-xs font-medium leading-6">Back</span>
                            </div>

                        </div>
                    </div>

                </div>
            </Layout>
        </div>
    )
}

export default TotalPayments;