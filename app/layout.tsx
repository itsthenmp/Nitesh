import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'A celebration of love', description:'A wedding invitation, made with love.' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
