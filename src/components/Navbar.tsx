'use client'
import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react'

// export default async function TopMenu() {
export default function TopMenu() {
    // const session = await getServerSession(authOptions);
    const { data: session, status } = useSession()

    return (
        <div className='fixed top-0 left-0 right-0 z-30 h-[50px] flex flex-row bg-white
         border-b border-gray-300 items-center px-4'>

            <div className="flex flex-row items-center gap-6">

                {
                    status === 'loading' ? (
                        <span className="text-sm text-gray-500">Loading...</span>
                    ) : session ? (
                        <Link href="/api/auth/signout"
                            className="text-cyan-600 text-sm hover:underline">
                            Sign-Out of {session.user?.name}
                        </Link>
                    ) : (
                        <Link href="/api/auth/signin"
                            className="text-cyan-600 text-sm hover:underline">
                            Sign-In
                        </Link>
                    )
                }

                <div className="flex flex-row gap-0">
                    <TopMenuItem title='create new form' pageRef='/newform' />
                    <TopMenuItem title='history' pageRef='/history' />
                </div>
            </div>


            <div className="flex-grow"></div>

            <div className='w-[90px]'>
                <TopMenuItem title='Approve' pageRef='/approve' />
            </div>
            <div className='w-[70px]'>
                <TopMenuItem title='Home' pageRef='/' />
            </div>

            <Image
                src={'/img/logo.png'}
                alt='logo'
                width={50} height={50}
            />
        </div>
    );
}